'use client';

import NumberFlow from '@number-flow/react';
import { useEffect, useRef, useState } from 'react';

const BASE_COUNT = 214;
const TICK_INTERVAL_MS = 2200;

function randomDelta() {
  const deltas = [-3, -2, -1, -1, 1, 1, 2, 3];
  return deltas[Math.floor(Math.random() * deltas.length)];
}

export default function ActiveVisitorsBadgeDemo() {
  const [count, setCount] = useState(BASE_COUNT);
  const [dismissed, setDismissed] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCount((prev) => Math.max(1, prev + randomDelta()));
    }, TICK_INTERVAL_MS);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative py-1 px-6 mt-6 mb-6 bg-slate-900 text-white rounded-xl min-h-[180px]">
      <h2 className="text-xl font-bold mb-4">Active visitor badge</h2>

      <div className="flex items-center gap-4 mt-4 mb-6">
        {dismissed ? (
          <button
            type="button"
            onClick={() => setDismissed(false)}
            className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
          >
            Show badge
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5">
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="flex items-center gap-1.5 text-base font-semibold tabular-nums text-white">
              <NumberFlow value={count} />
              <span className="font-normal text-slate-300">active</span>
            </span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="ml-1 cursor-pointer text-slate-500 transition hover:text-slate-300"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-6">
        💡 Dismiss the badge to simulate the disconnected state. Click "Show badge" to restore it.
      </p>
    </div>
  );
}
