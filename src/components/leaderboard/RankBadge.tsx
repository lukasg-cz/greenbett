interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  const className = rank <= 3 ? `rank-${rank}` : 'rank-other';
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-[0.8rem] ${className}`}>
      {rank}
    </div>
  );
}
