'use client';

import React from 'react';
import { useIdleProgress } from '../../hooks/useIdleProgress';

export default function IdleWelcomeDemo() {
  const {
    wood,
    actionActive,
    start,
    stop,
    messages,
    welcome,
    setWelcome,
    ringProgress,
    nextInLabel,
  } = useIdleProgress();

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const p = Math.max(0, Math.min(1, ringProgress));
  const dash = p * circumference;

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 text-white p-6 shadow-lg border border-white/10 relative">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">🌲 Chop Tree Idle Demo</h2>
          <span className="text-xs opacity-70">1 wood / 3s • 1h offline cap</span>
        </header>

        <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
          {/* Circular timer */}
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 40 40" className="w-20 h-20 rotate-[-90deg]">
              <circle
                cx="20"
                cy="20"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="opacity-20"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - dash}
                className="transition-[stroke-dashoffset] duration-300 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs">
              {actionActive ? nextInLabel : 'idle'}
            </div>
          </div>

          <div>
            <div className="text-sm opacity-75 mb-1">Wood collected</div>
            <div className="text-4xl font-semibold tabular-nums mb-3 transition-all duration-500">
              {wood}
            </div>

            {!actionActive ? (
              <button
                onClick={start}
                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition"
              >
                Start chopping
              </button>
            ) : (
              <button
                onClick={stop}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 transition"
              >
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Activity log */}
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Activity log</div>
          <ul className="space-y-2">
            {messages
              .slice()
              .reverse()
              .map((msg, i) => (
                <li
                  key={i}
                  className="text-sm bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2"
                >
                  {msg}
                </li>
              ))}
            {messages.length === 0 && (
              <li className="text-sm opacity-60">
                No activity yet. Start chopping and switch tabs to test offline gains.
              </li>
            )}
          </ul>
        </div>

        {/* Welcome overlay (no Tailwind config required) */}
        {welcome && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
              className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-[90%] max-w-md text-center"
              style={{ animation: 'fadeInPop 0.25s ease-out' }}
            >
              <style>
                {`@keyframes fadeInPop{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`}
              </style>
              <h3 className="text-xl font-semibold mb-3">Welcome back!</h3>
              <p className="mb-4">{welcome}</p>
              <button
                onClick={() => setWelcome(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
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
