import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

const TICK_MS = 3000; // +1 wood every 3s
const OFFLINE_CAP_MS = 60 * 60 * 1000; // 1 hour
const STORAGE_KEY = 'chopTreeState.v4'; // keep stable moving forward

type State = {
  wood: number;
  actionActive: boolean;
  progressAnchor: number | null; // time we’ve credited up to
  lastActive: number; // last time we saw the tab
};

function loadInitial(): State {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return {
        wood: 0,
        actionActive: false,
        progressAnchor: null,
        lastActive: now,
      };
    const s = JSON.parse(raw);
    return {
      wood: Number.isFinite(s.wood) ? s.wood : 0,
      actionActive: !!s.actionActive,
      progressAnchor: typeof s.progressAnchor === 'number' ? s.progressAnchor : null,
      lastActive: typeof s.lastActive === 'number' ? s.lastActive : now,
    };
  } catch {
    return {
      wood: 0,
      actionActive: false,
      progressAnchor: null,
      lastActive: now,
    };
  }
}

function fmtFull(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const parts: string[] = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

export function useIdleProgress() {
  // Single source of truth for persistence
  const [state, setState] = useState<State>(() => loadInitial());
  const [messages, setMessages] = useState<string[]>([]);
  const [welcome, setWelcome] = useState<string | null>(null);
  const [msToNext, setMsToNext] = useState<number>(TICK_MS);

  // Debounce/guard so we don't settle twice on return
  const lastSettleRef = useRef<number>(0);

  // Persist whenever state changes (safe: we initialized from storage synchronously)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Offline recovery on mount + auto-resume if it was active
  useEffect(() => {
    setState((prev) => {
      if (!prev.actionActive || prev.progressAnchor == null) return prev;
      const now = Date.now();
      const elapsed = Math.min(now - prev.progressAnchor, OFFLINE_CAP_MS);
      const ticks = Math.floor(elapsed / TICK_MS);
      if (ticks <= 0) return { ...prev, lastActive: now };

      const next: State = {
        ...prev,
        wood: prev.wood + ticks,
        progressAnchor: prev.progressAnchor + ticks * TICK_MS,
        lastActive: now,
      };
      const msg = `Welcome back! You were away ${fmtFull(
        now - prev.lastActive
      )} and earned ${ticks} wood.`;
      setMessages((m) => [...m, msg]);
      setWelcome(msg);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Visibility + focus (settle exactly once on return)
  useEffect(() => {
    const settleOnReturn = () => {
      const now = Date.now();
      // throttle: ignore if we just settled in the last 400ms
      if (now - lastSettleRef.current < 400) return;
      lastSettleRef.current = now;

      setState((prev) => {
        if (!prev.actionActive || prev.progressAnchor == null) {
          // still update lastActive so next away duration is correct
          return { ...prev, lastActive: now };
        }
        const elapsed = Math.min(now - prev.progressAnchor, OFFLINE_CAP_MS);
        const ticks = Math.floor(elapsed / TICK_MS);
        if (ticks <= 0) return { ...prev, lastActive: now };

        const next: State = {
          ...prev,
          wood: prev.wood + ticks,
          progressAnchor: prev.progressAnchor + ticks * TICK_MS,
          lastActive: now,
        };
        const msg = `You were away ${fmtFull(now - prev.lastActive)} and earned ${ticks} wood.`;
        setMessages((m) => [...m, msg]);
        setWelcome(msg);
        return next;
      });
    };

    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        // mark when we left
        const now = Date.now();
        setState((prev) => ({ ...prev, lastActive: now }));
      } else {
        // visible again — settle next tick to avoid throttling jank
        setTimeout(settleOnReturn, 0);
      }
    };

    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', settleOnReturn);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', settleOnReturn);
    };
  }, []);

  // Main ticking loop (timestamp-based; resilient to throttling)
  useEffect(() => {
    if (!state.actionActive) return;
    const id = setInterval(() => {
      setState((prev) => {
        if (!prev.actionActive) return prev;
        const now = Date.now();
        const anchor = prev.progressAnchor ?? now;
        const elapsed = now - anchor;
        const ticks = Math.floor(elapsed / TICK_MS);

        let next: State = prev;
        if (ticks > 0) {
          next = {
            ...prev,
            wood: prev.wood + ticks,
            progressAnchor: anchor + ticks * TICK_MS,
          };
        }
        const remainder = TICK_MS - ((Date.now() - (next.progressAnchor ?? now)) % TICK_MS);
        setMsToNext(remainder);
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [state.actionActive]);

  // Controls
  const start = useCallback(() => {
    setState((prev) => {
      if (prev.actionActive) return prev;
      const now = Date.now();
      setWelcome(null);
      setMessages((m) => [...m, 'Started chopping.']);
      return {
        ...prev,
        actionActive: true,
        progressAnchor: now,
        lastActive: now,
      };
    });
  }, []);

  const stop = useCallback(() => {
    setState((prev) => {
      if (!prev.actionActive) return prev;
      const now = Date.now();
      const anchor = prev.progressAnchor ?? now;
      const ticks = Math.floor((now - anchor) / TICK_MS);
      const added = ticks > 0 ? ticks : 0;
      setMessages((m) => [...m, 'Stopped chopping.']);
      return {
        wood: prev.wood + added,
        actionActive: false,
        progressAnchor: null,
        lastActive: now,
      };
    });
  }, []);

  // Derived UI values
  const ringProgress = useMemo(() => 1 - msToNext / TICK_MS, [msToNext]);
  const nextInLabel = useMemo(() => `${(msToNext / 1000).toFixed(1)}s`, [msToNext]);

  return {
    // state
    wood: state.wood,
    actionActive: state.actionActive,
    // controls
    start,
    stop,
    // UI helpers
    messages,
    welcome,
    setWelcome,
    ringProgress,
    nextInLabel,
  };
}
