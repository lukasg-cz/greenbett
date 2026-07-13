'use client';

import type { LeaderboardEntry } from '@/types';
import { RankBadge } from './RankBadge';
import { UserInfo } from './UserInfo';
import { FilterButton } from '@/components/ui/FilterButton';

const periodFilters = [
  { id: 'all', label: 'Celkový' },
  { id: 'month', label: 'Tento měsíc' },
  { id: 'week', label: 'Tento týden' },
];

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  period: string;
  onPeriodChange: (period: string) => void;
}

export function LeaderboardTable({ entries, period, onPeriodChange }: LeaderboardTableProps) {
  return (
    <>
      <div className="flex gap-3 flex-wrap mb-8">
        {periodFilters.map((filter) => (
          <FilterButton
            key={filter.id}
            label={filter.label}
            active={period === filter.id}
            onClick={() => onPeriodChange(filter.id)}
          />
        ))}
      </div>

      <table className="w-full border-separate border-spacing-y-1.5">
        <thead>
          <tr>
            {['#', 'Tipér', 'Tipy', 'Hit Rate', 'ROI', 'Profit (units)', 'Streak'].map((col) => (
              <th
                key={col}
                className="text-left px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[2px] text-gray-400"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.rank} className="bg-dark-card transition-all hover:bg-dark-card-hover">
              <td className="px-4 py-4 rounded-l">
                <RankBadge rank={entry.rank} />
              </td>
              <td className="px-4 py-4">
                <UserInfo name={entry.name} initials={entry.initials} />
              </td>
              <td className="px-4 py-4 text-[0.85rem]">{entry.tips}</td>
              <td className="px-4 py-4 text-[0.85rem]">{entry.hitRate}</td>
              <td className={`px-4 py-4 text-[0.85rem] font-bold ${entry.roi.startsWith('+') ? 'positive' : 'negative'}`}>
                {entry.roi}
              </td>
              <td className={`px-4 py-4 text-[0.85rem] font-bold ${entry.profit.startsWith('+') ? 'positive' : 'negative'}`}>
                {entry.profit}
              </td>
              <td className="px-4 py-4 text-[0.85rem] rounded-r">{entry.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
