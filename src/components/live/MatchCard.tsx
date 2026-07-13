'use client';

import { useState } from 'react';
import type { Match } from '@/types';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const [selectedOdd, setSelectedOdd] = useState<number | null>(null);

  return (
    <div className="bg-dark-card border border-gray-700 rounded p-5 transition-all hover:border-green">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[0.7rem] text-gray-400 uppercase tracking-wider">{match.league}</span>
        <span
          className={`text-[0.75rem] font-semibold px-2.5 py-1 rounded-full ${
            match.live
              ? 'bg-[rgba(255,68,68,0.15)] text-red'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          {match.live ? '● LIVE ' : ''}
          {match.time}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5 text-[0.9rem] font-semibold">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm">
            {match.homeIcon}
          </div>
          {match.home}
        </div>
        <div className="text-[1.4rem] font-extrabold text-green min-w-[60px] text-center">
          {match.score}
        </div>
        <div className="flex items-center gap-2.5 text-[0.9rem] font-semibold">
          {match.away}
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm">
            {match.awayIcon}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(['1', 'X', '2'] as const).map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelectedOdd(selectedOdd === i ? null : i)}
            className={`text-center p-2.5 rounded-sm cursor-pointer transition-all ${
              selectedOdd === i
                ? 'bg-green text-black'
                : 'bg-gray-800 hover:bg-green hover:text-black group'
            }`}
          >
            <div className={`text-[0.6rem] uppercase ${selectedOdd === i ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
              {label}
            </div>
            <div className="text-base font-bold mt-0.5">{match.odds[i]}</div>
          </button>
        ))}
      </div>
      {selectedOdd !== null && (
        <p className="text-[0.75rem] text-green mt-3 text-center">
          Kurz {['1', 'X', '2'][selectedOdd]} ({match.odds[selectedOdd]}) vybrán — přidej do tiketu
        </p>
      )}
    </div>
  );
}
