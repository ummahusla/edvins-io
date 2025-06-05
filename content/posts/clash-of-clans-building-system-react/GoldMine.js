import React, { useState, useEffect } from 'react';

const MAX_LEVEL = 5;

const GOLD_PER_MINUTE = [0, 50, 100, 250, 500, 1000];
const UPGRADE_DURATIONS = [0, 10, 30, 60, 120, 360]; // seconds
const UPGRADE_COSTS = [0, 5, 10, 25, 50, 100]; // gold
const MAX_CAPACITY = [0, 500, 1000, 2500, 5000, 10000];

const STORAGE_KEY = 'goldMineData';

function getNow() {
  return Date.now();
}

function calculateGold(building) {
  const now = getNow();
  const level = Math.min(building.level, MAX_LEVEL);
  const rate = GOLD_PER_MINUTE[level] / 60000; // gold per ms

  const from = building.lastCollectedAt;
  const to = building.upgradedUntil ? Math.min(now, building.upgradedUntil) : now;

  const duration = Math.max(to - from, 0);
  const rawAmount = Math.floor(rate * duration);
  return Math.min(rawAmount, MAX_CAPACITY[level]);
}

function loadData() {
  const defaultData = {
    building: {
      level: 1,
      lastCollectedAt: getNow(),
      upgradedUntil: null,
    },
    gold: 0,
  };

  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return defaultData;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return defaultData;

  try {
    const parsed = JSON.parse(raw);
    return {
      building: {
        level: Math.min(parsed.building?.level ?? 1, MAX_LEVEL),
        lastCollectedAt: parsed.building?.lastCollectedAt ?? getNow(),
        upgradedUntil: parsed.building?.upgradedUntil ?? null,
      },
      gold: parsed.gold ?? 0,
    };
  } catch {
    return defaultData;
  }
}

function formatDuration(ms) {
  const sec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  return `${min}m ${remSec}s`;
}

export default function GoldMine() {
  const [building, setBuilding] = useState(() => loadData().building);
  const [gold, setGold] = useState(() => loadData().gold);
  const [generated, setGenerated] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ building, gold }));
    }
  }, [building, gold]);

  useEffect(() => {
    function tick() {
      setGenerated(calculateGold(building));

      if (building.upgradedUntil) {
        const remaining = building.upgradedUntil - getNow();
        setTimeLeft(formatDuration(remaining));
      } else {
        setTimeLeft('');
      }
    }

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [building]);

  function collect() {
    const gain = calculateGold(building);
    setGold((g) => g + gain);
    setBuilding((b) => ({ ...b, lastCollectedAt: getNow() }));
    setGenerated(0);
  }

  function upgrade() {
    if (building.level >= MAX_LEVEL || building.upgradedUntil) return;

    const nextLevel = building.level + 1;
    const cost = UPGRADE_COSTS[nextLevel];
    if (gold < cost) return;

    const now = getNow();
    const duration = UPGRADE_DURATIONS[building.level] * 1000;
    const finishAt = now + duration;

    setGold((g) => g - cost);
    setBuilding((b) => ({
      ...b,
      upgradedUntil: finishAt,
    }));
    setTimeLeft(formatDuration(duration));

    setTimeout(() => {
      setBuilding((b) => ({
        level: nextLevel,
        lastCollectedAt: getNow(),
        upgradedUntil: null,
      }));
      setTimeLeft('');
    }, duration);
  }

  const isUpgrading = !!(building.upgradedUntil && building.upgradedUntil > getNow());
  const nextLevel = building.level + 1;
  const upgradeCost = UPGRADE_COSTS[nextLevel] ?? Infinity;
  const canUpgrade = !isUpgrading && building.level < MAX_LEVEL && gold >= upgradeCost;

  const level = Math.min(building.level, MAX_LEVEL);

  return (
    <div>
      <h2>Gold Mine (Level {level})</h2>
      <p>Generates: {GOLD_PER_MINUTE[level]} gold/min</p>
      <p>Max capacity: {MAX_CAPACITY[level]}</p>

      {isUpgrading ? (
        <p>Upgrading... {timeLeft && `(${timeLeft} left)`}</p>
      ) : (
        <p>Uncollected gold: {generated}</p>
      )}

      <p>Gold: {gold}</p>

      <div>
        <button onClick={collect} disabled={generated === 0 || isUpgrading}>
          Collect
        </button>

        <button onClick={upgrade} disabled={!canUpgrade}>
          {building.level >= MAX_LEVEL ? 'Upgrade (max level)' : `Upgrade (${upgradeCost} gold)`}
        </button>
      </div>
    </div>
  );
}
