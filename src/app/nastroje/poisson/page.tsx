import type { Metadata } from 'next';
import { PoissonCalculator } from '@/components/tools/PoissonCalculator';

export const metadata: Metadata = {
  title: 'Poisson Football Calculator',
  description:
    'Poissonův model pro fotbal — pravděpodobnosti skóre, 1X2, over/under a BTTS na základě očekávaných gólů domácích a hostů.',
};

export default function PoissonPage() {
  return <PoissonCalculator />;
}
