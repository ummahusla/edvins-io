'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'idleChoppingData';
const TICK_MS = 3000; // 1 wood every 3s
const WOOD_PER_TICK = 1;
export const woodPerMinute = (WOOD_PER_TICK * 60000) / TICK_MS;
export const woodPerHour = woodPerMinute * 60;

function formatTimeDifference(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }
  if (hours % 24 > 0) {
    parts.push(`${hours % 24} ${hours % 24 === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes % 60 > 0) {
    parts.push(`${minutes % 60} ${minutes % 60 === 1 ? 'minute' : 'minutes'}`);
  }
  if (seconds % 60 > 0) {
    parts.push(`${seconds % 60} ${seconds % 60 === 1 ? 'second' : 'seconds'}`);
  }

  if (parts.length === 0) return 'a moment';
  if (parts.length === 1) return parts[0];

  const last = parts.pop();
  return `${parts.join(', ')} and ${last}`;
}

export function useIdleDemo() {
  const [wood, setWood] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [welcome, setWelcome] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // On load — check for ongoing or past session
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved) return;

    const { wood: savedWood, startedAt: savedStartedAt } = saved;
    setWood(savedWood ?? 0);

    if (savedStartedAt) {
      const now = Date.now();
      const diff = now - savedStartedAt;
      const gained = Math.floor(diff / TICK_MS);
      if (gained > 0) {
        setWelcome(`You were away for ${formatTimeDifference(diff)} and gathered ${gained} wood.`);
        setWood(savedWood + gained);
      } else {
        // still running session
        setStartedAt(savedStartedAt);
        setIsRunning(true);
      }
    }
  }, []);

  const start = () => {
    const now = Date.now();
    setStartedAt(now);
    setIsRunning(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ wood, startedAt: now }));
  };

  const stop = () => {
    if (!startedAt) return;
    const now = Date.now();
    const diff = now - startedAt;
    const gained = Math.floor(diff / TICK_MS);
    const total = wood + gained;
    setWood(total);
    setStartedAt(null);
    setIsRunning(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ wood: total }));
  };

  const applyWelcome = () => {
    const now = Date.now();
    setWelcome(null);
    setStartedAt(now);
    setIsRunning(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ wood, startedAt: now }));
  };

  return { wood, start, stop, welcome, applyWelcome, isRunning };
}

export default function IdleWelcomeDemo() {
  const { wood, start, stop, welcome, applyWelcome, isRunning } = useIdleDemo();

  return (
    <div className="relative overflow-hidden py-1 px-6 mt-6 mb-6 bg-slate-900 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Idle "Welcome Back" Demo</h2>
      <p className="text-xs opacity-60 mb-4">
        Gathering {woodPerMinute} wood/min • {woodPerHour} wood/hour
      </p>

      {isRunning && <p className="mt-4 text-green-400">⏳ Chopping in progress...</p>}

      <p className="text-sm opacity-75">Wood collected:</p>
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

      {welcome && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 p-6 rounded-lg text-center max-w-sm w-[90%] shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
            <p className="mb-4">{welcome}</p>
            <button
              onClick={applyWelcome}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-6">
        💡 Try closing and reopening the page for a bit, then come back to see how much wood you've
        earned.
      </p>
    </div>
  );
}
