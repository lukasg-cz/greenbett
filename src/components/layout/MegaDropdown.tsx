'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MegaItem {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const sportItems: MegaItem[] = [
  { href: '/sporty', icon: 'fa-chart-line', title: 'Signály & Analýzy', description: 'Denní tipy s confidence skóre a strategií' },
  { href: '/live', icon: 'fa-satellite-dish', title: 'Live Dashboard', description: 'Živé zápasy, skóre a pohyb kurzů' },
  { href: '/statistiky', icon: 'fa-table', title: 'Statistiky lig', description: 'Tabulky, průměry gólů, H2H, trendy' },
  { href: '/scanner', icon: 'fa-search-dollar', title: 'Value Bet Scanner', description: 'Najdi sázky s kladnou očekávanou hodnotou' },
];

const sports = [
  { id: 'football', label: '⚽ Fotbal' },
  { id: 'hockey', label: '🏒 Hokej' },
  { id: 'basketball', label: '🏀 Basketbal' },
  { id: 'tennis', label: '🎾 Tenis' },
  { id: 'baseball', label: '⚾ Baseball' },
  { id: 'amfootball', label: '🏈 Am. fotbal' },
  { id: 'esports', label: '🎮 Esporty' },
];

interface MegaDropdownProps {
  wide?: boolean;
  children?: React.ReactNode;
  showSportTabs?: boolean;
}

export function MegaDropdown({ wide, children, showSportTabs }: MegaDropdownProps) {
  const [activeSport, setActiveSport] = useState('football');

  return (
    <div
      className={`absolute top-[72px] left-1/2 -translate-x-1/2 bg-white rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-[250ms] p-8 z-[10000] ${
        wide ? 'min-w-[700px]' : 'min-w-[520px]'
      }`}
    >
      {showSportTabs && (
        <>
          <div className="flex border-b-2 border-[#eee] mb-5">
            {sports.map((sport) => (
              <button
                key={sport.id}
                type="button"
                className={`px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-wide cursor-pointer border-b-2 -mb-0.5 transition-all ${
                  activeSport === sport.id
                    ? 'text-green-dark border-green-dark'
                    : 'text-gray-500 border-transparent hover:text-green-dark'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSport(sport.id);
                }}
              >
                {sport.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-0">
            {sportItems.map((item) => (
              <Link
                key={item.title}
                href={`${item.href}${showSportTabs ? `?sport=${activeSport}` : ''}`}
                className="flex items-start gap-3.5 p-3.5 px-4 rounded-sm transition-all hover:bg-off-white no-underline cursor-pointer"
              >
                <div className="w-10 h-10 min-w-10 bg-gradient-to-br from-green to-green-dark rounded-sm flex items-center justify-center text-black">
                  <i className={`fas ${item.icon}`} />
                </div>
                <div>
                  <h4 className="text-[0.88rem] font-bold text-dark mb-0.5">{item.title}</h4>
                  <p className="text-[0.75rem] text-gray-500 leading-snug">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      {children}
    </div>
  );
}

export function MegaItem({ href, icon, title, description }: MegaItem) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3.5 p-3.5 px-4 rounded-sm transition-all hover:bg-off-white no-underline cursor-pointer"
    >
      <div className="w-10 h-10 min-w-10 bg-gradient-to-br from-green to-green-dark rounded-sm flex items-center justify-center text-black">
        <i className={`fas ${icon}`} />
      </div>
      <div>
        <h4 className="text-[0.88rem] font-bold text-dark mb-0.5">{title}</h4>
        <p className="text-[0.75rem] text-gray-500 leading-snug">{description}</p>
      </div>
    </Link>
  );
}

export function MegaSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 pt-6 border-t border-[#eee]">
      <div className="text-[0.7rem] font-bold uppercase tracking-[2px] text-green-dark mb-4">{title}</div>
      {children}
    </div>
  );
}

export function MegaTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.7rem] font-bold uppercase tracking-[2px] text-green-dark mb-4">
      {children}
    </div>
  );
}
