import type { ForumCategory } from '@/types';

interface ForumCategoryCardProps {
  category: ForumCategory;
}

const iconMap: Record<string, string> = {
  fire: 'fa-fire',
  futbol: 'fa-futbol',
  'hockey-puck': 'fa-hockey-puck',
  'basketball-ball': 'fa-basketball-ball',
  gamepad: 'fa-gamepad',
  'chart-line': 'fa-chart-line',
};

export function ForumCategoryCard({ category }: ForumCategoryCardProps) {
  return (
    <div className="bg-dark-card border border-gray-700 rounded p-5 px-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-5 items-center transition-all hover:border-green cursor-pointer">
      <div className="w-12 h-12 bg-green rounded-sm flex items-center justify-center text-black text-xl">
        <i className={`fas ${iconMap[category.icon] ?? 'fa-comments'}`} />
      </div>
      <div>
        <h4 className="text-[0.95rem] font-bold mb-1">{category.name}</h4>
        <p className="text-[0.78rem] text-gray-400">{category.description}</p>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-green">{category.threadCount.toLocaleString('cs-CZ')}</div>
        <div className="text-[0.65rem] text-gray-400 uppercase">Vláken</div>
      </div>
      <div className="text-left md:text-right min-w-[180px]">
        <div className="text-[0.8rem] font-semibold text-gray-300">{category.latestTitle}</div>
        <div className="text-[0.7rem] text-gray-400">
          {category.latestAuthor} · {category.latestTime}
        </div>
      </div>
    </div>
  );
}
