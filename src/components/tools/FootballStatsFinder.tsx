'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  CHECKLIST_ITEMS,
  generateStatsLinks,
  type StatsLink,
} from '@/lib/calculations/football-stats-finder';

const inputClass =
  'w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3.5 py-3 text-white text-base outline-none transition-colors focus:border-green placeholder:text-[#555]';

function LinkButton({ link }: { link: StatsLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#e0e0e0] no-underline text-[13px] font-semibold transition-all hover:border-green hover:bg-[#1e1e1e] hover:text-white"
    >
      <span className="text-lg w-6 text-center shrink-0">{link.icon}</span>
      <span className="flex-1">{link.name}</span>
      {link.tag ? (
        <span
          className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-[10px] font-bold shrink-0 ${
            link.tag === 'primary'
              ? 'bg-green/15 text-green border border-green/30'
              : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
          }`}
        >
          {link.tagText}
        </span>
      ) : null}
      <span className="text-green text-sm">→</span>
    </a>
  );
}

function LinkCategory({
  icon,
  title,
  description,
  dataItems,
  links,
}: {
  icon: string;
  title: string;
  description: string;
  dataItems: string[];
  links: StatsLink[];
}) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-5 hover:border-[#333] transition-colors">
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-extrabold uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-xs text-[#888] mb-3.5 leading-relaxed">{description}</p>
      <div className="text-[11px] text-green uppercase tracking-wide font-bold mb-2">Co tam najdeš:</div>
      <ul className="list-none mb-3.5">
        {dataItems.map((item) => (
          <li key={item} className="text-xs text-[#aaa] py-0.5 flex items-center gap-1.5">
            <span className="text-green font-bold text-[11px]">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <LinkButton key={link.url + link.name} link={link} />
        ))}
      </div>
    </div>
  );
}

export function FootballStatsFinder() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [checked, setChecked] = useState<boolean[]>(() => CHECKLIST_ITEMS.map(() => false));
  const [searchResult, setSearchResult] = useState<{
    home: string;
    away: string;
    links: ReturnType<typeof generateStatsLinks>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkedCount = useMemo(() => checked.filter(Boolean).length, [checked]);
  const progressPct = Math.round((checkedCount / CHECKLIST_ITEMS.length) * 100);

  function handleSearch() {
    const home = homeTeam.trim();
    const away = awayTeam.trim();
    if (!home || !away) {
      setError('Zadej oba týmy.');
      return;
    }
    setError(null);
    setChecked(CHECKLIST_ITEMS.map(() => false));
    setSearchResult({
      home,
      away,
      links: generateStatsLinks(home, away),
    });
    requestAnimationFrame(() => {
      document.getElementById('stats-finder-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function handleClear() {
    setHomeTeam('');
    setAwayTeam('');
    setSearchResult(null);
    setError(null);
    setChecked(CHECKLIST_ITEMS.map(() => false));
  }

  function toggleCheck(index: number) {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className="max-w-[1100px] mx-auto px-5 py-5">
      <div className="inline-flex items-center gap-1.5 bg-green/15 border border-green/40 rounded-full px-3.5 py-1 text-xs text-green uppercase tracking-wider mb-3">
        <span className="w-2 h-2 bg-green rounded-full" />
        Vyhledávač
      </div>

      <h1 className="text-[32px] max-[850px]:text-[22px] font-black uppercase mb-2">
        Football Stats <span className="text-green">Finder</span>
      </h1>
      <p className="text-[#888] text-sm mb-7 leading-relaxed max-w-[750px]">
        Zadej dva týmy — vygenerujeme ti přesné odkazy na stránky, kde najdeš všechny statistiky potřebné pro Value Bet
        kalkulačku. Jeden klik = správná stránka s daty.
      </p>

      <div className="bg-[#141414] border border-[#222] rounded-xl p-6 mb-5">
        <div className="text-[15px] font-extrabold uppercase mb-5 tracking-wide">
          <span className="mr-1.5">🔍</span>
          Najdi zápas
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">Domácí tým</label>
            <input
              type="text"
              className={inputClass}
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="např. Sparta Praha"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">Hostující tým</label>
            <input
              type="text"
              className={inputClass}
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="např. Slavia Praha"
              autoComplete="off"
            />
          </div>
        </div>

        {error ? (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red/10 border border-red/30 text-red text-sm">{error}</div>
        ) : null}

        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleSearch}
            className="px-7 py-3 rounded-lg text-sm font-bold uppercase tracking-wide bg-green text-black hover:opacity-85 transition-opacity"
          >
            🔍 Vyhledat statistiky
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-7 py-3 rounded-lg text-sm font-bold uppercase tracking-wide bg-[#2a2a2a] text-[#e0e0e0] border border-[#444] hover:opacity-85 transition-opacity"
          >
            Vyčistit
          </button>
        </div>
      </div>

      {searchResult ? (
        <div id="stats-finder-results">
          <div className="flex items-center justify-center gap-6 p-6 mb-5 bg-[#141414] border border-[#222] rounded-xl max-[850px]:flex-col max-[850px]:gap-2.5">
            <div className="text-center flex-1">
              <div className="text-[22px] font-extrabold uppercase">{searchResult.home}</div>
              <div className="text-xs text-[#888] mt-1">Domácí</div>
            </div>
            <div className="text-2xl font-black text-green">VS</div>
            <div className="text-center flex-1">
              <div className="text-[22px] font-extrabold uppercase">{searchResult.away}</div>
              <div className="text-xs text-[#888] mt-1">Hosté</div>
            </div>
          </div>

          <div className="bg-green/[0.06] border border-green/20 rounded-[10px] px-5 py-4 mb-5 text-sm text-[#ccc] leading-relaxed">
            <strong className="text-green">📋 Jak na to:</strong> Klikni na odkazy níže — každý se otevře v novém tabu.
            Na každé stránce najdeš konkrétní data popsaná v sekci „Co tam najdeš“. Zaškrtávej checklist dole a až budeš
            mít vše, přejdi do Value Bet kalkulačky.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            <LinkCategory
              icon="📊"
              title="Statistiky týmů"
              description="Průměr vstřelených a obdržených gólů na zápas, doma i venku. Základ pro Poissonův model."
              dataItems={[
                'Góly vstřelené doma / venku (průměr)',
                'Góly obdržené doma / venku (průměr)',
                'Počet odehraných zápasů',
                'Celkové skóre sezóny',
              ]}
              links={searchResult.links.teamStats}
            />
            <LinkCategory
              icon="🏟️"
              title="Ligové průměry"
              description="Celkový průměr gólů na zápas v lize, průměr domácích a hostujících týmů. Baseline pro výpočet útočné síly a obranné slabosti."
              dataItems={[
                'Průměr gólů na zápas (celá liga)',
                'Průměr gólů domácích týmů',
                'Průměr gólů hostujících týmů',
                'Tabulka ligy',
              ]}
              links={searchResult.links.league}
            />
            <LinkCategory
              icon="⚔️"
              title="Vzájemné zápasy (H2H)"
              description="Výsledky posledních 3 vzájemných zápasů. Kalkulačka je váží 50/30/20 % (nejnovější = nejvíc)."
              dataItems={[
                'Poslední 3 vzájemné zápasy (skóre)',
                'Historická bilance',
                'Průměr gólů ve vzájemných zápasech',
              ]}
              links={searchResult.links.h2h}
            />
            <LinkCategory
              icon="💰"
              title="Kurzy bookmakerů"
              description="Aktuální kurzy na 1X2, Over/Under a BTTS. Porovnej víc bookmakerů — hledej nejvyšší kurz."
              dataItems={[
                'Kurzy 1X2 od více bookmakerů',
                'Over/Under 2.5 kurzy',
                'BTTS (oba skórují) kurzy',
                'Pohyb kurzů',
              ]}
              links={searchResult.links.odds}
            />
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-xl p-5 mb-5">
            <div className="text-sm font-extrabold uppercase mb-4 tracking-wide">✅ Checklist — máš všechna data?</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CHECKLIST_ITEMS.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleCheck(index)}
                  className={`flex items-center gap-2 px-3 py-2.5 bg-[#1a1a1a] border rounded-lg text-[13px] text-left transition-all cursor-pointer ${
                    checked[index] ? 'border-green bg-green/[0.06]' : 'border-[#2a2a2a] hover:border-[#444]'
                  }`}
                >
                  <span
                    className={`w-[18px] h-[18px] border-2 rounded flex items-center justify-center shrink-0 text-xs transition-all ${
                      checked[index] ? 'bg-green border-green text-black' : 'border-[#444]'
                    }`}
                  >
                    {checked[index] ? '✓' : ''}
                  </span>
                  <span className={checked[index] ? 'text-white' : 'text-[#aaa]'}>{label}</span>
                </button>
              ))}
            </div>
            <div className="w-full h-1.5 bg-[#2a2a2a] rounded mt-4 overflow-hidden">
              <div className="h-full bg-green rounded transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="text-xs text-[#888] mt-1.5 text-right">
              {checkedCount} / {CHECKLIST_ITEMS.length} hotovo
              {checkedCount === CHECKLIST_ITEMS.length ? ' ✅ Můžeš přejít do kalkulačky!' : ''}
            </div>
          </div>

          <div className="bg-green/[0.06] border-l-[3px] border-green px-4 py-3.5 rounded-r-lg text-[13px] text-[#aaa] leading-relaxed">
            <strong className="text-green">💡 Tip:</strong> Až budeš mít všech 9 bodů zaškrtnutých, přejdi do{' '}
            <Link href="/nastroje/value-bet" className="text-green font-semibold no-underline hover:underline">
              Value Bet kalkulačky
            </Link>{' '}
            a zadej data. Kalkulačka spočítá pravděpodobnosti a řekne ti, kde je value bet.
          </div>
        </div>
      ) : null}
    </div>
  );
}
