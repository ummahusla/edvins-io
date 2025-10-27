import { useEffect, useState } from 'react';

const OFFLINE_CAP_MINUTES = 8 * 60; // 8 hours
const WOOD_PER_MINUTE = 1;

export function useIdleProgress() {
  const [wood, setWood] = useState(0);
  const [welcome, setWelcome] = useState<{ minutesAway: number; earned: number } | null>(null);

  // Persist on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('lastActive', Date.now().toString());
      localStorage.setItem('wood', wood.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [wood]);

  // On mount: compute offline earnings
  useEffect(() => {
    const savedWood = parseInt(localStorage.getItem('wood') || '0', 10);
    const savedTime = localStorage.getItem('lastActive');
    const now = Date.now();

    if (savedTime) {
      const diffMs = now - parseInt(savedTime, 10);
      const diffMinutes = Math.max(0, diffMs / 60000);
      const cappedMinutes = Math.min(diffMinutes, OFFLINE_CAP_MINUTES);

      const earned = Math.floor(cappedMinutes * WOOD_PER_MINUTE);
      const total = savedWood + earned;

      setWood(total);

      if (earned > 0) {
        setWelcome({
          minutesAway: Math.floor(diffMinutes),
          earned,
        });
      }
    } else {
      setWood(savedWood);
    }
  }, []);

  return { wood, setWood, welcome, dismissWelcome: () => setWelcome(null) };
}
