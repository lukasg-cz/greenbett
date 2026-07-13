'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LiveIndicator } from '@/components/live/LiveIndicator';
import { SportFilter } from '@/components/live/SportFilter';
import { MatchCard } from '@/components/live/MatchCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { MOCK_MATCHES } from '@/lib/api/mock-data';
import { isValidSport } from '@/lib/sport-utils';

function LiveContent() {
  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  const initialFilter = sportParam === 'all' || !sportParam ? 'all' : isValidSport(sportParam) ? sportParam : 'all';
  const [filter, setFilter] = useState(initialFilter);

  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_MATCHES;
    return MOCK_MATCHES.filter((m) => m.sport === filter);
  }, [filter]);

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <SectionLabel>Real-time</SectionLabel>
            <h2 className="section-title">
              LIVE <span className="accent">DASHBOARD</span>
            </h2>
            <p className="section-desc">Živý přehled dnešních zápasů, kurzů a signálů.</p>
          </div>
          <LiveIndicator />
        </div>

        <div className="mb-8">
          <SportFilter active={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {filtered.length > 0 ? (
            filtered.map((match, i) => <MatchCard key={`${match.league}-${match.home}-${i}`} match={match} />)
          ) : (
            <EmptyState
              icon="fa-tv"
              title="Žádné zápasy"
              description="Pro vybraný sport momentálně nejsou žádné zápasy. Zkus jiný filtr nebo se vrať později."
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default function LivePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Načítání...</div>}>
      <LiveContent />
    </Suspense>
  );
}
