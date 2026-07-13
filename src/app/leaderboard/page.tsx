'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { MOCK_LEADERBOARD } from '@/lib/api/mock-data';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('all');

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
          entries={MOCK_LEADERBOARD}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>
    </section>
  );
}
