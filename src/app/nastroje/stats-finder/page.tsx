import type { Metadata } from 'next';
import { FootballStatsFinder } from '@/components/tools/FootballStatsFinder';

export const metadata: Metadata = {
  title: 'Football Stats Finder',
  description:
    'Zadej dva týmy a ligu — vygeneruj přesné odkazy na statistiky, H2H a kurzy pro Value Bet kalkulačku.',
};

export default function StatsFinderPage() {
  return <FootballStatsFinder />;
}
