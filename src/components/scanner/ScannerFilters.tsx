'use client';

import { FilterButton } from '@/components/ui/FilterButton';

const filters = [
  { id: 'all', label: 'Vše' },
  { id: 'football', label: '⚽ Fotbal' },
  { id: 'hockey', label: '🏒 Hokej' },
  { id: 'basketball', label: '🏀 Basketbal' },
  { id: 'tennis', label: '🎾 Tenis' },
  { id: 'baseball', label: '⚾ Baseball' },
  { id: 'amfootball', label: '🏈 Am. fotbal' },
  { id: 'esports', label: '🎮 Esporty' },
  { id: 'ev5', label: 'EV 5%+' },
  { id: 'ev10', label: 'EV 10%+' },
];

interface ScannerFiltersProps {
  active: string;
  onChange: (filter: string) => void;
}

export function ScannerFilters({ active, onChange }: ScannerFiltersProps) {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {filters.map((filter) => (
        <FilterButton
          key={filter.id}
          label={filter.label}
          active={active === filter.id}
          onClick={() => onChange(filter.id)}
        />
      ))}
    </div>
  );
}
