import { InfoPageLayout } from '@/components/content/InfoPageLayout';

export default function ONasPage() {
  return (
    <InfoPageLayout
      label="Společnost"
      title="O"
      accent="NÁS"
      description="Kdo za Greenbett stojí a proč to děláme."
    >
      <p>
        Greenbett vznikl z frustrace s nekvalitními tipérskými skupinami, které mažou prohry a slibují nereálné zisky.
        My děláme opak — transparentní evidenci, datově podložené signály a nástroje pro seriózní sázkaře.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: 'Lukáš G.', role: 'Founder & Lead Analyst', desc: 'Fotbal, hokej, value betting strategie' },
          { name: 'Martin P.', role: 'Data Engineer', desc: 'API integrace, statistiky, scanner algoritmy' },
          { name: 'Jana K.', role: 'Community Manager', desc: 'Fórum, Telegram, zákaznická podpora' },
        ].map((member) => (
          <div key={member.name} className="bg-dark-card border border-gray-700 rounded p-5 text-center">
            <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-3">
              {member.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-green text-[0.8rem] mb-2">{member.role}</p>
            <p className="text-gray-400 text-[0.85rem]">{member.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-gray-400">
        Pokrýváme 7 sportů, 120+ lig a každý měsíc publikujeme stovky signálů s veřejnou evidencí výsledků.
      </p>
    </InfoPageLayout>
  );
}
