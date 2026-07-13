'use client';

import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      className={cn('scanner-filter', active && 'active')}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
