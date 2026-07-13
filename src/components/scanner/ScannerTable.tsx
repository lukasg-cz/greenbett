import type { ValueBet } from '@/types';
import { EVBadge } from './EVBadge';

interface ScannerTableProps {
  bets: ValueBet[];
}

export function ScannerTable({ bets }: ScannerTableProps) {
  return (
    <table className="w-full border-separate border-spacing-y-1.5">
      <thead>
        <tr>
          {['Zápas', 'Liga', 'Trh', 'Kurz', 'Fair odds', 'EV', 'Confidence'].map((col) => (
            <th
              key={col}
              className="text-left px-3.5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[1.5px] text-gray-400"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bets.map((bet, i) => (
          <tr key={i} className="bg-dark-card transition-all hover:bg-dark-card-hover">
            <td className="px-3.5 py-3.5 text-[0.82rem] font-semibold rounded-l">{bet.match}</td>
            <td className="px-3.5 py-3.5 text-[0.82rem] text-gray-400">{bet.league}</td>
            <td className="px-3.5 py-3.5 text-[0.82rem]">{bet.market}</td>
            <td className="px-3.5 py-3.5 text-[0.82rem] font-bold">{bet.odds}</td>
            <td className="px-3.5 py-3.5 text-[0.82rem] text-gray-400">{bet.fair}</td>
            <td className="px-3.5 py-3.5 text-[0.82rem]">
              <EVBadge ev={bet.ev} evClass={bet.evClass} />
            </td>
            <td className="px-3.5 py-3.5 text-[0.82rem] rounded-r">{bet.conf}/10</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
