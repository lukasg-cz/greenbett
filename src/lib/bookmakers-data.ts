export interface Bookmaker {
  name: string;
  slug: string;
  rating: number;
  pros: string[];
  cons: string[];
  features: {
    live: boolean;
    cashout: boolean;
    app: boolean;
    livestream: boolean;
  };
  sports: string;
  minDeposit: string;
  note: string;
}

export const BOOKMAKERS: Bookmaker[] = [
  {
    name: 'Tipsport',
    slug: 'tipsport',
    rating: 4.5,
    pros: ['Nejširší nabídka sportů a lig', 'Rychlé výběry', 'Kvalitní mobilní aplikace'],
    cons: ['Kurzy občas pod průměrem', 'Omezené limity u winning hráčů'],
    features: { live: true, cashout: true, app: true, livestream: true },
    sports: '40+ sportů, 200+ lig',
    minDeposit: '1 Kč',
    note: 'Největší česká sázkovka. Silná v lokálních soutěžích (Chance liga, extraliga).',
  },
  {
    name: 'Fortuna',
    slug: 'fortuna',
    rating: 4.3,
    pros: ['Competitive kurzy u top lig', 'Super kurzy akce', 'Dobrý live betting'],
    cons: ['Méně exotických trhů', 'Bonus podmínky bývají složité'],
    features: { live: true, cashout: true, app: true, livestream: true },
    sports: '35+ sportů, 150+ lig',
    minDeposit: '10 Kč',
    note: 'Tradiční hráč s licencí od roku 1990. Dobrá volba pro fotbal a hokej.',
  },
  {
    name: 'Betano',
    slug: 'betano',
    rating: 4.4,
    pros: ['Moderní UX', 'Vysoké kurzy u vybraných trhů', 'Generózní welcome bonus'],
    cons: ['Relativně nová na českém trhu', 'Méně lokálních soutěží'],
    features: { live: true, cashout: true, app: true, livestream: false },
    sports: '30+ sportů, 120+ lig',
    minDeposit: '50 Kč',
    note: 'Rychle rostoucí sázkovka s důrazem na mobilní sázení a live.',
  },
  {
    name: 'Sazka Sport',
    slug: 'sazka',
    rating: 4.0,
    pros: ['Důvěryhodná značka', 'Propojení s loterií', 'Jednoduchá registrace'],
    cons: ['Užší sportovní nabídka', 'Kurzy spíše průměrné'],
    features: { live: true, cashout: true, app: true, livestream: false },
    sports: '25+ sportů, 80+ lig',
    minDeposit: '10 Kč',
    note: 'Vhodná pro rekreační sázkaře. Méně trhů pro pokročilé strategie.',
  },
  {
    name: 'Synot Tip',
    slug: 'synot-tip',
    rating: 4.1,
    pros: ['Silná lokální přítomnost', 'Dobré kurzy u českého fotbalu', 'Pobočková síť'],
    cons: ['Webová verze zaostává za appkou', 'Omezené live trhy'],
    features: { live: true, cashout: true, app: true, livestream: false },
    sports: '30+ sportů, 100+ lig',
    minDeposit: '10 Kč',
    note: 'Tradiční český operátor. Výhodné pro sázky v kamenných pobočkách.',
  },
  {
    name: 'Chance',
    slug: 'chance',
    rating: 4.2,
    pros: ['Dobré kurzy u tenisu a basketbalu', 'Rychlá registrace', 'Cashback program'],
    cons: ['Méně propagačních akcí', 'Livestream jen u vybraných zápasů'],
    features: { live: true, cashout: true, app: true, livestream: true },
    sports: '30+ sportů, 110+ lig',
    minDeposit: '10 Kč',
    note: 'Stabilní volba s dobrým pokrytím evropských lig.',
  },
];

export const SELECTION_CRITERIA = [
  {
    title: 'Výše kurzů (margin)',
    desc: 'Rozdíl 0.02 v kurzu na stovkách sázek znamená desítky procent ROI. Porovnávej kurzy přes náš nástroj /kurzy.',
  },
  {
    title: 'Limity sázek',
    desc: 'Winning hráči narazí dřív nebo později na limitaci. Diverzifikace mezi 2–3 sázkovkami je klíčová.',
  },
  {
    title: 'Rychlost výběru',
    desc: 'Ověř si, jak rychle sázkovka vyplácí. Tipsport a Fortuna obvykle do 24 hodin.',
  },
  {
    title: 'Live betting & cashout',
    desc: 'Pro live strategie potřebuješ rychlou aktualizaci kurzů a funkční cashout.',
  },
  {
    title: 'Mobilní aplikace',
    desc: 'Line shopping a rychlé sázky vyžadují stabilní appku. Testuj před větším vkladem.',
  },
  {
    title: 'Licence a bezpečnost',
    desc: 'Sázej jen u operátorů s licencí od Úřadu pro regulaci hazardních her (ÚRHH).',
  },
];
