'use client';

import { useState, useMemo } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FilterButton } from '@/components/ui/FilterButton';
import { MOCK_SIGNALS } from '@/lib/api/mock-data';
import { getSportEmoji } from '@/lib/utils';
import type { Signal } from '@/types';

const sportFilters = [
  { id: 'all', label: 'Vše' },
  { id: 'football', label: '⚽ Fotbal' },
  { id: 'hockey', label: '🏒 Hokej' },
  { id: 'basketball', label: '🏀 Basketbal' },
  { id: 'tennis', label: '🎾 Tenis' },
  { id: 'esports', label: '🎮 Esporty' },
];

function computeStats(signals: Signal[]) {
  const resolved = signals.filter((s) => s.status === 'win' || s.status === 'loss');
  const wins = resolved.filter((s) => s.status === 'win').length;
  const hitRate = resolved.length > 0 ? ((wins / resolved.length) * 100).toFixed(1) : '0';
  const profit = resolved.reduce((acc, s) => {
    if (s.status === 'win') return acc + (s.odds - 1) * s.unitSize;
    return acc - s.unitSize;
  }, 0);
  const roi = resolved.length > 0 ? ((profit / resolved.reduce((a, s) => a + s.unitSize, 0)) * 100).toFixed(1) : '0';
  return { hitRate, profit: profit.toFixed(1), roi, total: signals.length };
}

export default function VysledkyPage() {
  const [sportFilter, setSportFilter] = useState('all');

  const filtered = useMemo(() => {
    if (sportFilter === 'all') return MOCK_SIGNALS;
    return MOCK_SIGNALS.filter((s) => s.sport === sportFilter);
  }, [sportFilter]);

  const stats = computeStats(filtered);

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Transparentnost</SectionLabel>
        <h2 className="section-title">
          VEŘEJNÁ <span className="accent">EVIDENCE</span>
        </h2>
        <p className="section-desc mb-10">
          Kompletní track record všech signálů. Žádné skrývání, žádné mazání proher.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Celkový ROI', value: `${stats.roi}%` },
            { label: 'Hit Rate', value: `${stats.hitRate}%` },
            { label: 'Profit (units)', value: `${Number(stats.profit) >= 0 ? '+' : ''}${stats.profit}` },
            { label: 'Počet signálů', value: String(stats.total) },
          ].map((stat) => (
            <div key={stat.label} className="bg-dark-card border border-gray-700 rounded p-5 text-center">
              <div className="text-2xl font-extrabold text-green">{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap mb-8">
          {sportFilters.map((f) => (
            <FilterButton key={f.id} label={f.label} active={sportFilter === f.id} onClick={() => setSportFilter(f.id)} />
          ))}
        </div>

        <table className="w-full border-separate border-spacing-y-1.5">
          <thead>
            <tr>
              {['Datum', 'Zápas', 'Trh', 'Kurz', 'Confidence', 'Výsledek'].map((col) => (
                <th key={col} className="text-left px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[2px] text-gray-400">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((signal) => (
              <tr key={signal.id} className="bg-dark-card hover:bg-dark-card-hover transition-all">
                <td className="px-4 py-4 text-[0.85rem] text-gray-400 rounded-l">
                  {new Date(signal.createdAt).toLocaleDateString('cs-CZ')}
                </td>
                <td className="px-4 py-4 text-[0.85rem] font-semibold">
                  {getSportEmoji(signal.sport)} {signal.matchHome} vs {signal.matchAway}
                </td>
                <td className="px-4 py-4 text-[0.85rem]">{signal.market}</td>
                <td className="px-4 py-4 text-[0.85rem] font-bold">{signal.odds}</td>
                <td className="px-4 py-4 text-[0.85rem]">{signal.confidence}/10</td>
                <td className="px-4 py-4 rounded-r">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    signal.status === 'win' ? 'bg-green/15 text-green' :
                    signal.status === 'loss' ? 'bg-red/15 text-red' :
                    signal.status === 'void' ? 'bg-yellow/15 text-yellow' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {signal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
