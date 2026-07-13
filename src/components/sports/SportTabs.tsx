'use client';

import type { Sport } from '@/types';

const sports: Array<{ id: Sport; label: string }> = [
  { id: 'football', label: '⚽ Fotbal' },
  { id: 'hockey', label: '🏒 Hokej' },
  { id: 'basketball', label: '🏀 Basketbal' },
  { id: 'tennis', label: '🎾 Tenis' },
  { id: 'baseball', label: '⚾ Baseball' },
  { id: 'amfootball', label: '🏈 Am. fotbal' },
  { id: 'esports', label: '🎮 Esporty' },
];

interface SportTabsProps {
  active: Sport;
  onChange: (sport: Sport) => void;
}

export function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex border-b-2 border-gray-800 mb-10 overflow-x-auto">
      {sports.map((sport) => (
        <button
          key={sport.id}
          type="button"
          className={`px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-wide whitespace-nowrap cursor-pointer border-b-2 -mb-0.5 transition-all bg-transparent border-t-0 border-x-0 font-montserrat ${
            active === sport.id
              ? 'text-green border-green'
              : 'text-gray-400 border-transparent hover:text-green'
          }`}
          onClick={() => onChange(sport.id)}
        >
          {sport.label}
        </button>
      ))}
    </div>
  );
}
