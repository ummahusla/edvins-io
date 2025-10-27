'use client';

import React from 'react';
import { useIdleProgress } from '../../hooks/useIdleProgress';

export default function IdleWelcomeDemo() {
  const { wood, setWood, welcome, dismissWelcome } = useIdleProgress();

  const chopTree = () => setWood((prev) => prev + 1);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">🌲 Chop Tree Idle Demo</h2>
        <p className="text-sm opacity-75 mb-4">
          Click to gather wood. Close the tab. Come back to see offline rewards.
        </p>

        <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4 mb-4">
          <div>
            <div className="text-sm opacity-75">Wood</div>
            <div className="text-3xl font-semibold">{wood}</div>
          </div>
          <button
            onClick={chopTree}
            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition"
          >
            Chop Tree
          </button>
        </div>

        <p className="text-xs opacity-60">
          Tip: this demo uses localStorage for teaching. For production, compute offline time on the
          server and clamp to an 8 hour cap.
        </p>

        {/* Welcome Back overlay */}
        {welcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[92%] max-w-md rounded-2xl bg-slate-900 text-white p-6 shadow-xl border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Welcome back</h3>
              <p className="mb-1">
                You were away for <strong>{welcome.minutesAway}</strong> minutes.
              </p>
              <p className="mb-4">
                You earned <strong>{welcome.earned}</strong> wood while offline.
              </p>
              <button
                onClick={dismissWelcome}
                className="w-full px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
