'use client';

import { useState, useMemo } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LiveIndicator } from '@/components/live/LiveIndicator';
import { SportFilter } from '@/components/live/SportFilter';
import { MatchCard } from '@/components/live/MatchCard';
import { MOCK_MATCHES } from '@/lib/api/mock-data';

export default function LivePage() {
  const [filter, setFilter] = useState('all');

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
          {filtered.map((match, i) => (
            <MatchCard key={i} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}
