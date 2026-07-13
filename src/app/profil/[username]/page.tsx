'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MOCK_LEADERBOARD } from '@/lib/api/mock-data';

const profitData = [
  { month: 'Led', profit: 5.2 },
  { month: 'Úno', profit: 12.8 },
  { month: 'Bře', profit: 18.4 },
  { month: 'Dub', profit: 25.1 },
  { month: 'Kvě', profit: 32.6 },
  { month: 'Čer', profit: 41.3 },
  { month: 'Čvc', profit: 52.8 },
  { month: 'Srp', profit: 61.2 },
  { month: 'Zář', profit: 70.5 },
  { month: 'Říj', profit: 75.8 },
  { month: 'Lis', profit: 79.4 },
  { month: 'Pro', profit: 82.1 },
];

interface ProfilPageProps {
  params: { username: string };
}

export default function ProfilPage({ params }: ProfilPageProps) {
  const user = MOCK_LEADERBOARD.find(
    (u) => u.name.toLowerCase() === params.username.toLowerCase()
  ) ?? MOCK_LEADERBOARD[0];

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-green">
            {user.initials}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">{user.name}</h1>
            <p className="text-gray-400">Tipér #{user.rank} v leaderboardu</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Tipy', value: String(user.tips) },
            { label: 'Hit Rate', value: user.hitRate },
            { label: 'ROI', value: user.roi },
            { label: 'Profit', value: `${user.profit} U` },
          ].map((stat) => (
            <div key={stat.label} className="bg-dark-card border border-gray-700 rounded p-5 text-center">
              <div className="text-2xl font-extrabold text-green">{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-dark-card border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Profit over time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="profit" stroke="#39FF14" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Streak</h3>
          <p className="text-xl font-bold">{user.streak}</p>
        </div>
      </div>
    </section>
  );
}
