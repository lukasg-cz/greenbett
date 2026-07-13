import type { CalcResult } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CalcResultDisplayProps {
  result: CalcResult;
}

export function CalcResultDisplay({ result }: CalcResultDisplayProps) {
  const items = [
    { label: 'Doporučený stake', value: formatCurrency(result.stake), large: true },
    { label: '% bankrollu', value: `${(result.stakePercent * 100).toFixed(1)}%`, large: false },
    {
      label: 'Expected Value',
      value: `${result.ev >= 0 ? '+' : ''}${formatCurrency(result.ev)}`,
      large: false,
      color: result.ev >= 0 ? 'var(--green)' : 'var(--red)',
    },
    { label: 'Potenciální výhra', value: formatCurrency(result.potentialWin), large: false },
  ];

  return (
    <div className="bg-dark-card border border-green rounded-lg p-9 shadow-green-glow">
      <h3 className="text-[1.1rem] font-bold mb-6">Výsledek</h3>
      {items.map((item) => (
        <div key={item.label} className="py-5 border-b border-gray-700 last:border-b-0">
          <div className="text-[0.72rem] text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
          <div
            className={`font-extrabold text-green ${item.large ? 'text-[1.8rem]' : 'text-xl'}`}
            style={item.color ? { color: item.color } : undefined}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
