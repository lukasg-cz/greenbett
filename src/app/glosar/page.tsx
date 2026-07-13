import { InfoPageLayout } from '@/components/content/InfoPageLayout';

export default function GlosarPage() {
  const terms = [
    { term: 'Value bet', def: 'Sázka, kde je kurz vyšší než reálná pravděpodobnost. Základ value bettingu.' },
    { term: 'EV (Expected Value)', def: 'Očekávaná hodnota sázky. Kladné EV = dlouhodobý zisk.' },
    { term: 'Yield / ROI', def: 'Návratnost investice. ROI 10 % = za každých 100 vsazených units zisk 10.' },
    { term: 'Hit Rate', def: 'Procento vyhraných tipů. Samo o sobě neříká o ziskovosti — záleží na kurzech.' },
    { term: 'Unit', def: 'Jednotka velikosti sázky. 1 unit = 1 % bankrollu (nebo fixní částka).' },
    { term: 'Kelly criterion', def: 'Matematický vzorec pro optimální velikost sázky na základě edge.' },
    { term: 'Flat staking', def: 'Sázení stejné částky na každý tip bez ohledu na confidence.' },
    { term: 'Line movement', def: 'Pohyb kurzů v čase. Sharp money často způsobuje rychlý pohyb line.' },
    { term: 'BTTS', def: 'Both Teams To Score — oba týmy dají gól.' },
    { term: 'Handicap / Spread', def: 'Virtuální navýšení/snížení skóre pro vyrovnání kurzů.' },
    { term: 'Closing line', def: 'Kurz těsně před začátkem zápasu. Benchmark pro hodnocení kvality tipu.' },
    { term: 'CLV (Closing Line Value)', def: 'Rozdíl mezi kurzem, za který jsi vsadil, a closing line. Pozitivní CLV = dobrý tip.' },
  ];

  return (
    <InfoPageLayout
      label="Slovník"
      title="GLOSÁŘ"
      accent="POJMŮ"
      description="Přehled nejdůležitějších pojmů ze světa sportovního sázení."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {terms.map((item) => (
          <div key={item.term} className="bg-dark-card border border-gray-700 rounded p-4">
            <h3 className="text-green font-bold text-[0.9rem] mb-1">{item.term}</h3>
            <p className="text-gray-400 text-[0.85rem]">{item.def}</p>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
