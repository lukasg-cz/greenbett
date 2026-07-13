'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LeagueStatsGrid } from '@/components/stats/LeagueStatsGrid';
import { MOCK_LEAGUE_STATS } from '@/lib/api/mock-data';

export default function StatistikyPage() {
  const [activeSport, setActiveSport] = useState('football');

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Data</SectionLabel>
        <h2 className="section-title">
          STATISTIKY <span className="accent">LIG</span>
        </h2>
        <p className="section-desc mb-10">
          Komplexní statistiky per liga — průměry gólů, over/under trendy, BTTS, domácí/venkovní bilance.
        </p>

        <LeagueStatsGrid
          leagues={MOCK_LEAGUE_STATS}
          activeSport={activeSport}
          onSportChange={setActiveSport}
        />
      </div>
    </section>
  );
}
