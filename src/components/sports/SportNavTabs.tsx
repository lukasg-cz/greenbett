'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SPORT_IDS } from '@/lib/sport-utils';
import { SPORT_PAGES } from '@/lib/sport-pages-data';

const tabs = SPORT_IDS.map((id) => ({
  id,
  label: SPORT_PAGES[id].label,
  emoji: SPORT_PAGES[id].emoji,
}));

export function SportNavTabs() {
  const pathname = usePathname();
  const activeSport = pathname.split('/').pop() ?? 'football';

  return (
    <div className="sticky top-[72px] z-50 bg-[#f5f5f5] border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeSport === tab.id;
            return (
              <Link
                key={tab.id}
                href={`/sporty/${tab.id}`}
                className={`flex items-center gap-2 px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-wide whitespace-nowrap no-underline border-b-2 transition-all ${
                  isActive
                    ? 'text-green-dark border-green-dark bg-white'
                    : 'text-gray-500 border-transparent hover:text-green-dark hover:bg-white/60'
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
