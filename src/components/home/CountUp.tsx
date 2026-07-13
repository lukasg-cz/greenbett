'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { formatNumber } from '@/lib/utils';

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ target, suffix = '', prefix = '' }: CountUpProps) {
  const { value, ref } = useCountUp({ target });

  const display = target > 1000 ? formatNumber(value) : String(value);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
