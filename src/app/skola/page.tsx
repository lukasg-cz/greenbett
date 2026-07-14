import type { Metadata } from 'next';
import { SchoolLanding } from '@/components/school/SchoolLanding';

export const metadata: Metadata = {
  title: 'Škola sázení',
  description:
    '12 kurzů analytického sázení — od základů bankroll managementu po CLV, Kelly criterion a profesionální portfolio. Začátečník, pokročilý, profesionál.',
};

export default function SkolaPage() {
  return <SchoolLanding />;
}
