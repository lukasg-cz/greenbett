import { InfoPageLayout } from '@/components/content/InfoPageLayout';

export default function SoukromiPage() {
  return (
    <InfoPageLayout
      label="Právní"
      title="OCHRANA"
      accent="SOUKROMÍ"
      description="Jak nakládáme s tvými osobními údaji."
    >
      <p>Poslední aktualizace: 1. 1. 2026</p>
      {[
        { title: 'Jaké údaje sbíráme', text: 'Email, uživatelské jméno a data o využívání služby (přihlášení, preference). Platební údaje zpracovává Stripe — my je neukládáme.' },
        { title: 'K čemu údaje používáme', text: 'Pro provoz účtu, zasílání signálů, zákaznickou podporu a zlepšování služby. Marketingové emaily pouze se souhlasem.' },
        { title: 'Sdílení s třetími stranami', text: 'Údaje sdílíme pouze s provozovateli infrastruktury (Supabase, Vercel, Stripe) za účelem poskytování služby.' },
        { title: 'Tvá práva', text: 'Máš právo na přístup, opravu a smazání údajů. Kontaktuj nás na podpora@greenbett.cz.' },
        { title: 'Cookies', text: 'Používáme nezbytné cookies pro přihlášení a funkčnost webu. Analytické cookies pouze se souhlasem.' },
      ].map((item) => (
        <div key={item.title}>
          <h3 className="text-white font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.text}</p>
        </div>
      ))}
    </InfoPageLayout>
  );
}
