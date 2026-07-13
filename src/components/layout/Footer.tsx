import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark border-t border-gray-800 pt-[60px] pb-[30px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-[38px] h-[38px] bg-green rounded-full flex items-center justify-center font-black text-base text-black">
                G
              </div>
              <span className="text-[1.15rem] font-extrabold text-white tracking-[2px]">GREENBETT</span>
            </Link>
            <p className="text-gray-400 text-[0.82rem] leading-relaxed mt-3.5 max-w-[280px]">
              Analytický servis pro sázkaře, kteří chtějí vidět víc než kurz. 7 sportů, live data, transparentní výsledky.
            </p>
          </div>

          {[
            {
              title: 'Sporty',
              links: [
                { href: '/sporty', label: 'Fotbal' },
                { href: '/sporty?sport=hockey', label: 'Hokej' },
                { href: '/sporty?sport=basketball', label: 'Basketbal' },
                { href: '/sporty?sport=tennis', label: 'Tenis' },
                { href: '/sporty?sport=esports', label: 'Esporty' },
              ],
            },
            {
              title: 'Nástroje',
              links: [
                { href: '/live', label: 'Live Dashboard' },
                { href: '/scanner', label: 'Value Scanner' },
                { href: '/kalkulacka', label: 'Kalkulačka' },
                { href: '/statistiky', label: 'Statistiky lig' },
              ],
            },
            {
              title: 'Komunita',
              links: [
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/forum', label: 'Fórum' },
                { href: '#', label: 'Telegram' },
                { href: '#', label: 'Discord' },
              ],
            },
            {
              title: 'Společnost',
              links: [
                { href: '#', label: 'O nás' },
                { href: '#', label: 'Podmínky' },
                { href: '#', label: 'Soukromí' },
                { href: '#', label: 'Kontakt' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.7rem] font-bold uppercase tracking-[2px] text-gray-400 mb-4">
                {col.title}
              </h4>
              <ul className="list-none">
                {col.links.map((link) => (
                  <li key={link.label} className="mb-2">
                    <Link href={link.href} className="text-gray-300 text-[0.82rem] no-underline hover:text-green transition-all">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-5 flex justify-between items-center flex-wrap gap-3">
          <p className="text-gray-400 text-[0.75rem]">
            © 2024 GREENBETT. Všechna práva vyhrazena. 18+ · Sázení je rizikové.
          </p>
          <div className="flex gap-4">
            {['fa-telegram-plane', 'fa-instagram', 'fa-discord', 'fa-twitter'].map((icon) => (
              <a key={icon} href="#" className="text-gray-400 text-lg hover:text-green transition-all">
                <i className={`fab ${icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
