'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const initialData = [
  { date: '1.7.', bankroll: 10000 },
  { date: '5.7.', bankroll: 10250 },
  { date: '8.7.', bankroll: 10100 },
  { date: '10.7.', bankroll: 10800 },
  { date: '12.7.', bankroll: 11200 },
];

export function BankrollTracker() {
  const [bankroll, setBankroll] = useState(10000);
  const [data, setData] = useState(initialData);

  const addBet = (result: 'win' | 'loss', stake: number, odds: number) => {
    const profit = result === 'win' ? stake * (odds - 1) : -stake;
    const newBankroll = bankroll + profit;
    setBankroll(newBankroll);
    setData([
      ...data,
      {
        date: new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' }),
        bankroll: newBankroll,
      },
    ]);
  };

  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Bankroll Tracker</h3>
        <span className="text-xl font-extrabold text-green">{bankroll.toLocaleString('cs-CZ')} Kč</span>
      </div>

      <div className="h-[200px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="date" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip
              contentStyle={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '8px' }}
              labelStyle={{ color: '#aaa' }}
            />
            <Line type="monotone" dataKey="bankroll" stroke="#39FF14" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addBet('win', 200, 1.85)}
          className="flex-1 px-3 py-2 bg-green/15 text-green rounded-sm text-xs font-semibold cursor-pointer border border-green/30 hover:bg-green/25"
        >
          + Výhra (200 Kč @ 1.85)
        </button>
        <button
          type="button"
          onClick={() => addBet('loss', 200, 1.85)}
          className="flex-1 px-3 py-2 bg-red/15 text-red rounded-sm text-xs font-semibold cursor-pointer border border-red/30 hover:bg-red/25"
        >
          − Prohra (200 Kč)
        </button>
      </div>
    </div>
  );
}
