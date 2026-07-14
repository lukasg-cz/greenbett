import type { Metadata } from 'next';
import { ValueBetCalculator } from '@/components/tools/ValueBetCalculator';

export const metadata: Metadata = {
  title: 'Value Bet Calculator',
  description:
    'Zjisti, jestli má tvůj tip kladnou očekávanou hodnotu (EV). Porovnej pravděpodobnost s kurzem a spočítej optimální sázku podle Kellyho kritéria.',
};

export default function ValueBetPage() {
  return <ValueBetCalculator />;
}
