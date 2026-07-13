import type { LeagueStat } from '@/types';

interface LeagueStatCardProps {
  league: LeagueStat;
}

export function LeagueStatCard({ league }: LeagueStatCardProps) {
  return (
    <div className="bg-dark-card border border-gray-700 rounded p-6 transition-all hover:border-green">
      <h4 className="text-[0.85rem] font-bold mb-4 flex items-center gap-2">{league.name}</h4>
      {Object.entries(league.stats).map(([key, val]) => (
        <div key={key} className="flex justify-between py-2 border-b border-gray-800 last:border-b-0 text-[0.8rem]">
          <span className="text-gray-400">{key}</span>
          <span className="font-semibold">{val}</span>
        </div>
      ))}
    </div>
  );
}
