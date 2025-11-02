import { useEffect, useState } from 'react';

const STORAGE_KEY = 'idleChoppingData';
const TICK_MS = 3000; // 1 wood every 3s
const WOOD_PER_TICK = 1;
export const woodPerMinute = (WOOD_PER_TICK * 60000) / TICK_MS;
export const woodPerHour = woodPerMinute * 60;

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
        setWelcome(
          `Welcome back! You were away ${Math.floor(diff / 1000)}s and earned ${gained} wood.`
        );
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
