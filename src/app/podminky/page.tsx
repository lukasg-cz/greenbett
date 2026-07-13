import { InfoPageLayout } from '@/components/content/InfoPageLayout';

export default function PodminkyPage() {
  return (
    <InfoPageLayout
      label="Právní"
      title="OBCHODNÍ"
      accent="PODMÍNKY"
      description="Podmínky používání služby Greenbett."
    >
      <p>Poslední aktualizace: 1. 1. 2026</p>
      {[
        { title: '1. Předmět služby', text: 'Greenbett poskytuje analytické signály, statistiky a nástroje pro sportovní sázení. Nejsme sázková kancelář a nepřijímáme sázky.' },
        { title: '2. Předplatné', text: 'Služba je dostupná formou měsíčního, kvartálního nebo ročního předplatného. Zkušební přístup trvá 7 dní od registrace.' },
        { title: '3. Odpovědnost', text: 'Signály jsou analytického charakteru. Sázení je rizikové. Greenbett nezaručuje zisk a nenese odpovědnost za finanční ztráty.' },
        { title: '4. Duševní vlastnictví', text: 'Veškerý obsah (signály, analýzy, data) je chráněn autorským právem. Sdílení mimo platformu je zakázáno.' },
        { title: '5. Ukončení', text: 'Předplatné lze zrušit kdykoliv. Přístup zůstane aktivní do konce zaplaceného období.' },
      ].map((item) => (
        <div key={item.title}>
          <h3 className="text-white font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.text}</p>
        </div>
      ))}
    </InfoPageLayout>
  );
}
