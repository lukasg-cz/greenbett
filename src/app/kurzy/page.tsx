import type { Metadata } from 'next';
import KurzyClient from './KurzyClient';

export const metadata: Metadata = {
  title: 'Porovnání kurzů',
  description: 'Porovnej kurzy napříč českými a evropskými sázkovkami. Zadej zápas nebo tip a najdi nejlepší kurz.',
};

export default function KurzyPage() {
  return <KurzyClient />;
}
