import type { SchoolLevelInfo } from './school-types';

export const SCHOOL_LEVELS: SchoolLevelInfo[] = [
  {
    id: 'beginner',
    label: 'Začátečník',
    tagline: 'Základy bez zbytečné teorie',
    description:
      'Naučíš se, jak funguje sázení, jak spravovat peníze a jak se vyhnout nejčastějším chybám. Ideální start pro každého, kdo chce sázet systematicky.',
    badge: '4 kurzy · úroveň 1–4',
  },
  {
    id: 'advanced',
    label: 'Pokročilý',
    tagline: 'Value betting a analýza dat',
    description:
      'Pochopíš Expected Value, naučíš se hledat value v kurzech a pracovat se sportovními daty. Kurzy navazují na základy a vedou k profitabilnímu přístupu.',
    badge: '4 kurzy · úroveň 1–4',
  },
  {
    id: 'professional',
    label: 'Profesionál',
    tagline: 'Modely, CLV a portfolio',
    description:
      'Pokročilé staking strategie, vlastní modely pravděpodobnosti, hodnocení kvality tipů přes CLV a profesionální správa portfolia napříč sporty.',
    badge: '4 kurzy · úroveň 1–4',
  },
];
