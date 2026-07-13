'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LeagueStatsGrid } from '@/components/stats/LeagueStatsGrid';
import { MOCK_LEAGUE_STATS } from '@/lib/api/mock-data';
import { isValidSport } from '@/lib/sport-utils';
import type { Sport } from '@/types';

function StatistikyContent() {
  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  const initialSport: Sport = isValidSport(sportParam) ? sportParam : 'football';
  const [activeSport, setActiveSport] = useState<Sport>(initialSport);

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
          onSportChange={(sport) => setActiveSport(sport as Sport)}
        />
      </div>
    </section>
  );
}

export default function StatistikyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Načítání...</div>}>
      <StatistikyContent />
    </Suspense>
  );
}
