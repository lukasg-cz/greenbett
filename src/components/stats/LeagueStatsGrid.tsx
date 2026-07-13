'use client';

import type { LeagueStat } from '@/types';
import { LeagueStatCard } from './LeagueStatCard';
import { FilterButton } from '@/components/ui/FilterButton';

const sportFilters = [
  { id: 'football', label: '⚽ Fotbal' },
  { id: 'hockey', label: '🏒 Hokej' },
  { id: 'basketball', label: '🏀 Basketbal' },
];

interface LeagueStatsGridProps {
  leagues: LeagueStat[];
  activeSport: string;
  onSportChange: (sport: string) => void;
}

export function LeagueStatsGrid({ leagues, activeSport, onSportChange }: LeagueStatsGridProps) {
  const filtered = leagues.filter((l) => l.sport === activeSport);

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-8">
        {sportFilters.map((filter) => (
          <FilterButton
            key={filter.id}
            label={filter.label}
            active={activeSport === filter.id}
            onClick={() => onSportChange(filter.id)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((league) => (
          <LeagueStatCard key={league.league} league={league} />
        ))}
      </div>
    </>
  );
}
