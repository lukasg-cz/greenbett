import { InfoPageLayout } from '@/components/content/InfoPageLayout';
import Link from 'next/link';

export default function SkolaPage() {
  return (
    <InfoPageLayout
      label="Vzdělávání"
      title="ŠKOLA"
      accent="SÁZENÍ"
      description="Základy analytického sázení pro začátečníky i pokročilé."
    >
      {[
        { title: '1. Základy bankroll managementu', text: 'Nikdy nesázej víc než 1–3 % bankrollu na jeden tip. Flat staking je nejjednodušší strategie pro začátečníky.' },
        { title: '2. Co je Expected Value (EV)?', text: 'EV = (pravděpodobnost × kurz) − 1. Kladné EV znamená dlouhodobý zisk. Náš scanner hledá právě tyto příležitosti.' },
        { title: '3. Kelly criterion', text: 'Kelly určuje optimální velikost sázky na základě edge a kurzu. V praxi používej Half-Kelly nebo Quarter-Kelly pro nižší volatilitu.' },
        { title: '4. Jak číst signály', text: 'Každý signál obsahuje trh, kurz, confidence skóre a doporučený unit size. Vyšší confidence = větší doporučená sázka.' },
        { title: '5. Psychologie sázení', text: 'Vyhýbej se chasing losses, tiltu a overbettingu po výhře. Drž se systému a sleduj dlouhodobé výsledky.' },
      ].map((item) => (
        <div key={item.title} className="bg-dark-card border border-gray-700 rounded p-5">
          <h3 className="text-white font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.text}</p>
        </div>
      ))}
      <p>
        Vyzkoušej si teorii v praxi —{' '}
        <Link href="/kalkulacka" className="text-green hover:underline">bankroll kalkulačka</Link>
        {' '}a{' '}
        <Link href="/scanner" className="text-green hover:underline">value bet scanner</Link>.
      </p>
    </InfoPageLayout>
  );
}
