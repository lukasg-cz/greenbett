'use client';

import type { LeagueStat, Sport } from '@/types';
import { LeagueStatCard } from './LeagueStatCard';
import { FilterButton } from '@/components/ui/FilterButton';
import { EmptyState } from '@/components/ui/EmptyState';

const sportFilters: Array<{ id: Sport; label: string }> = [
  { id: 'football', label: '⚽ Fotbal' },
  { id: 'hockey', label: '🏒 Hokej' },
  { id: 'basketball', label: '🏀 Basketbal' },
  { id: 'tennis', label: '🎾 Tenis' },
  { id: 'baseball', label: '⚾ Baseball' },
  { id: 'amfootball', label: '🏈 Am. fotbal' },
  { id: 'esports', label: '🎮 Esporty' },
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
        {filtered.length > 0 ? (
          filtered.map((league) => <LeagueStatCard key={league.league} league={league} />)
        ) : (
          <EmptyState
            icon="fa-chart-bar"
            title="Statistiky se připravují"
            description="Pro tento sport zatím nemáme dostupné ligové statistiky. Data budou doplněna brzy."
          />
        )}
      </div>
    </>
  );
}
