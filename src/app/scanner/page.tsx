'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScannerFilters } from '@/components/scanner/ScannerFilters';
import { ScannerTable } from '@/components/scanner/ScannerTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { MOCK_VALUE_BETS } from '@/lib/api/mock-data';
import { isValidSport } from '@/lib/sport-utils';

function ScannerContent() {
  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  const initialFilter = sportParam === 'all' || !sportParam ? 'all' : isValidSport(sportParam) ? sportParam : 'all';
  const [filter, setFilter] = useState(initialFilter);

  const filtered = useMemo(() => {
    let bets = MOCK_VALUE_BETS;
    if (filter !== 'all' && filter !== 'ev5' && filter !== 'ev10') {
      bets = bets.filter((b) => b.sport === filter);
    }
    if (filter === 'ev5') bets = bets.filter((b) => b.evPercent >= 5);
    if (filter === 'ev10') bets = bets.filter((b) => b.evPercent >= 10);
    return bets;
  }, [filter]);

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>AI-powered</SectionLabel>
        <h2 className="section-title">
          VALUE BET <span className="accent">SCANNER</span>
        </h2>
        <p className="section-desc mb-10">
          Automatická detekce sázek s kladnou očekávanou hodnotou (EV+). Aktualizováno každých 5 minut.
        </p>

        <ScannerFilters active={filter} onChange={setFilter} />
        {filtered.length > 0 ? (
          <ScannerTable bets={filtered} />
        ) : (
          <EmptyState
            icon="fa-search-dollar"
            title="Žádné value bety"
            description="Pro vybraný filtr nebyly nalezeny žádné sázky s kladnou očekávanou hodnotou. Zkus snížit EV práh nebo změnit sport."
          />
        )}
      </div>
    </section>
  );
}

export default function ScannerPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Načítání...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
