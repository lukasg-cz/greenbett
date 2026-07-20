import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPageLayout } from '@/components/content/InfoPageLayout';
import { BOOKMAKERS, SELECTION_CRITERIA } from '@/lib/bookmakers-data';

export const metadata: Metadata = {
  title: 'Sázkové kanceláře',
  description:
    'Přehled licencovaných sázkových kanceláří v ČR — srovnání kurzů, funkcí a tipů pro výběr sázkovky pro value betting.',
};

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`fas fa-star text-[0.7rem] ${
            i < full ? 'text-green' : i === full && half ? 'text-green/50' : 'text-gray-600'
          }`}
        />
      ))}
      <span className="text-gray-400 text-[0.8rem] ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function FeatureBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[0.7rem] font-semibold ${
        active ? 'bg-green/10 text-green' : 'bg-gray-800 text-gray-500'
      }`}
    >
      <i className={`fas ${active ? 'fa-check' : 'fa-times'} text-[0.55rem]`} />
      {label}
    </span>
  );
}

export default function SazkoveKancelarePage() {
  return (
    <InfoPageLayout
      label="Průvodce"
      title="SÁZKOVÉ"
      accent="KANCELÁŘE"
      description="Přehled licencovaných sázkovek v České republice. Porovnání funkcí, kurzů a tipů pro seriózní sázkaře."
    >
      <p>
        Výběr sázkové kanceláře je pro value bettora klíčový — margin sázkovky přímo ovlivňuje tvůj dlouhodobý zisk.
        V ČR můžeš legálně sázet u operátorů s licencí od{' '}
        <strong className="text-white">Úřadu pro regulaci hazardních her (ÚRHH)</strong>.
        Níže najdeš přehled hlavních hráčů na trhu.
      </p>

      <div className="bg-dark-card border border-gray-700 rounded p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 bg-green rounded flex items-center justify-center shrink-0">
          <i className="fas fa-chart-line text-black" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-1">Porovnej kurzy v reálném čase</h3>
          <p className="text-gray-400 text-[0.85rem]">
            Line shopping je základ value bettingu. V našem nástroji porovnáš kurzy napříč sázkovkami na jednom místě.
          </p>
        </div>
        <Link
          href="/kurzy"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green text-black font-bold text-[0.8rem] rounded no-underline hover:bg-green/90 transition-all shrink-0"
        >
          Porovnání kurzů <i className="fas fa-arrow-right text-[0.7rem]" />
        </Link>
      </div>

      <h3 className="text-white font-bold text-lg mt-2">Licencované sázkovky v ČR</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BOOKMAKERS.map((bm) => (
          <div key={bm.slug} className="bg-dark-card border border-gray-700 rounded p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-green font-bold text-[1rem]">{bm.name}</h4>
                <RatingStars rating={bm.rating} />
              </div>
              <span className="text-gray-500 text-[0.75rem]">min. vklad {bm.minDeposit}</span>
            </div>

            <p className="text-gray-400 text-[0.85rem] mb-3">{bm.note}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <FeatureBadge active={bm.features.live} label="Live" />
              <FeatureBadge active={bm.features.cashout} label="Cashout" />
              <FeatureBadge active={bm.features.app} label="App" />
              <FeatureBadge active={bm.features.livestream} label="Stream" />
            </div>

            <p className="text-gray-500 text-[0.75rem] mb-3">
              <i className="fas fa-futbol text-green mr-1" />
              {bm.sports}
            </p>

            <div className="grid grid-cols-2 gap-3 text-[0.8rem]">
              <div>
                <span className="text-green font-semibold block mb-1">+ Výhody</span>
                <ul className="text-gray-400 space-y-0.5">
                  {bm.pros.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-red-400 font-semibold block mb-1">− Nevýhody</span>
                <ul className="text-gray-400 space-y-0.5">
                  {bm.cons.map((c) => (
                    <li key={c}>· {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-white font-bold text-lg mt-4">Jak vybrat sázkovku</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SELECTION_CRITERIA.map((item) => (
          <div key={item.title} className="bg-dark-card border border-gray-700 rounded p-4">
            <h4 className="text-green font-bold text-[0.9rem] mb-1">{item.title}</h4>
            <p className="text-gray-400 text-[0.85rem]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-card border border-gray-700 rounded p-5 mt-2">
        <h3 className="text-green font-bold mb-2">Tip pro value bettory</h3>
        <p className="text-gray-400 text-[0.85rem] mb-3">
          Nemusíš vybírat jen jednu sázkovku. Profesionální sázkaři typicky udržují účty u 2–3 operátorů a sázejí tam,
          kde je nejlepší kurz. Díky tomu maximalizují EV a snižují dopad limitace účtu.
        </p>
        <p className="text-gray-400 text-[0.85rem]">
          Více o strategii výběru sázkovky najdeš v kurzu{' '}
          <Link href="/skola/uvod-do-sazeni" className="text-green no-underline hover:underline">
            Úvod do sázení
          </Link>{' '}
          v naší{' '}
          <Link href="/skola" className="text-green no-underline hover:underline">
            Škole sázení
          </Link>
          .
        </p>
      </div>

      <p className="text-gray-500 text-[0.8rem]">
        <i className="fas fa-exclamation-triangle text-yellow-500 mr-1" />
        Greenbett není sázková kancelář a neposkytuje sázkové služby. Hodnocení vychází z veřejně dostupných informací
        a zkušeností komunity. Sázení je rizikové — sázej zodpovědně, 18+.
      </p>
    </InfoPageLayout>
  );
}
