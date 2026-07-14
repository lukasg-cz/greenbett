'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/sporty/football', label: 'Sporty' },
  { href: '/kurzy', label: 'Porovnání kurzů' },
  { href: '/scanner', label: 'Value Scanner' },
  { href: '/kalkulacka', label: 'Kalkulačka' },
  { href: '/nastroje/poisson', label: 'Poisson' },
  { href: '/statistiky', label: 'Statistiky' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/forum', label: 'Fórum' },
  { href: '/vysledky', label: 'Výsledky' },
  { href: '/cenik', label: 'Ceník' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            open ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            open ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      <div
        className={`fixed inset-0 top-[72px] bg-black/98 z-[9998] transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-gray-300 text-sm font-semibold uppercase tracking-wider no-underline hover:text-green transition-all border-b border-gray-800"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-6">
            <Link href="/prihlaseni" className="btn-login flex-1 text-center" onClick={() => setOpen(false)}>
              Přihlásit se
            </Link>
            <Link href="/registrace" className="btn-register flex-1 text-center" onClick={() => setOpen(false)}>
              Registrace
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
