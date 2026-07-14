import type { SchoolCourse } from './school-types';

export const ADVANCED_COURSES: SchoolCourse[] = [
  {
    slug: 'expected-value',
    level: 'advanced',
    difficulty: 1,
    title: 'Expected Value (EV)',
    subtitle: 'Matematický základ value bettingu',
    description:
      'Pochopíš vzorec EV, implied vs true probability a jak poznat, kdy má sázka kladnou očekávanou hodnotu.',
    duration: '65 min',
    icon: 'fa-calculator',
    emoji: '📐',
    prerequisites: ['Kurzy, trhy a jak je číst', 'Bankroll management'],
    tools: [
      { label: 'Value Bet Scanner', href: '/scanner' },
      { label: 'Glosář — EV', href: '/glosar' },
    ],
    lessons: [
      {
        id: 'a1-l1',
        title: 'Vzorec EV a praktické příklady',
        summary: 'EV = (p × kurz) − 1 v reálných sázkách.',
        paragraphs: [
          'Expected Value = (pravděpodobnost výhry × kurz) − 1. Pokud je výsledek kladný, sázka má dlouhodobě ziskový potenciál. Příklad: 55 % šance × kurz 2.00 → EV = 0.55 × 2 − 1 = +0.10 = +10 %.',
          'Záporné EV znamená, že sázkovka má navrch — typická sázka bez analýzy má EV kolem −3 až −8 % kvůli marži.',
          'EV neříká, že vyhraješ tento zápas. Říká, že pokud bys opakoval stejnou sázku 1000× za stejný kurz, skončíš v plusu.',
        ],
        keyPoints: [
          'EV+ = dlouhodobě zisková sázka',
          'EV počítej před každým value tapem',
          'Jedna prohra nezpochybňuje kladné EV',
        ],
      },
      {
        id: 'a1-l2',
        title: 'True probability vs implied probability',
        summary: 'Jak odhadnout reálnou šanci výhry.',
        paragraphs: [
          'Implied probability vychází z kurzu sázkovky (1/kurz). True probability je tvůj odhad reálné šance — z dat, modelu nebo expertízy.',
          'Value existuje, když true probability > implied probability. Kurz 2.20 (45.5 % implied) při tvém odhadu 50 % → value.',
          'Odhad pravděpodobnosti je nejtěžší část. Začni konzervativně — raději tip nepodej, než přecenit edge.',
        ],
        keyPoints: [
          'Value = tvoje pravděpodobnost > implied z kurzu',
          'Konzervativní odhady chrání před falešným EV+',
          'Kalibruj odhady proti výsledkům v deníku',
        ],
      },
      {
        id: 'a1-l3',
        title: 'Margin a fair odds',
        summary: 'Jak spočítat férový kurz bez marže.',
        paragraphs: [
          'Fair odds = 1 / true probability. Při 50 % true prob je fair kurz 2.00. Pokud sázkovka nabízí 2.15, máš value.',
          'U 1X2 můžeš fair odds odvodit z modelu nebo porovnáním s sharp sázkovkami (Pinnacle). Pinnacle bývá nejblíže fair line.',
          'Nepodej value tip pod minimální EV práh — doporučujeme min. +3 % pro začátek, +5 % pro pokročilé.',
        ],
        keyPoints: [
          'Fair odds = 1 / tvoje pravděpodobnost',
          'Pinnacle jako benchmark fair line',
          'Min. EV práh filtruje šum',
        ],
      },
      {
        id: 'a1-l4',
        title: 'EV v různých trzích',
        summary: 'Totals, handicap, props — kde hledat edge.',
        paragraphs: [
          'Totals (over/under) často mají větší variance, ale i větší edge u informovaných sázkařů — zejména nižší ligy a méně sledované sporty.',
          'Handicapy vyžadují model skóre, ne jen výsledek. Props (střelci, karty) mají vyšší marži, ale i větší chyby sázkovek.',
          'Specializuj se — EV v NBA totals vyžaduje jiná data než EV v české fotbalové 1. ligy.',
        ],
        keyPoints: [
          'Různé trhy = různé zdroje edge',
          'Totals a nižší ligy = častý value zdroj',
          'Specializace zvyšuje kvalitu odhadu pravděpodobnosti',
        ],
      },
      {
        id: 'a1-l5',
        title: 'Cvičení: Ruční výpočet EV na 10 tipech',
        summary: 'Procvič si kalkulace před použitím scanneru.',
        paragraphs: [
          'Vyber 10 zápasů z víkendu. U každého odhadni pravděpodobnost jednoho výsledku, zapiš kurz, spočítej EV. Kolik má EV+?',
          'Porovnej své tipy s closing line — kde jsi měl value a kde ne?',
          'Použij scanner jako validaci, ne jako náhradu vlastního úsudku. Rozdíl mezi oběma tě naučí kalibrovat.',
        ],
        keyPoints: [
          '10 ručních výpočtů týdně buduje intuici',
          'Scanner = validace, ne slepá důvěra',
          'Sleduj shodu odhadu s closing line',
        ],
      },
    ],
  },
  {
    slug: 'value-betting-praxe',
    level: 'advanced',
    difficulty: 2,
    title: 'Hledání value v praxi',
    subtitle: 'Od teorie k reálným tipům',
    description:
      'Line shopping, soft vs sharp books, timing sázek a jak stavět vlastní proces hledání value.',
    duration: '70 min',
    icon: 'fa-search-dollar',
    emoji: '🔍',
    prerequisites: ['Expected Value (EV)'],
    tools: [
      { label: 'Porovnání kurzů', href: '/kurzy' },
      { label: 'Value Scanner', href: '/scanner' },
    ],
    lessons: [
      {
        id: 'a2-l1',
        title: 'Soft vs sharp sázkovky',
        summary: 'Kde vzniká value a kde tě limitují.',
        paragraphs: [
          'Sharp sázkovky (Pinnacle, Betfair) mají těsné kurzy a rychle limitují winning players. Soft books (české sázkovky) mají větší marži, ale i větší chyby v kurzech — tam je value pro retail sázkaře.',
          'Strategie: hledej value na soft books, benchmarkuj proti Pinnacle. Pokud je kurz na Tipsportu výrazně nad Pinnacle, může jít o value.',
          'Počítej s limitací — winning account může dostat snížené sázky. Diverzifikuj mezi 2–3 operátory.',
        ],
        keyPoints: [
          'Soft books = větší edge, sharp = benchmark',
          'Pinnacle jako referenční fair line',
          'Diverzifikuj účty kvůli limitům',
        ],
      },
      {
        id: 'a2-l2',
        title: 'Timing — kdy vsadit',
        summary: 'Early line, closing line a injury news.',
        paragraphs: [
          'Early lines (72+ h před zápasem) bývají měkčí — sázkovky ještě nemají všechny informace. Closing line je nejpřesnější.',
          'Value často vzniká early, když máš lepší informaci než trh (zranění, sestavy, počasí). Ale můžeš vsadit i blízko výkopu, pokud line ještě neodráží news.',
          'Sleduj oficiální sestavy 1–2 h před zápasem — velký pohyb line je příležitost nebo past (past = line už správně reagovala).',
        ],
        keyPoints: [
          'Early line = víc chyb, closing = nejpřesnější',
          'Informační edge před trhem = value',
          'Sestavy a news = hlavní timing trigger',
        ],
      },
      {
        id: 'a2-l3',
        title: 'Stavba vlastního value procesu',
        summary: 'Checklist od analýzy po podání sázky.',
        paragraphs: [
          '1) Vyber sport/ligu, které sleduješ. 2) Zkontroluj injury a sestavy. 3) Odhadni true probability. 4) Porovnej kurzy (min. 3 books). 5) Spočítej EV — min. +3 %.',
          '6) Zkontroluj unit size v kalkulačce. 7) Zapiš tip do deníku před podáním. 8) Po zápase zaznamenej closing line pro CLV analýzu.',
          'Proces trvá 10–20 min na tip. Kvalita > kvantita — 3 value tipy týdně stačí.',
        ],
        keyPoints: [
          'Checklist eliminuje impulzivní sázky',
          'Min. +3 % EV a line shopping povinné',
          '3 kvalitní tipy týdně > 15 náhodných',
        ],
      },
      {
        id: 'a2-l4',
        title: 'Časté chyby při hledání value',
        summary: 'Falešné EV, confirmation bias a cherry-picking.',
        paragraphs: [
          'Falešné EV: přeceníš pravděpodobnost, protože chceš tip. Confirmation bias: hledáš data podporující tvůj názor, ignoruješ proti.',
          'Cherry-picking: ukazuješ jen vyhrané value tipy, skrýváš prohry. Survivorship bias u „guru" tipů na sociálních sítích.',
          'Obrana: předem definuj kritéria tipu, zapisuj VŠECHNY sázky, vyhodnocuj po 200+ sample.',
        ],
        keyPoints: [
          'Přecenění pravděpodobnosti = #1 chyba',
          'Zapisuj všechny tipy, ne jen výherní',
          '200+ sázek pro validaci strategie',
        ],
      },
      {
        id: 'a2-l5',
        title: 'Týdenní rutina value sázkaře',
        summary: 'Pondělí analýza, víkend sázky, neděle review.',
        paragraphs: [
          'Pondělí–středa: research nadcházejících kol, update modelů/notek. Čtvrtek–pátek: hledání early value, sledování line movement.',
          'Sobota–neděle: sestavy, live jen pokud máš plán, closing line capture. Neděle večer: weekly review — yield, CLV, chyby.',
          '1 hodina denně research stačí. Víc neznamená lepší — únava ničí edge.',
        ],
        keyPoints: [
          'Strukturovaný týden > chaotické sázení',
          'Weekly review je povinný',
          'Kvalitní příprava před víkendem',
        ],
      },
    ],
  },
  {
    slug: 'sportovni-data',
    level: 'advanced',
    difficulty: 3,
    title: 'Sportovní data a statistiky',
    subtitle: 'xG, forma, matchup a injury report',
    description:
      'Naučíš se číst pokročilé metriky, pracovat s injury reportem a stavět předzápasovou analýzu na datech.',
    duration: '75 min',
    icon: 'fa-database',
    emoji: '📈',
    prerequisites: ['Hledání value v praxi'],
    tools: [
      { label: 'Statistiky', href: '/statistiky' },
      { label: 'Live dashboard', href: '/live' },
    ],
    lessons: [
      {
        id: 'a3-l1',
        title: 'Fotbal: xG, forma a domácí/venkovní split',
        summary: 'Expected goals a co znamenají pro totals a 1X2.',
        paragraphs: [
          'xG (expected goals) měří kvalitu šancí, ne jen výsledek. Tým s vysokým xG ale nízkými góly může být „due" na regression — value v over.',
          'Forma posledních 5 zápasů bez kontextu (síla soupeřů) klamě. Lepší: xG trend, domácí/venkovní split, head-to-head poslední 3 roky.',
          'Greenbett statistiky agregují ligová data — používej je jako start, doplň vlastní scouting.',
        ],
        keyPoints: [
          'xG > surové skóre pro predikci',
          'Domácí/venkovní split je zásadní',
          'Kontext soupeřů v formě, ne jen W/L',
        ],
      },
      {
        id: 'a3-l2',
        title: 'Injury report a sestavy',
        summary: 'Kdy absence mění kurz a jak rychle reagovat.',
        paragraphs: [
          'Absence klíčového útočníka nebo brankáře může posunout fair odds o 5–15 %. Sleduj oficiální Twitter klubů, L'Équipe, lokální reportéry.',
          'Rotace před evropskými poháry — top týmy v lize B sestavě = value na soupeře, pokud trh nereagoval.',
          'Ne vsázej na rumor — počkej na oficiální sestavu nebo ověřený zdroj. Falešný tip na „zvěst zranění" stojí peníze.',
        ],
        keyPoints: [
          'Klíčové absence = velký dopad na fair odds',
          'Rotace před poháry = častý edge',
          'Jen ověřené zdroje, ne Twitter spekulace',
        ],
      },
      {
        id: 'a3-l3',
        title: 'Hokej, basketbal a tenis — specifika dat',
        summary: 'Goalie confirmed, pace, surface stats.',
        paragraphs: [
          'NHL: confirmed goalie je kritický — backup vs starter mění totals i moneyline. Sleduj starting goalie 24 h před.',
          'NBA: pace (possessions per game) řídí totals. Dva rychlé týmy = over bias. Back-to-back zápasy snižují výkon.',
          'Tenis: surface win % (clay/grass/hard) je základ. H2H na stejném povrchu > celkové H2H.',
        ],
        keyPoints: [
          'NHL = goalie news povinné',
          'NBA pace = klíč k totals',
          'Tenis = surface stats před H2H',
        ],
      },
      {
        id: 'a3-l4',
        title: 'Vlastní databáze a noty',
        summary: 'Notion, Excel nebo Greenbett — organizace znalostí.',
        paragraphs: [
          'Ved si noty per tým/ligu: styl hry, weakness, referee tendence, weather patterns. Po sezoně máš asset, který trh nemá.',
          'Taguj zápasy: „high variance", „trap game", „revenge game" — při review uvidíš, kde přeceňuješ narrative.',
          'Data bez interpretace jsou noise. Kombinuj čísla s kontextem (motivace, derby, weather).',
        ],
        keyPoints: [
          'Vlastní noty = dlouhodobá konkurenční výhoda',
          'Taguj typy zápasů pro review',
          'Čísla + kontext, ne jen čísla',
        ],
      },
      {
        id: 'a3-l5',
        title: 'Předzápasová analýza — šablona',
        summary: '5bodový framework pro každý tip.',
        paragraphs: [
          '1) Motivace a kontext (derby, sestup, pohár). 2) Sestavy a injury. 3) Statistický matchup (xG, pace, H2H). 4) Trh a line movement. 5) EV a unit size.',
          'Šablonu vyplň před každým value tapem. Pokud bod chybí, tip buď přeskoč, nebo sniž confidence.',
          'Po 50 vyplněných šablonách uvidíš, které body nejvíc korelují s CLV+.',
        ],
        keyPoints: [
          '5bodová šablona = konzistentní analýza',
          'Chybějící data → skip nebo nižší stake',
          'Koreluj šablonu s CLV při review',
        ],
      },
    ],
  },
  {
    slug: 'live-sazeni',
    level: 'advanced',
    difficulty: 4,
    title: 'Live sázení a čtení zápasu',
    subtitle: 'In-play strategie a rizika',
    description:
      'Live betting nabízí edge i pasti. Naučíš se, kdy vstoupit, jak číst momentum a proč je live náročnější než pre-match.',
    duration: '60 min',
    icon: 'fa-broadcast-tower',
    emoji: '📺',
    prerequisites: ['Sportovní data a statistiky', 'Disciplína a psychologie'],
    tools: [{ label: 'Live dashboard', href: '/live' }],
    lessons: [
      {
        id: 'a4-l1',
        title: 'Rozdíl pre-match vs live',
        summary: 'Vyšší marže, rychlejší rozhodování, větší tilt risk.',
        paragraphs: [
          'Live kurzy mají vyšší marži (5–10 %+) než pre-match. Informace máš víc (vidíš hru), ale čas na rozhodnutí je sekundy.',
          'Edge v live existuje u těch, kdo rozumí sportu lépe než algoritmus sázkovky — např. momentum, taktické změny, red card dopad.',
          'Začátečníkům doporučujeme 90 % pre-match, 10 % live až po zvládnutí psychologie.',
        ],
        keyPoints: [
          'Live marže je vyšší — potřebuješ větší edge',
          'Sleduj zápas aktivně, ne jen kurzy',
          'Live až po zvládnutí pre-match disciplíny',
        ],
      },
      {
        id: 'a4-l2',
        title: 'Kdy vstoupit do live sázky',
        summary: 'Overreaction, red card, early goal patterns.',
        paragraphs: [
          'Overreaction: early gól favorita → kurz na outsidera se zlepší, i když zápas je dlouhý. Trh často přecení jeden gól.',
          'Red card: přepočítej fair odds — ne vždy je 10 vs 11 = automatická výhra favorita. Kontext skóre a času.',
          'Momentum shift bez gólu (dominance, xG live) může být signál — ale vyžaduje zkušenost se sledováním.',
        ],
        keyPoints: [
          'Early gól často = overreaction v kurzech',
          'Red card vyžaduje přepočet, ne automatismus',
          'Live edge = zkušenost + rychlé rozhodnutí',
        ],
      },
      {
        id: 'a4-l3',
        title: 'Cash out a hedge',
        summary: 'Kdy uzamknout zisk a kdy nechat běžet.',
        paragraphs: [
          'Cash out není zdarma — sázkovka vloží marži. Někdy je lepší nechat sázku doběhnout, pokud true prob se nezměnila.',
          'Hedge (protisázka) dává smysl při velké změně stavu (např. tvůj tým vede 2:0, chceš lock profit). Počítej poplatky implicitní v kurzech.',
          'Emoční cash out po gólu soupeře je častá chyba — rozhoduj podle fair value, ne strachu.',
        ],
        keyPoints: [
          'Cash out obsahuje extra marži',
          'Hedge jen při významné změně fair prob',
          'Ne cash out ze strachu',
        ],
      },
      {
        id: 'a4-l4',
        title: 'Live checklist a limity',
        summary: 'Pravidla pro in-play, která drží.',
        paragraphs: [
          'Max 1 live sázka najednou. Max 2 live sázky za den. Sázej live jen u sportů, které aktivně sleduješ na obrazovce.',
          'Před zápasem si napiš 2–3 scénáře („pokud 0:0 do 30. min, over live…"). Impulzivní live bez scénáře = tilt.',
          'Live deník zvlášť — yield v live bývá horší než pre-match u většiny retail hráčů.',
        ],
        keyPoints: [
          'Max 2 live sázky denně',
          'Scénáře před zápasem, ne improvizace',
          'Sleduj live yield odděleně od pre-match',
        ],
      },
      {
        id: 'a4-l5',
        title: 'Cvičení: Paper trading live',
        summary: '4 týdny bez peněz — jen záznam hypotetických live tipů.',
        paragraphs: [
          'Měsíc sleduj zápasy a zapisuj live tipy, které BYs podal — bez sázení. Po měsíci spočítej hypotetický yield.',
          'Pokud paper trading live je záporný, nemáš edge — nepodejuj reálné live sázky.',
          'Teprve po 50+ paper live tipech s kladným výsledkem zvažuj malé real stakes (0.5 unit).',
        ],
        keyPoints: [
          'Paper trading = bezpečný test live edge',
          '50+ paper tipů před reálnými penězi',
          'Live je optional, ne povinnost',
        ],
      },
    ],
  },
];
