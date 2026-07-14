import type { SchoolCourse } from './school-types';

export const PROFESSIONAL_COURSES: SchoolCourse[] = [
  {
    slug: 'kelly-criterion',
    level: 'professional',
    difficulty: 1,
    title: 'Kelly criterion a pokročilý staking',
    subtitle: 'Optimální velikost sázky podle edge',
    description:
      'Kelly vzorec, fractional Kelly, porovnání s flat stakingem a kdy kterou strategii použít.',
    duration: '70 min',
    icon: 'fa-percentage',
    emoji: '🎲',
    prerequisites: ['Expected Value (EV)', 'Bankroll management'],
    tools: [{ label: 'Bankroll kalkulačka', href: '/kalkulacka' }],
    lessons: [
      {
        id: 'p1-l1',
        title: 'Kelly vzorec — matematika',
        summary: 'f* = (bp − q) / b a praktická aplikace.',
        paragraphs: [
          'Kelly criterion určuje optimální frakci bankrollu: f* = (bp − q) / b, kde b = kurz − 1, p = pravděpodobnost výhry, q = 1 − p. Příklad: kurz 2.00, p = 55 % → f* = 10 % bankrollu.',
          'Full Kelly maximalizuje dlouhodobý růst, ale má vysokou volatilitu — série proher může snížit bankroll o 30–50 %.',
          'V praxi používají profíci fractional Kelly: Half-Kelly (50 %) nebo Quarter-Kelly (25 %) pro plynulejší křivku.',
        ],
        keyPoints: [
          'Kelly = optimální frakce při známém edge',
          'Full Kelly = vysoká variance',
          'Half/Quarter Kelly = standard u profíků',
        ],
      },
      {
        id: 'p1-l2',
        title: 'Kelly vs flat staking',
        summary: 'Kdy přejít z flat na Kelly.',
        paragraphs: [
          'Flat 1 % je bezpečný start. Kelly dává smysl až když máš kalibrované pravděpodobnosti (200+ tipů) a stabilní edge.',
          'Kelly škáluje sázku podle confidence — vyšší EV = větší stake. Chybný odhad pravděpodobnosti u Kelly bolí víc než u flat.',
          'Hybrid: flat 1 % base + max 0.5 % bonus při EV > 8 % a vysoké confidence.',
        ],
        keyPoints: [
          'Flat první, Kelly až po kalibraci',
          'Kelly zesiluje chyby v odhadu pravděpodobnosti',
          'Hybridní model je rozumný kompromis',
        ],
      },
      {
        id: 'p1-l3',
        title: 'Confidence scoring a unit tiers',
        summary: '1–10 skóre a mapování na unity.',
        paragraphs: [
          'Každý tip ohodnoť 1–10: data kvalita, EV velikost, line vs closing, injury certainty. 8+ = tier A (1.5 unit), 6–7 = tier B (1 unit), 5 = tier C (0.5 unit).',
          'Nikdy nesázej 3 unity na „pocit". Tier systém musí být předem definovaný, ne upravený po analýze pro větší sázku.',
          'Greenbett signály obsahují confidence — používej jako input, ne jako dogma.',
        ],
        keyPoints: [
          'Tier systém předem, ne ad-hoc',
          'Confidence = kvalita dat + EV + timing',
          'Max cap na jeden tip (např. 2 % bankrollu)',
        ],
      },
      {
        id: 'p1-l4',
        title: 'Variance a bankroll requirements',
        summary: 'Kolik unitů potřebuješ na přežití variance.',
        paragraphs: [
          'Při ROI 5 % a flat 1 % můžeš mít drawdown 20–30 unitů. Bankroll min. 100–200 unitů pro psychickou i matematickou bezpečnost.',
          'Kelly vyžaduje větší bankroll v unitech kvůli vyšším sázkám v peak moments. Simuluj Monte Carlo na 1000 sezón.',
          'Pod 50 unitů bankrollu nepoužívej Kelly — riziko ruin je příliš vysoké.',
        ],
        keyPoints: [
          'Min. 100 unitů bankroll pro pokročilé staking',
          'Simuluj drawdown před změnou strategie',
          'Malý bankroll = flat only',
        ],
      },
      {
        id: 'p1-l5',
        title: 'Implementace v kalkulačce',
        summary: 'Praktické nastavení Half-Kelly v Greenbett.',
        paragraphs: [
          'Otevři kalkulačku, zadej bankroll, kurz, pravděpodobnost, vyber Half-Kelly. Porovnej output s flat 1 %.',
          'Cvičení: 20 historických tipů — spočítej Kelly stake vs flat. Který by měl lepší risk-adjusted return?',
          'Dokumentuj své staking pravidla v deníku — jedna stránka „jak sázím" kterou čteš každý týden.',
        ],
        keyPoints: [
          'Kalkulačka = test před live Kelly',
          'Dokumentuj staking pravidla písemně',
          'Týdenní review dodržování pravidel',
        ],
      },
    ],
  },
  {
    slug: 'modely-pravdepodobnosti',
    level: 'professional',
    difficulty: 2,
    title: 'Vlastní modely pravděpodobnosti',
    subtitle: 'Poisson, Elo a jednoduché predikce',
    description:
      'Postavíš základní model pro fotbalové skóre, pochopíš Elo rating a kalibraci modelu proti realitě.',
    duration: '90 min',
    icon: 'fa-cogs',
    emoji: '⚙️',
    prerequisites: ['Sportovní data a statistiky', 'Expected Value (EV)'],
    tools: [{ label: 'Statistiky', href: '/statistiky' }],
    lessons: [
      {
        id: 'p2-l1',
        title: 'Úvod do modelování — proč model',
        summary: 'Od subjektivního odhadu k reprodukovatelnému systému.',
        paragraphs: [
          'Subjektivní odhad „50 %" není reprodukovatelný. Model bere vstupy (góly, xG, domácí výhoda) a vrací pravděpodobnosti konzistentně.',
          'Model nemusí být dokonalý — stačí být lepší než trh v určité nice (např. nižší fotbalové ligy).',
          'Začni jednoduchým modelem (Poisson), kalibruj, přidávej proměnné až když základ funguje.',
        ],
        keyPoints: [
          'Model = konzistence a škálovatelnost',
          'Lepší než trh v niche stačí',
          'Jednoduchý start, iterativní vylepšení',
        ],
      },
      {
        id: 'p2-l2',
        title: 'Poisson model pro fotbal',
        summary: 'Očekávané góly a pravděpodobnosti skóre.',
        paragraphs: [
          'Poisson předpokládá, že góly jsou nezávislé eventy. Vstup: očekávané góly domácích (λ home) a hostů (λ away) z historických dat.',
          'Z λ spočítáš P(0:0), P(1:0), P(over 2.5) atd. Excel nebo Python (scipy) stačí na start.',
          'Uprav λ pro domácí výhodu (+10–15 %), injury a league average. Porovnej output s kurzy — kde je rozdíl?',
        ],
        keyPoints: [
          'Poisson = základ fotbalového modelu',
          'λ z historických gólů/xG',
          'Domácí výhoda a injury úpravy λ',
        ],
      },
      {
        id: 'p2-l3',
        title: 'Elo a síla týmů',
        summary: 'Dynamický rating pro 1X2 a handicap.',
        paragraphs: [
          'Elo systém aktualizuje sílu týmu po každém zápase. Výhra proti silnějšímu = větší nárůst. Použitelný pro predikci 1X2.',
          'ClubElo, SPI (FiveThirtyEight) jsou veřejné benchmarky. Můžeš stavět vlastní Elo per liga.',
          'Elo selhává na motivaci (sezónní koniec), injury a nových trenérech — kombinuj s dalšími vstupy.',
        ],
        keyPoints: [
          'Elo = jednoduchý dynamický rating',
          'Veřejné benchmarky pro validaci',
          'Elo alone nestačí — kombinuj s kontextem',
        ],
      },
      {
        id: 'p2-l4',
        title: 'Kalibrace a backtesting',
        summary: 'Brier score, calibration plot a overfitting.',
        paragraphs: [
          'Backtest model na minulé sezóně — jaký yield bys měl vs closing line? Pokud model tipuje 60 % eventů a vyhrává 52 %, je overconfident.',
          'Calibration plot: osa X = predicted prob, Y = actual frequency. Ideální = diagonála.',
          'Overfitting: model perfektní na historii, selže live. Drž málo parametrů, out-of-sample test.',
        ],
        keyPoints: [
          'Backtest vs closing line, ne vs náhodné kurzy',
          'Calibration = predicted vs actual',
          'Overfitting = největší riziko vlastních modelů',
        ],
      },
      {
        id: 'p2-l5',
        title: 'Roadmap: od Excelu k automatizaci',
        summary: 'Kdy přejít na Python, API a cron joby.',
        paragraphs: [
          'Fáze 1: Excel/Sheets Poisson pro 1 ligu. Fáze 2: Python script + export kurzů z API. Fáze 3: automatický alert při EV+.',
          'Greenbett scanner směřuje k fázi 3 — tvůj vlastní model může být vstupem do porovnání s trhem.',
          'Dokumentuj každou verzi modelu — changelog jako u softwaru.',
        ],
        keyPoints: [
          'Excel → Python → automatizace',
          'Vlastní model jako diferenciátor',
          'Versioning modelů povinný',
        ],
      },
    ],
  },
  {
    slug: 'clv-hodnoceni',
    level: 'professional',
    difficulty: 3,
    title: 'CLV a hodnocení kvality tipů',
    subtitle: 'Closing Line Value jako benchmark',
    description:
      'Proč je CLV lepší metrika než hit rate, jak ho měřit a jak podle něj optimalizovat proces.',
    duration: '65 min',
    icon: 'fa-bullseye',
    emoji: '🎯',
    prerequisites: ['Hledání value v praxi', 'Kelly criterion'],
    tools: [{ label: 'Glosář — CLV', href: '/glosar' }],
    lessons: [
      {
        id: 'p3-l1',
        title: 'Co je Closing Line Value',
        summary: 'Kurz při podání vs closing line.',
        paragraphs: [
          'CLV = (tvůj kurz / closing kurz) − 1. Vsadil jsi za 2.10, closing je 1.95 → CLV+ = 2.10/1.95 − 1 ≈ +7.7 %. Beatl jsi trh.',
          'Closing line je nejefektivnější cena před výkopem — sharp money ji posunula k fair value. Být lepší než closing = dlouhodobý zisk bez ohledu na výsledek zápasu.',
          'Jeden prohraný tip s CLV+ je dobrý tip. Jedna výhra s CLV− může být špatný proces.',
        ],
        keyPoints: [
          'CLV+ = beat closing line',
          'CLV koreluje s dlouhodobým ziskem',
          'Výsledek zápasu ≠ kvalita tipu',
        ],
      },
      {
        id: 'p3-l2',
        title: 'Jak měřit CLV v praxi',
        summary: 'Záznam closing line, Pinnacle benchmark.',
        paragraphs: [
          'Při podání sázky zapiš kurz a čas. Před výkopem zapiš closing (Pinnacle pokud dostupné, jinak nejlepší česká).',
          'Průměrné CLV za měsíc: +2 % a víc = velmi dobré. 0 % = break-even proces. Záporné = revize strategie.',
          'CLV per sport/liga/trh — kde máš edge a kde ne.',
        ],
        keyPoints: [
          'Closing line vždy zaznamenat',
          'Pinnacle jako gold standard CLV',
          'Segmentuj CLV per liga/trh',
        ],
      },
      {
        id: 'p3-l3',
        title: 'CLV vs yield — co sledovat kdy',
        summary: 'Krátký vs dlouhý horizont.',
        paragraphs: [
          'Yield (ROI) je noisy na 50–100 sázkách. CLV je stabilnější indikátor kvality na 100+ tipech.',
          'Pokud máš CLV+ ale záporný yield 3 měsíce, může jít o variance — drž proces. Pokud CLV− a záporný yield, změň proces.',
          'Profíci reportují CLV týdně, yield čtvrtletně.',
        ],
        keyPoints: [
          'CLV = kvalita procesu (krátký horizont)',
          'Yield = výsledek (dlouhý horizont)',
          'CLV+ chrání před panikou při variance',
        ],
      },
      {
        id: 'p3-l4',
        title: 'Optimalizace podle CLV dat',
        summary: 'Které ligy/trhy vypnout, kde zvýšit objem.',
        paragraphs: [
          'Po 200 tipech: vypni segmenty s CLV−20 záporným. Zdvojnásob research tam, kde CLV+ > 3 %.',
          'Timing analýza: máš lepší CLV early nebo late? Přizpůsob rutinu.',
          'Sázkovky s nejhorším CLV — možná špatný timing nebo špatný sport v nabídce.',
        ],
        keyPoints: [
          'Vypni CLV− segmenty bez lítosti',
          'Zdvojnásob effort na CLV+ niche',
          'Analyzuj timing CLV',
        ],
      },
      {
        id: 'p3-l5',
        title: 'CLV dashboard — šablona',
        summary: 'Tabulka pro měsíční CLV review.',
        paragraphs: [
          'Sloupce: datum, zápas, trh, tvůj kurz, closing, CLV %, výsledek W/L, poznámka. Pivot: průměrné CLV per liga.',
          'Cíl měsíc 1: zaznamenat closing u 100 % tipů. Cíl měsíc 3: průměrné CLV > +1 %. Cíl měsíc 6: +2 %.',
          'Sdílej CLV stats s komunitou na fóru — feedback urychlí učení.',
        ],
        keyPoints: [
          '100 % tipů s closing line záznamem',
          'Měsíční CLV review povinný',
          'Cíl +2 % průměrné CLV dlouhodobě',
        ],
      },
    ],
  },
  {
    slug: 'portfolio-multi-sport',
    level: 'professional',
    difficulty: 4,
    title: 'Profesionální portfolio a multi-sport',
    subtitle: 'Správa více strategií napříč sporty',
    description:
      'Jak skládat portfolio tipů, diverzifikovat riziko, reportovat výsledky a škálovat objem sázek.',
    duration: '80 min',
    icon: 'fa-layer-group',
    emoji: '🏆',
    prerequisites: ['CLV hodnocení', 'Vlastní modely', 'Kelly criterion'],
    tools: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Leaderboard', href: '/leaderboard' },
    ],
    lessons: [
      {
        id: 'p4-l1',
        title: 'Portfolio přístup k sázení',
        summary: 'Více strategií jako investiční portfolio.',
        paragraphs: [
          'Jedna strategie (např. česká liga over) může mít špatný rok. Portfolio = fotbal + tenis + NBA totals s nezávislými edge zdroji.',
          'Alokuj bankroll per strategie: 40 % fotbal, 30 % tenis, 30 % basketbal. Při drawdownu v jedné strategii ostatní kompenzují.',
          'Korelace: všechny evropské fotbalové ligy v jeden víkend = vysoká korelace. Rozlož sázky v čase.',
        ],
        keyPoints: [
          'Portfolio snižuje riziko jedné strategie',
          'Alokace bankrollu per sport/strategie',
          'Korelace víkendových fotbalových tipů',
        ],
      },
      {
        id: 'p4-l2',
        title: 'Škálování objemu a limity',
        summary: 'Kdy zvyšovat stakes a jak obcházet limity legálně.',
        paragraphs: [
          'Škáluj až po 500+ sázkách s CLV+ a kladným yield. Zvyšuj unity po 10 % růstu bankrollu, ne dřív.',
          'Account limits: více sázkovek, syndikát s přáteli (legálně), sharp books pro benchmark ne pro volume.',
          'Nikdy neobcházej pravidla sázkoven pod falešnými identity — riziko konfiskace fondů.',
        ],
        keyPoints: [
          'Škáluj po datech, ne po pocitu',
          'Diverzifikace účtů kvůli limitům',
          'Legální cesty only',
        ],
      },
      {
        id: 'p4-l3',
        title: 'Reporting a KPI pro profíka',
        summary: 'Měsíční report: yield, CLV, drawdown, Sharpe.',
        paragraphs: [
          'Měsíční report: počet tipů, yield, průměrné CLV, max drawdown, hit rate, průměrný kurz, ROI per sport.',
          'Sharpe-like ratio: yield / volatility drawdownu. Vyšší = stabilnější výnos.',
          'Sdílej anonymizovaný report s mentorem nebo komunitou — blind spots odhalí jiní.',
        ],
        keyPoints: [
          'Měsíční KPI report povinný',
          'Sleduj yield, CLV, drawdown společně',
          'Externí review odhalí blind spots',
        ],
      },
      {
        id: 'p4-l4',
        title: 'Daňové a právní aspekty v ČR',
        summary: 'Přehled povinností — konzultuj odborníka.',
        paragraphs: [
          'Výhry ze sázení u licencovaných operátorů v ČR podléhají daňovým pravidlům. Sleduj změny legislativy.',
          'Vedení záznamů (deník) pomáhá při případné evidenci příjmů. Konzultuj daňového poradce při vyšších objemech.',
          'Greenbett není daňový poradce — tento modul je informativní. Profesionál řeší compliance.',
        ],
        keyPoints: [
          'Sleduj českou daňovou legislativu',
          'Deník = podklad pro evidenci',
          'Konzultuj odborníka při větším objemu',
        ],
      },
      {
        id: 'p4-l5',
        title: 'Dlouhodobá kariéra sázkaře',
        summary: 'Od side hustle k full-time — realistická očekávání.',
        paragraphs: [
          'Full-time betting vyžaduje 2–5 let track record, bankroll 500k+ Kč, disciplínu a psychickou odolnost. Většina zůstane u side income.',
          'Alternativy: analytik pro media, content creator, práce v industry — sázení není jediná cesta.',
          'Udržuj work-life balance, network v komunitě (fórum Greenbett), kontinuální vzdělávání.',
        ],
        keyPoints: [
          'Full-time = roky track record + velký bankroll',
          'Side income je realistický cíl pro většinu',
          'Komunita a kontinuální učení = udržitelnost',
        ],
      },
    ],
  },
];
