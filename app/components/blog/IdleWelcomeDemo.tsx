'use client';

import React from 'react';
import { useIdleProgress } from '../../hooks/useIdleProgress';

export default function IdleWelcomeDemo() {
  const { wood, actionActive, start, stop, messages, ringProgress, nextInLabel } =
    useIdleProgress();

  // constants for ring math
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const dash = ringProgress * circumference;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 text-white p-6 shadow-lg border border-white/10">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">🌲 Chop Tree Idle Demo</h2>
          <span className="text-xs opacity-70">1 wood / 3s • 1h offline cap</span>
        </header>

        <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
          {/* Smooth circular timer */}
          <div className="relative w-20 h-20">
            <svg
              viewBox="0 0 40 40"
              className="w-20 h-20 rotate-[-90deg]"
              xmlns="http://www.w3.org/2000/svg"
            >
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

            <div
              className={`absolute inset-0 flex items-center justify-center text-xs transition-opacity ${
                actionActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {actionActive ? nextInLabel : 'idle'}
            </div>
          </div>

          <div>
            <div className="text-sm opacity-75 mb-1">Wood collected</div>
            <div className="text-4xl font-semibold tabular-nums mb-3 transition-all duration-500">
              {wood}
            </div>

            <div className="flex gap-2">
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
        </div>

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

        <p className="mt-6 text-xs opacity-60">
          This demo stores state in localStorage. On refresh or tab switch, it calculates missed
          ticks and awards offline progress, capped at 1 hour.
        </p>
      </div>
    </div>
  );
}
