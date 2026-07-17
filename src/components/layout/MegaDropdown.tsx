'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { MOCK_SIGNALS } from '@/lib/api/mock-data';

interface MegaItem {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const sportItems: MegaItem[] = [
  { href: '/vysledky', icon: 'fa-chart-line', title: 'Signály & Analýzy', description: 'Denní tipy s confidence skóre a strategií' },
  { href: '/live', icon: 'fa-satellite-dish', title: 'Live Dashboard', description: 'Živé zápasy, skóre a pohyb kurzů' },
  { href: '/statistiky', icon: 'fa-table', title: 'Statistiky lig', description: 'Tabulky, průměry gólů, H2H, trendy' },
  { href: '/kurzy', icon: 'fa-balance-scale', title: 'Porovnání kurzů', description: 'Porovnej kurzy napříč českými sázkovkami' },
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
  const router = useRouter();
  const [activeSport, setActiveSport] = useState('football');

  const previewSignals = useMemo(() => {
    return MOCK_SIGNALS.filter((signal) => signal.sport === activeSport)
      .sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (b.status === 'pending' && a.status !== 'pending') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 3);
  }, [activeSport]);

  const activeSportLabel = sports.find((sport) => sport.id === activeSport)?.label ?? activeSport;

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
                  router.push(`/sporty/${sport.id}`);
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
                href={`${item.href}?sport=${activeSport}`}
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

          <div className="mt-5 pt-5 border-t border-[#eee]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[0.7rem] font-bold uppercase tracking-[2px] text-green-dark">
                Aktuální signály — {activeSportLabel}
              </div>
              <Link
                href={`/vysledky?sport=${activeSport}`}
                className="text-[0.75rem] font-semibold text-green-dark no-underline hover:underline"
              >
                Zobrazit vše →
              </Link>
            </div>
            {previewSignals.length > 0 ? (
              <div className="flex flex-col gap-2">
                {previewSignals.map((signal) => (
                  <Link
                    key={signal.id}
                    href={`/vysledky?sport=${activeSport}`}
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-[#f8f8f8] border border-[#eee] rounded-md no-underline hover:border-green-dark/40 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="text-[0.82rem] font-semibold text-dark truncate">
                        {signal.matchHome} vs {signal.matchAway}
                      </div>
                      <div className="text-[0.72rem] text-gray-500 truncate">
                        {signal.market} · kurz {signal.odds.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[0.72rem] font-bold text-green-dark">{signal.confidence}/10</div>
                      <div className="text-[0.65rem] uppercase text-gray-400">{signal.status}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-3.5 py-3 bg-[#f8f8f8] border border-[#eee] rounded-md text-[0.78rem] text-gray-500">
                Pro tento sport zatím nemáme žádné signály. Zkus jiný sport nebo se podívej na celou evidenci.
              </div>
            )}
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
