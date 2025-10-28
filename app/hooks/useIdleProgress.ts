import { useEffect, useState, useCallback, useRef } from 'react';

const TICK_MS = 3000; // +1 wood every 3s
const OFFLINE_CAP_MS = 60 * 60 * 1000; // 1h cap
const STORAGE_KEY = 'chopTreeState.v1';

function formatSeconds(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function useIdleProgress() {
  const [wood, setWood] = useState(0);
  const [actionActive, setActionActive] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [msToNext, setMsToNext] = useState(TICK_MS);

  const didLoad = useRef(false);
  const progressAnchor = useRef<number | null>(null);
  const lastActive = useRef<number | null>(null);

  // Load once
  useEffect(() => {
    const now = Date.now();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const savedWood = saved.wood ?? 0;
    const savedActive = saved.actionActive ?? false;
    const savedAnchor = saved.progressAnchor ?? null;
    const savedLast = saved.lastActive ?? now;

    setWood(savedWood);
    setActionActive(savedActive);
    progressAnchor.current = savedAnchor;
    lastActive.current = savedLast;

    // Offline recovery
    if (savedActive && savedAnchor) {
      const elapsed = Math.min(now - savedAnchor, OFFLINE_CAP_MS);
      const ticks = Math.floor(elapsed / TICK_MS);
      if (ticks > 0) {
        setWood(savedWood + ticks);
        progressAnchor.current = savedAnchor + ticks * TICK_MS;
        const away = now - savedLast;
        setMessages((m) => [
          ...m,
          `Welcome back! You were away for ${formatSeconds(away)} and earned ${ticks} wood.`,
        ]);
      }
    }

    didLoad.current = true;
  }, []);

  // Persist only after load
  useEffect(() => {
    if (!didLoad.current) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        wood,
        actionActive,
        progressAnchor: progressAnchor.current,
        lastActive: lastActive.current,
      })
    );
  }, [wood, actionActive]);

  // Handle tab visibility
  useEffect(() => {
    const handleVis = () => {
      const now = Date.now();
      if (document.visibilityState === 'hidden') {
        lastActive.current = now;
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            wood,
            actionActive,
            progressAnchor: progressAnchor.current,
            lastActive: now,
          })
        );
      } else if (document.visibilityState === 'visible' && actionActive) {
        const anchor = progressAnchor.current ?? now;
        const elapsed = Math.min(now - anchor, OFFLINE_CAP_MS);
        const ticks = Math.floor(elapsed / TICK_MS);
        if (ticks > 0) {
          setWood((w) => w + ticks);
          progressAnchor.current = anchor + ticks * TICK_MS;
          const away = now - (lastActive.current ?? now);
          setMessages((m) => [
            ...m,
            `You stepped away for ${formatSeconds(away)} and gathered ${ticks} wood.`,
          ]);
        }
        lastActive.current = now;
      }
    };

    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, [actionActive, wood]);

  // Main tick loop
  useEffect(() => {
    if (!actionActive) return;

    const tick = () => {
      const now = Date.now();
      const anchor = progressAnchor.current ?? now;
      const elapsed = now - anchor;
      const ticks = Math.floor(elapsed / TICK_MS);

      if (ticks > 0) {
        setWood((w) => w + ticks);
        progressAnchor.current = anchor + ticks * TICK_MS;
      }

      const remainder = TICK_MS - ((Date.now() - (progressAnchor.current ?? now)) % TICK_MS);
      setMsToNext(remainder);
    };

    const interval = setInterval(tick, 200);
    return () => clearInterval(interval);
  }, [actionActive]);

  const start = useCallback(() => {
    if (actionActive) return;
    const now = Date.now();
    setActionActive(true);
    progressAnchor.current = now;
    lastActive.current = now;
    setMessages((m) => [...m, 'Started chopping.']);
  }, [actionActive]);

  const stop = useCallback(() => {
    if (!actionActive) return;
    const now = Date.now();
    const anchor = progressAnchor.current ?? now;
    const ticks = Math.floor((now - anchor) / TICK_MS);
    if (ticks > 0) setWood((w) => w + ticks);
    setActionActive(false);
    progressAnchor.current = null;
    lastActive.current = now;
    setMessages((m) => [...m, 'Stopped chopping.']);
  }, [actionActive]);

  const nextInLabel = `${(msToNext / 1000).toFixed(1)}s`;
  const ringProgress = 1 - msToNext / TICK_MS;

  return { wood, actionActive, start, stop, messages, ringProgress, nextInLabel };
}
