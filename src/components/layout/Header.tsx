'use client';

import Link from 'next/link';
import { MegaDropdown, MegaItem, MegaSection, MegaTitle } from './MegaDropdown';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-[rgba(10,10,10,0.95)] backdrop-blur-[24px] border-b border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
          <div className="w-[38px] h-[38px] bg-green rounded-full flex items-center justify-center font-black text-base text-black shadow-green-glow-strong">
            G
          </div>
          <span className="text-[1.15rem] font-extrabold text-white tracking-[2px]">GREENBETT</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-0 list-none h-full">
          {/* Sporty */}
          <li className="relative h-[72px] flex items-center group">
            <div className="flex items-center gap-1.5 px-[18px] h-full text-gray-300 text-[0.78rem] font-semibold uppercase tracking-wider cursor-pointer group-hover:text-green transition-all">
              Sporty <i className="fas fa-chevron-down text-[0.6rem] group-hover:rotate-180 transition-transform" />
            </div>
            <MegaDropdown wide showSportTabs />
          </li>

          {/* Nástroje */}
          <li className="relative h-[72px] flex items-center group">
            <div className="flex items-center gap-1.5 px-[18px] h-full text-gray-300 text-[0.78rem] font-semibold uppercase tracking-wider cursor-pointer group-hover:text-green transition-all">
              Nástroje <i className="fas fa-chevron-down text-[0.6rem] group-hover:rotate-180 transition-transform" />
            </div>
            <MegaDropdown>
              <MegaTitle>Analytické nástroje</MegaTitle>
              <div className="grid grid-cols-1 gap-0">
                <MegaItem href="/scanner" icon="fa-search-dollar" title="Value Bet Scanner" description="Automatická detekce value příležitostí" />
                <MegaItem href="/nastroje/value-bet" icon="fa-chart-line" title="Value Bet kalkulačka" description="EV, edge a doporučená sázka podle Kellyho" />
                <MegaItem href="/nastroje/stats-finder" icon="fa-magnifying-glass-chart" title="Football Stats Finder" description="Odkazy na statistiky, H2H a kurzy pro kalkulačku" />
                <MegaItem href="/kalkulacka" icon="fa-calculator" title="Bankroll Kalkulačka" description="Kelly criterion, flat staking, optimální stake" />
                <MegaItem href="/nastroje/poisson" icon="fa-futbol" title="Poisson kalkulačka" description="Pravděpodobnosti gólů, 1X2, over/under a BTTS" />
                <MegaItem href="/statistiky" icon="fa-chart-bar" title="Statistiky lig" description="Komplexní data per liga a tým" />
              </div>
            </MegaDropdown>
          </li>

          {/* Komunita */}
          <li className="relative h-[72px] flex items-center group">
            <div className="flex items-center gap-1.5 px-[18px] h-full text-gray-300 text-[0.78rem] font-semibold uppercase tracking-wider cursor-pointer group-hover:text-green transition-all">
              Komunita <i className="fas fa-chevron-down text-[0.6rem] group-hover:rotate-180 transition-transform" />
            </div>
            <MegaDropdown>
              <MegaTitle>Komunita & Soutěže</MegaTitle>
              <div className="grid grid-cols-1 gap-0">
                <MegaItem href="/leaderboard" icon="fa-trophy" title="Tipérský Leaderboard" description="Žebříček nejúspěšnějších tipérů" />
                <MegaItem href="/forum" icon="fa-comments" title="Fórum & Diskuze" description="Diskutuj o zápasech a strategiích" />
                <MegaItem href="/kontakt" icon="fa-paper-plane" title="Telegram skupina" description="Připoj se k 1 800+ aktivním členům" />
              </div>
            </MegaDropdown>
          </li>

          {/* Více */}
          <li className="relative h-[72px] flex items-center group">
            <div className="flex items-center gap-1.5 px-[18px] h-full text-gray-300 text-[0.78rem] font-semibold uppercase tracking-wider cursor-pointer group-hover:text-green transition-all">
              Více <i className="fas fa-chevron-down text-[0.6rem] group-hover:rotate-180 transition-transform" />
            </div>
            <MegaDropdown wide>
              <div className="grid grid-cols-2 gap-0">
                <div>
                  <MegaTitle>Naučit se</MegaTitle>
                  <MegaItem href="/skola" icon="fa-book" title="Škola sázení" description="Články a návody pro začátečníky i pokročilé" />
                  <MegaItem href="/glosar" icon="fa-spell-check" title="Glosář pojmů" description="Value bet, EV, yield, handicap..." />
                  <MegaItem href="/faq" icon="fa-question-circle" title="FAQ" description="Odpovědi na časté dotazy" />
                </div>
                <div>
                  <MegaTitle>Jak začít</MegaTitle>
                  <MegaItem href="/registrace" icon="fa-rocket" title="Zkušební přístup" description="7 dní zdarma, žádná karta" />
                  <MegaItem href="/cenik" icon="fa-tags" title="Cenové plány" description="Měsíční, kvartální, roční" />
                  <MegaSection title="O nás">
                    <MegaItem href="/o-nas" icon="fa-users" title="Náš tým" description="Kdo za Greenbett stojí" />
                  </MegaSection>
                </div>
              </div>
            </MegaDropdown>
          </li>

          <li className="h-[72px] flex items-center">
            <Link href="/cenik" className="flex items-center px-[18px] h-full text-gray-300 text-[0.78rem] font-semibold uppercase tracking-wider no-underline hover:text-green transition-all">
              Ceník
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2.5">
          <Link href="/prihlaseni" className="btn-login hidden sm:inline-flex items-center gap-1.5">
            <i className="fas fa-arrow-right" /> Přihlásit se
          </Link>
          <Link href="/registrace" className="btn-register hidden sm:inline-flex items-center gap-1.5">
            <i className="fas fa-user-plus" /> Registrace
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
