'use client';

import { useState, useMemo } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScannerFilters } from '@/components/scanner/ScannerFilters';
import { ScannerTable } from '@/components/scanner/ScannerTable';
import { MOCK_VALUE_BETS } from '@/lib/api/mock-data';

export default function ScannerPage() {
  const [filter, setFilter] = useState('all');

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
        <ScannerTable bets={filtered} />
      </div>
    </section>
  );
}
