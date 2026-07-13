'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SportTabs } from '@/components/sports/SportTabs';
import { SportHero } from '@/components/sports/SportHero';
import { SportFeatures } from '@/components/sports/SportFeatures';
import { SPORTS_DATA } from '@/lib/api/mock-data';
import { isValidSport } from '@/lib/sport-utils';
import type { Sport } from '@/types';

export function SportInstruments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  const initialSport: Sport = isValidSport(sportParam) ? sportParam : 'football';
  const [activeSport, setActiveSport] = useState<Sport>(initialSport);

  const sportData = SPORTS_DATA.find((s) => s.id === activeSport) ?? SPORTS_DATA[0];

  const handleSportChange = (sport: Sport) => {
    setActiveSport(sport);
    router.push(`/sporty?sport=${sport}`, { scroll: false });
  };

  return (
    <section className="py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <SportTabs active={activeSport} onChange={handleSportChange} />
        <SportHero
          sport={activeSport}
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
