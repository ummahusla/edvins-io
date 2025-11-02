'use client';

import { useIdleDemo, woodPerMinute, woodPerHour } from '../../hooks/useIdleDemo';

export default function IdleWelcomeDemo() {
  const { wood, start, stop, welcome, applyWelcome, isRunning } = useIdleDemo();

  return (
    <div className="p-6 mt-6 mb-6 bg-slate-900 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">🌲 Idle "Welcome Back" Demo</h2>
      <p className="text-xs opacity-60 mb-4">
        Produces {woodPerMinute} wood/min • {woodPerHour} wood/hour
      </p>

      <p className="mb-2 text-sm opacity-75">Wood collected:</p>
      <p className="text-4xl font-semibold mb-6">{wood}</p>

      {!isRunning ? (
        <button
          onClick={start}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition"
        >
          Start chopping
        </button>
      ) : (
        <button
          onClick={stop}
          className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 transition"
        >
          Stop chopping
        </button>
      )}

      {isRunning && <p className="mt-4 text-sm text-green-400">⏳ Chopping in progress...</p>}

      {welcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 p-6 rounded-lg text-center max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
            <p className="mb-4">{welcome}</p>
            <button
              onClick={applyWelcome}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-6">
        💡 Try closing or switching tabs for a bit, then come back to see how much wood you’ve
        earned.
      </p>
    </div>
  );
}
