'use client';

import type { Signal } from '@/types';
import { getSportEmoji } from '@/lib/utils';

interface SignalListProps {
  signals: Signal[];
  onResolve: (id: string, status: 'win' | 'loss' | 'void') => void;
}

export function SignalList({ signals, onResolve }: SignalListProps) {
  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Signály</h3>
      <div className="space-y-3">
        {signals.map((signal) => (
          <div key={signal.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-sm flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span>{getSportEmoji(signal.sport)}</span>
              <div>
                <p className="font-semibold text-sm">
                  {signal.matchHome} vs {signal.matchAway}
                </p>
                <p className="text-xs text-gray-400">
                  {signal.league} · {signal.market} · {signal.odds} · {signal.confidence}/10
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                signal.status === 'win' ? 'bg-green/15 text-green' :
                signal.status === 'loss' ? 'bg-red/15 text-red' :
                signal.status === 'void' ? 'bg-yellow/15 text-yellow' :
                'bg-gray-700 text-gray-300'
              }`}>
                {signal.status}
              </span>
              {signal.status === 'pending' && (
                <>
                  <button type="button" onClick={() => onResolve(signal.id, 'win')} className="px-3 py-1 bg-green/15 text-green rounded-sm text-xs font-semibold cursor-pointer hover:bg-green/25">Výhra</button>
                  <button type="button" onClick={() => onResolve(signal.id, 'loss')} className="px-3 py-1 bg-red/15 text-red rounded-sm text-xs font-semibold cursor-pointer hover:bg-red/25">Prohra</button>
                  <button type="button" onClick={() => onResolve(signal.id, 'void')} className="px-3 py-1 bg-yellow/15 text-yellow rounded-sm text-xs font-semibold cursor-pointer hover:bg-yellow/25">Void</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
