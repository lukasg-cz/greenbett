'use client';

import { useState, useMemo } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { MOCK_LEADERBOARD } from '@/lib/api/mock-data';
import type { LeaderboardEntry } from '@/types';

function getEntriesForPeriod(period: string): LeaderboardEntry[] {
  if (period === 'all') return MOCK_LEADERBOARD;

  const multiplier = period === 'month' ? 0.18 : 0.06;
  const slice = period === 'month' ? 8 : 6;

  return MOCK_LEADERBOARD.slice(0, slice)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
      tips: Math.max(1, Math.floor(entry.tips * multiplier)),
      profit: `+${(parseFloat(entry.profit.replace('+', '')) * multiplier).toFixed(1)}`,
      roi: `+${(parseFloat(entry.roi.replace('+', '').replace('%', '')) * (period === 'week' ? 0.8 : 1)).toFixed(1)}%`,
    }))
    .sort((a, b) => parseFloat(b.roi.replace('+', '').replace('%', '')) - parseFloat(a.roi.replace('+', '').replace('%', '')))
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('all');
  const entries = useMemo(() => getEntriesForPeriod(period), [period]);

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Komunita</SectionLabel>
        <h2 className="section-title">
          TIPÉRSKÝ <span className="accent">LEADERBOARD</span>
        </h2>
        <p className="section-desc mb-10">
          Žebříček nejúspěšnějších tipérů v komunitě. Aktualizováno denně.
        </p>

        <LeaderboardTable
          entries={entries}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>
    </section>
  );
}
