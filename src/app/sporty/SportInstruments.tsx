'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SportTabs } from '@/components/sports/SportTabs';
import { SportHero } from '@/components/sports/SportHero';
import { SportFeatures } from '@/components/sports/SportFeatures';
import { SPORTS_DATA } from '@/lib/api/mock-data';
import type { Sport } from '@/types';

export function SportInstruments() {
  const searchParams = useSearchParams();
  const initialSport = (searchParams.get('sport') as Sport) || 'football';
  const [activeSport, setActiveSport] = useState<Sport>(initialSport);

  const sportData = SPORTS_DATA.find((s) => s.id === activeSport) ?? SPORTS_DATA[0];

  return (
    <section className="py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <SportTabs active={activeSport} onChange={setActiveSport} />
        <SportHero
          leagues={sportData.leagues}
          signals={sportData.signals}
          title={sportData.title}
          titleAccent={sportData.titleAccent}
          titleSuffix={'titleSuffix' in sportData ? (sportData as { titleSuffix?: string }).titleSuffix ?? '' : ''}
          description={sportData.description}
          logos={sportData.logos}
        />
        {sportData.features && <SportFeatures features={sportData.features} />}
      </div>
    </section>
  );
}
