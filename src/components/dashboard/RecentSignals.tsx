import type { Signal } from '@/types';
import { getSportEmoji } from '@/lib/utils';

interface RecentSignalsProps {
  signals: Signal[];
}

export function RecentSignals({ signals }: RecentSignalsProps) {
  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Poslední signály</h3>
      <div className="space-y-3">
        {signals.slice(0, 5).map((signal) => (
          <div key={signal.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-sm">
            <div className="flex items-center gap-3">
              <span className="text-lg">{getSportEmoji(signal.sport)}</span>
              <div>
                <p className="text-sm font-semibold">
                  {signal.matchHome} vs {signal.matchAway}
                </p>
                <p className="text-xs text-gray-400">{signal.market} · {signal.odds}</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              signal.status === 'win' ? 'bg-green/15 text-green' :
              signal.status === 'loss' ? 'bg-red/15 text-red' :
              'bg-gray-700 text-gray-300'
            }`}>
              {signal.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
