import { InfoPageLayout } from '@/components/content/InfoPageLayout';

export default function KontaktPage() {
  return (
    <InfoPageLayout
      label="Společnost"
      title="KONTAKT"
      accent="A PODPORA"
      description="Máš dotaz? Napiš nám."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-card border border-gray-700 rounded p-6">
          <h3 className="text-green font-bold mb-3"><i className="fas fa-envelope mr-2" />Email</h3>
          <p className="text-gray-300">podpora@greenbett.cz</p>
          <p className="text-gray-400 text-[0.85rem] mt-2">Odpovídáme do 24 hodin v pracovní dny.</p>
        </div>
        <div className="bg-dark-card border border-gray-700 rounded p-6">
          <h3 className="text-green font-bold mb-3"><i className="fab fa-telegram-plane mr-2" />Telegram</h3>
          <p className="text-gray-300">@greenbett_cz</p>
          <p className="text-gray-400 text-[0.85rem] mt-2">Rychlá podpora a komunitní diskuse.</p>
        </div>
        <div className="bg-dark-card border border-gray-700 rounded p-6">
          <h3 className="text-green font-bold mb-3"><i className="fab fa-discord mr-2" />Discord</h3>
          <p className="text-gray-300">discord.gg/greenbett</p>
          <p className="text-gray-400 text-[0.85rem] mt-2">Komunita tipérů a live diskuze o zápasech.</p>
        </div>
        <div className="bg-dark-card border border-gray-700 rounded p-6">
          <h3 className="text-green font-bold mb-3"><i className="fas fa-clock mr-2" />Provozní doba</h3>
          <p className="text-gray-300">Po–Pá 9:00–18:00</p>
          <p className="text-gray-400 text-[0.85rem] mt-2">Signály a live data běží 24/7.</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
