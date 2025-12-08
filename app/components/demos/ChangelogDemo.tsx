'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'changelog:lastSeenId';

interface ChangelogEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
}

const SAMPLE_ENTRIES: ChangelogEntry[] = [
  {
    id: '2025-12-08-demo-feature',
    date: '2025-12-08',
    title: 'Demo Feature Added',
    summary: 'This is a sample changelog entry. Click the button below to add more!',
  },
];

export default function ChangelogDemo() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<ChangelogEntry[]>(SAMPLE_ENTRIES);
  const [lastSeenId, setLastSeenId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLastSeenId(stored);
    }
  }, []);

  const hasUnseen = mounted && entries.length > 0 && (!lastSeenId || entries[0].id !== lastSeenId);

  const handleOpenPanel = () => {
    setIsOpen(true);
    if (hasUnseen && entries.length > 0) {
      const latestId = entries[0].id;
      localStorage.setItem(STORAGE_KEY, latestId);
      setLastSeenId(latestId);
    }
  };

  const addNewEntry = () => {
    const newEntry: ChangelogEntry = {
      id: `2025-12-${String(Math.floor(Math.random() * 30) + 1).padStart(
        2,
        '0'
      )}-new-feature-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: 'New Feature Released',
      summary: `This is changelog entry #${
        entries.length + 1
      }. Notice how the notification dot appears!`,
    };
    setEntries([newEntry, ...entries]);
  };

  if (!mounted) {
    return (
      <div className="py-1 px-6 mt-6 mb-6 bg-slate-900 text-white rounded-xl text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative py-1 px-6 mt-6 mb-6 bg-slate-900 text-white rounded-xl min-h-[325px]">
      <h2 className="text-xl font-bold mb-4">Changelog Notification Demo</h2>

      <div className="flex items-center gap-4 mt-4 mb-6">
        <button
          onClick={handleOpenPanel}
          className="relative px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition flex items-center gap-2"
          aria-label="View changelog"
        >
          <span className="text-xl">🔔</span>
          <span>What's New</span>
          {hasUnseen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>

        <button
          onClick={addNewEntry}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition"
        >
          + Add New Entry
        </button>
      </div>

      <p className="text-sm opacity-75 mb-2">
        Status: {hasUnseen ? '🔴 Unseen updates available' : '✅ All caught up'}
      </p>
      <p className="text-xs text-slate-400 mb-4">Total entries: {entries.length}</p>

      {isOpen && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
          <div className="bg-slate-800 p-4 rounded-lg max-w-md w-[90%] shadow-lg h-[275px] flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h3 className="text-lg font-semibold">What's New</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition text-xl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {entries.map((entry) => (
                <div key={entry.id} className="border-b border-slate-700 pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-1 gap-3">
                    <h4 className="font-semibold">{entry.title}</h4>
                    <span className="text-xs text-slate-400 flex-shrink-0">{entry.date}</span>
                  </div>
                  <p className="text-sm text-slate-300">{entry.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-6">
        💡 Click "Add New Entry" to simulate a new changelog item. The red dot will appear until you
        open the panel.
      </p>
    </div>
  );
}
