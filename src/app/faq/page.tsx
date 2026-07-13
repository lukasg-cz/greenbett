import { InfoPageLayout } from '@/components/content/InfoPageLayout';

export default function FaqPage() {
  return (
    <InfoPageLayout
      label="Nápověda"
      title="ČASTÉ"
      accent="DOTAZY"
      description="Odpovědi na nejčastější otázky o Greenbett."
    >
      {[
        { q: 'Co je Greenbett?', a: 'Greenbett je analytický servis pro sázkaře. Poskytujeme signály, statistiky, live data a nástroje pro value betting na 7 sportů.' },
        { q: 'Jak funguje zkušební přístup?', a: 'Po registraci získáš 7 dní plného přístupu zdarma. Není potřeba platební karta.' },
        { q: 'Co je value bet?', a: 'Value bet je sázka, kde je kurz vyšší než férová pravděpodobnost události. Dlouhodobě takové sázky generují zisk.' },
        { q: 'Jak se počítá confidence skóre?', a: 'Confidence (0–10) vyjadřuje sílu signálu na základě dat, formy, H2H a pohybu kurzů. Vyšší skóre = silnější signál.' },
        { q: 'Mohu vidět historii signálů?', a: 'Ano, veřejná evidence na /vysledky obsahuje kompletní track record — výhry i prohry.' },
        { q: 'Jak zruším předplatné?', a: 'Předplatné můžeš zrušit kdykoliv v klientské zóně. Přístup zůstane aktivní do konce zaplaceného období.' },
      ].map((item) => (
        <div key={item.q} className="bg-dark-card border border-gray-700 rounded p-5">
          <h3 className="text-green font-bold mb-2">{item.q}</h3>
          <p className="text-gray-400">{item.a}</p>
        </div>
      ))}
    </InfoPageLayout>
  );
}
