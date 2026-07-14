import type { SchoolCourse } from './school-types';

export const BEGINNER_COURSES: SchoolCourse[] = [
  {
    slug: 'uvod-do-sazeni',
    level: 'beginner',
    difficulty: 1,
    title: 'Úvod do sportovního sázení',
    subtitle: 'Jak funguje sázení od nuly',
    description:
      'Kompletní průvodce pro úplné začátečníky. Pochopíš rozdíl mezi zábavou a investičním přístupem, typy sázek a jak vybrat sázkovku.',
    duration: '45 min',
    icon: 'fa-flag-checkered',
    emoji: '🎯',
    prerequisites: [],
    tools: [{ label: 'Glosář pojmů', href: '/glosar' }],
    lessons: [
      {
        id: 'b1-l1',
        title: 'Co je sportovní sázení a proč většina prohrává',
        summary: 'Rozdíl mezi náhodou a systematickým přístupem.',
        paragraphs: [
          'Sportovní sázení není loterie — je to trh, kde sázkovky nabízejí kurzy na výsledky a ty rozhoduješ, zda je cena férová. Většina sázkařů prohrává, protože sází intuitivně, sleduje emoce a nesleduje dlouhodobé výsledky.',
          'Profesionální přístup vnímá každou sázku jako investici s očekávanou hodnotou (EV). Cílem není vyhrát každý tip, ale být v plusu po stovkách sázek. To vyžaduje disciplínu, záznamy a pochopení matematiky kurzů.',
          'Greenbett ti pomáhá přejít od „tipování" k analýze — signály, statistiky a nástroje jsou navržené tak, aby sis budoval systém, ne honil jednorázové výhry.',
        ],
        keyPoints: [
          'Dlouhodobý zisk > krátkodobé výhry',
          'Sázení bez systému = statisticky ztrátové',
          'Začni s malým bankrollem a učením, ne s velkými částkami',
        ],
      },
      {
        id: 'b1-l2',
        title: 'Typy sázek a nejčastější trhy',
        summary: '1X2, over/under, handicap, BTTS a další.',
        paragraphs: [
          'Nejznámější trh je 1X2 (výsledek zápasu) — domácí, remíza, hosté. U fotbalu je populární také Both Teams To Score (BTTS), over/under gólů nebo handicap (např. -1.5 gólu).',
          'Každý trh má jinou variabilitu a jinou marži sázkovky. Totals (over/under) bývají u některých sportů efektivnější než přímý výsledek. V basketbalu dominují spread a totals, v tenise set betting a game handicapy.',
          'Jako začátečník se soustřeď na 1–2 trhy, které rozumíš. Lepší je znát jeden trh do hloubky než sázet všechno napříč.',
        ],
        keyPoints: [
          '1X2 = nejjednodušší, ale často vyšší marže',
          'Over/under a handicap nabízejí více příležitostí',
          'Vyber si 1–2 trhy a drž se jich',
        ],
      },
      {
        id: 'b1-l3',
        title: 'Jak fungují kurzy a marže sázkovky',
        summary: 'Desítkové kurzy, implied probability a overround.',
        paragraphs: [
          'Desítkový kurz 2.00 znamená: vsadíš 100 Kč, vyhraješ 200 Kč (včetně vkladu). Implikovaná pravděpodobnost = 1/kurz, tedy 50 %. Skutečná šance výhry je ale nižší — sázkovka v kurzu zabudovala marži.',
          'Když sečteš implikované pravděpodobnosti všech výsledků v zápasu, dostaneš víc než 100 % — rozdíl je marže (overround). Typicky 3–8 % u fotbalu, u exotických trhů i víc.',
          'Tvůj první úkol: umět přepočítat kurz na pravděpodobnost a porovnat ji s tím, co si myslíš o reálné šanci. To je základ value bettingu.',
        ],
        keyPoints: [
          'Kurz 2.00 = 50 % implied probability',
          'Marže sázkovky snižuje tvou dlouhodobou výnosnost',
          'Porovnávej kurzy mezi sázkovkami (line shopping)',
        ],
      },
      {
        id: 'b1-l4',
        title: 'Výběr sázkovky a bezpečný start',
        summary: 'Licence, limity, bonusy a realistická očekávání.',
        paragraphs: [
          'V ČR sázej jen u licencovaných operátorů (Tipsport, Fortuna, Betano…). Licence znamená ochranu hráče, limity a férová pravidla. Vyhýbej se nelegálním stránkám bez dozoru.',
          'Uvítací bonusy nejsou „zdarma peníze" — mají podmínky protočení (wagering). Před přijetím bonusu si přečti pravidla. Někdy je lepší sázet bez bonusu s menšími omezeními.',
          'Začni s bankrollem, který můžeš ztratit bez dopadu na život. První měsíc sleduj jen učení a záznamy, ne zisk. Cílem je pochopit proces, ne zbohatnout za týden.',
        ],
        keyPoints: [
          'Jen licencované sázkovky v ČR',
          'Bonusy čtou podmínky — ne vždy výhodné',
          'První fáze = učení, ne maximalizace zisku',
        ],
      },
      {
        id: 'b1-l5',
        title: 'Tvůj první sázkový deník',
        summary: 'Jak zaznamenávat tipy a hodnotit pokrok.',
        paragraphs: [
          'Bez deníku nevíš, jestli jsi v plusu nebo jen máš štěstí. Zaznamenávej: datum, zápas, trh, kurz, vklad, výsledek a krátkou poznámku proč jsi vsadil.',
          'Po 50 sázkách uvidíš vzory — sázíš líp na určité ligy? Prohráváš na live? Deník odhalí slabiny dřív než prázdný účet.',
          'Greenbett dashboard a kalkulačka ti pomůžou s unit sizingem. Začni s tabulkou nebo poznámkovým blokem — hlavní je konzistence.',
        ],
        keyPoints: [
          'Zapisuj každou sázku bez výjimky',
          'Sleduj yield (ROI), ne jen počet výher',
          'Vyhodnocuj po min. 50–100 sázkách',
        ],
      },
    ],
  },
  {
    slug: 'bankroll-management',
    level: 'beginner',
    difficulty: 2,
    title: 'Bankroll management',
    subtitle: 'Správa peněz je základ všeho',
    description:
      'Naučíš se definovat bankroll, pracovat s unity, flat stakingem a nastavit limity, které tě ochrání před vyhořením účtu.',
    duration: '55 min',
    icon: 'fa-wallet',
    emoji: '💰',
    prerequisites: ['Úvod do sportovního sázení'],
    tools: [
      { label: 'Bankroll kalkulačka', href: '/kalkulacka' },
      { label: 'Glosář — Unit', href: '/glosar' },
    ],
    lessons: [
      {
        id: 'b2-l1',
        title: 'Co je bankroll a proč oddělit od běžných peněz',
        summary: 'Definice, velikost a psychologický aspekt.',
        paragraphs: [
          'Bankroll je částka vyčleněná výhradně na sázení — oddělená od renty, jídla a spoření. Pokud sázíš z peněz, které potřebuješ, rozhodování bude emocionální a chybné.',
          'Doporučený start: 5 000–20 000 Kč podle možností. Důležitější než absolutní částka je, že ztráta celého bankrollu neohrozí tvůj život.',
          'Bankroll není „peníze na zábavu" ani investiční fond — je to pracovní kapitál s měřitelnou výnosností. K němu přistupuj jako k nástroji, ne jako k vstupence do kasina.',
        ],
        keyPoints: [
          'Bankroll = pouze peníze na sázení',
          'Nikdy nesázej z peněz na životní náklady',
          'Velikost závisí na tvých možnostech, ne na ambicích',
        ],
      },
      {
        id: 'b2-l2',
        title: 'Unit sizing — kolik vsadit na jeden tip',
        summary: '1 % pravidlo, flat staking a proč neall-in.',
        paragraphs: [
          'Unit je standardizovaná jednotka sázky — typicky 1 % bankrollu. Při bankrollu 10 000 Kč je 1 unit = 100 Kč. Všechny sázky měříš v unitech, ne v korunách.',
          'Flat staking znamená stejnou velikost na každý tip (např. 1 unit). Je to nejjednodušší a nejbezpečnější strategie pro začátečníky. Vyhýbáš se přetahování po prohře nebo po výhře.',
          'Nikdy nesázej víc než 3 % bankrollu na jeden tip, dokud nemáš statisticky ověřený edge a zkušenost. All-in nebo „dohánění" proher je nejrychlejší cesta k nule.',
        ],
        keyPoints: [
          '1 unit = 1 % bankrollu (doporučený start)',
          'Flat staking = stejná sázka na každý tip',
          'Max 1–3 % bankrollu na tip jako začátečník',
        ],
      },
      {
        id: 'b2-l3',
        title: 'Drawdown a jak ho zvládnout',
        summary: 'Série proher, psychická odolnost a limity.',
        paragraphs: [
          'Drawdown je pokles bankrollu od maxima. I dobrý sázkař má série 5–10 proher. Klíčové je, že systém s kladným EV se z drawdownu časem zotaví — pokud neděláš panické změny.',
          'Nastav si denní/týdenní stop-loss: např. po -5 unitech v jeden den přestaneš sázet. Stejně tak denní stop-win — po +8 unitech si dej pauzu, abys neoverbetoval z euforie.',
          'Sleduj maximální drawdown v deníku. Pokud překročí 25 % bankrollu, zpomal, zmenši unity a zreviduj strategii — ne zvyšuj sázky.',
        ],
        keyPoints: [
          'Série proher jsou normální i u ziskových sázkařů',
          'Stop-loss a stop-win chrání před tiltem',
          'Drawdown > 25 % = čas na revizi, ne agresivitu',
        ],
      },
      {
        id: 'b2-l4',
        title: 'Yield, ROI a jak měřit úspěch',
        summary: 'Proč hit rate nestačí a jak číst výsledky.',
        paragraphs: [
          'Yield (ROI) = (zisk / celkem vsazeno) × 100. ROI 5 % znamená: za každých 100 vsazených unitů zisk 5 unitů. To je solidní dlouhodobý výsledek.',
          'Hit rate (úspěšnost) sama o sobě nic neříká. Můžeš mít 70 % výher a být v minusu (nízké kurzy), nebo 45 % a být v plusu (value kurzy). Sleduj yield, ne počet výher.',
          'Vyhodnocuj výsledky minimálně po 200–500 sázkách. Kratší vzorky jsou statisticky nevýznamné a vedou k předčasným závěrům.',
        ],
        keyPoints: [
          'ROI / yield = hlavní metrika ziskovosti',
          'Hit rate bez kontextu kurzů je zavádějící',
          'Min. 200 sázek pro smysluplné vyhodnocení',
        ],
      },
      {
        id: 'b2-l5',
        title: 'Praktický plán na první 3 měsíce',
        summary: 'Krok za krokem od nuly k systematickému sázení.',
        paragraphs: [
          'Měsíc 1: Sázej min. sázky (0.5–1 unit), zapisuj vše, nesleduj denní zisk. Cíl = návyk a data.',
          'Měsíc 2: Začni filtrovat — které ligy/trhy fungují? Používej kalkulačku pro sizing. Cíl = první vyhodnocení yield.',
          'Měsíc 3: Pokud je yield kladný nebo blízko nuly, zůstaň u flat 1 unit. Pokud záporný, zmenši bankroll nebo pauza. Cíl = rozhodnutí pokračovat/upravit/ukončit.',
        ],
        keyPoints: [
          'Měsíc 1 = návyk a záznamy',
          'Měsíc 2 = analýza co funguje',
          'Měsíc 3 = datové rozhodnutí o pokračování',
        ],
      },
    ],
  },
  {
    slug: 'kurzy-a-trhy',
    level: 'beginner',
    difficulty: 3,
    title: 'Kurzy, trhy a jak je číst',
    subtitle: 'Od desítkového kurzu po line movement',
    description:
      'Hlubší pohled na kurzy, implied probability, porovnávání sázkovek a čtení pohybu line před zápasem.',
    duration: '60 min',
    icon: 'fa-chart-line',
    emoji: '📊',
    prerequisites: ['Úvod do sportovního sázení', 'Bankroll management'],
    tools: [{ label: 'Porovnání kurzů', href: '/kurzy' }],
    lessons: [
      {
        id: 'b3-l1',
        title: 'Desítkové, zlomkové a americké kurzy',
        summary: 'Převody mezi formáty a kdy který použít.',
        paragraphs: [
          'V ČR používáš desítkové kurzy (1.85, 2.10). Zlomkové (5/4) jsou běžné v UK, americké (+150, -200) v USA. Umět převádět je užitečné při čtení zahraničních analýz.',
          'Desítkový kurz 1.85: výhra = vklad × 1.85. Zisk = vklad × 0.85. Převod na implied prob: 1/1.85 = 54.1 %.',
          'Na Greenbett pracujeme primárně s desítkovými kurzy — jsou nejintuitivnější pro výpočet EV a porovnání.',
        ],
        keyPoints: [
          'Desítkové kurzy = standard v ČR',
          'Implied prob = 1 / desítkový kurz',
          'Umět číst zahraniční formáty je bonus',
        ],
      },
      {
        id: 'b3-l2',
        title: 'Line shopping — porovnávání kurzů',
        summary: 'Proč stejný tip má různé kurzy a jak to využít.',
        paragraphs: [
          'Stejný zápas může mít na Tipsportu kurz 1.90 a na jiné sázkovce 2.00. Rozdíl 0.10 na kurzu 2.00 je 5 % navíc k zisku — za rok to dělá obrovský rozdíl.',
          'Line shopping je povinnost, ne luxus. Před každou sázkou porovnej kurz u 2–3 sázkovek. Náš nástroj Porovnání kurzů to dělá automaticky.',
          'Nemusíš mít účty všude — stačí 2–3 hlavní sázkovky. Ale u value tipů vždy hledej nejlepší dostupný kurz.',
        ],
        keyPoints: [
          'Rozdíl 0.05–0.10 v kurzu = velký dopad na ROI',
          'Vždy porovnej před podáním sázky',
          'Nejlepší kurz = okamžitý zisk bez většího rizika',
        ],
      },
      {
        id: 'b3-l3',
        title: 'Line movement — co znamená pohyb kurzu',
        summary: 'Sharp money, veřejnost a kdy kurz otevírá value.',
        paragraphs: [
          'Kurzy se mění od otevření do začátku zápasu. Pokud kurz na favorita klesá (např. z 1.80 na 1.65), trh věří více ve výhru favorita — často kvůli sharp money nebo zprávám o sestavách.',
          '„Reverse line movement" — kurz jde proti očekávání veřejnosti — může signalizovat sharp action. Není to automatický signál, ale stojí za pozornost.',
          'Jako začátečník nesázej jen proto, že se kurz pohyboval. Ptej se proč — injury, sestavy, počasí? Kontext je důležitější než samotný pohyb.',
        ],
        keyPoints: [
          'Kurzy se mění podle informací a objemu sázek',
          'Pokles kurzu = trh favorituje daný výsledek víc',
          'Kontext pohybu (zranění, sestavy) je klíčový',
        ],
      },
      {
        id: 'b3-l4',
        title: 'Hlavní trhy podle sportu',
        summary: 'Fotbal, hokej, basketbal, tenis — co sázet kde.',
        paragraphs: [
          'Fotbal: 1X2, over/under gólů, BTTS, handicap. Česká liga a nižší ligy mají často větší edge pro informované sázkaře než top EPL.',
          'Hokej: moneyline, puck line (-1.5/+1.5), totals. Playoff má jinou dynamiku než základní část.',
          'Basketbal/NBA: spread a totals dominují — pace a matchup data jsou klíčové. Tenis: set winner, game handicapy, totals gamů.',
        ],
        keyPoints: [
          'Každý sport má „své" nejefektivnější trhy',
          'Nižší ligy = často větší edge, menší limity',
          'Specializace na 1 sport zrychlí učení',
        ],
      },
      {
        id: 'b3-l5',
        title: 'Cvičení: Přepočet kurzů a hledání nejlepší ceny',
        summary: 'Praktické úkoly pro procvičení.',
        paragraphs: [
          'Úkol 1: Zapiš 5 zápasů z víkendu. U každého přepočítej implied probability u kurzu 1X2 na všech trzech výsledcích. Sečti — kolik je marže?',
          'Úkol 2: Vyber jeden tip a porovnej kurz na 3 sázkovkách. Kolik % navíc získáš s nejlepším kurzem oproti nejhoršímu?',
          'Úkol 3: Sleduj jeden zápas od otevření line do výkopu. Zaznamenej 3 pohyby kurzu a zkus vysvětlit proč.',
        ],
        keyPoints: [
          'Počítej implied probability ručně — buduje intuici',
          'Line shopping procvičuj na každém tipu',
          'Sleduj line movement u 1 zápasu týdně',
        ],
      },
    ],
  },
  {
    slug: 'psychologie-sazeni',
    level: 'beginner',
    difficulty: 4,
    title: 'Disciplína a psychologie sázkaře',
    subtitle: 'Tilt, chasing a mentální hra',
    description:
      'Nejtěžší část sázení není analýza, ale hlava. Naučíš se rozpoznat tilt, chasing losses a vybudovat pravidla, která držíš.',
    duration: '50 min',
    icon: 'fa-brain',
    emoji: '🧠',
    prerequisites: ['Bankroll management'],
    tools: [{ label: 'Škola — Kelly (pokročilé)', href: '/skola/kelly-criterion' }],
    lessons: [
      {
        id: 'b4-l1',
        title: 'Tilt — když emoce řídí sázky',
        summary: 'Poznávací znaky a jak tilt zastavit.',
        paragraphs: [
          'Tilt je stav, kdy po prohře (nebo i výhře) sázíš impulzivně — větší částky, horší tipy, live bez plánu. Poznáš ho podle zrychleného tempa sázek a odchýlení od systému.',
          'První obrana: stop-loss na den. Druhá: povinná pauza 15 minut po 2 prohrách v řadě. Třetí: nikdy nesázej live, pokud nejsi v klidném stavu.',
          'Profíci mají tilt jako všichni — rozdíl je, že přestanou sázet. Ego je dražší než jedna prohraná sázka.',
        ],
        keyPoints: [
          'Tilt = sázení pod vlivem emocí',
          'Stop-loss a pauzy jsou povinné',
          'Rozpoznej tilt dřív než zničí bankroll',
        ],
      },
      {
        id: 'b4-l2',
        title: 'Chasing losses — dohánění proher',
        summary: 'Proč zdvojnásobení sázky nefunguje.',
        paragraphs: [
          'Chasing je pokus „dohnat" prohru větší sázkou nebo riskantnějším tipem. Martingale (zdvojnásobení po prohře) vede statisticky k bankrotu — limity sázkovky a variance to zničí.',
          'Jedna prohra je normální. Dvě jsou normální. Deset v řadě se může stát i při kladném EV. Systém hodnotíš na stovkách tipů, ne na jedné noci.',
          'Pravidlo: po prohře další sázka stejná nebo menší (ne větší). Pokud chceš „něco dohnat", zavři počítač.',
        ],
        keyPoints: [
          'Chasing = nejčastější způsob rychlého bankrotu',
          'Martingale nikdy — limity a variance tě zastaví',
          'Po prohře drž unit size nebo přestaň',
        ],
      },
      {
        id: 'b4-l3',
        title: 'Overconfidence po výhře',
        summary: 'Euforie a zvětšování sázek po sérii výher.',
        paragraphs: [
          'Série 5 výher vytváří iluzi, že „to umíš". Často následuje větší sázka na slabý tip — a jedna prohra smaže týden zisku.',
          'Výhra neznamená, že tvá analýza byla správná — můžeš vyhrát se špatným tipem (luck). Hodnoť proces, ne výsledek jedné sázky.',
          'Po sérii výher drž flat staking. Pokud chceš zvýšit unity, udělej to až po statisticky prokázaném edge — ne po třech výhrách.',
        ],
        keyPoints: [
          'Výhra ≠ správná analýza (luck factor)',
          'Po výhrách nezvyšuj sázky impulzivně',
          'Hodnoť proces, ne jednotlivý výsledek',
        ],
      },
      {
        id: 'b4-l4',
        title: 'Pravidla, která si nastavíš a dodržíš',
        summary: 'Osobní betting code — 10 pravidel pro začátečníka.',
        paragraphs: [
          '1) Max 1–2 % bankrollu na tip. 2) Stop-loss -5 unitů/den. 3) Žádné live bez přípravy. 4) Každá sázka zapsaná před podáním. 5) Žádné sázení pod vlivem alkoholu.',
          '6) Min. 24 hodin mezi novým sportem/trhem a první větší sázkou. 7) Týdenní review deníku. 8) Porovnat kurz vždy. 9) Nesázet na „svůj" tým bez objektivity. 10) Pauza 1 den v týdnu bez sázek.',
          'Pravidla si vytiskni nebo dej do poznámek v telefonu. Porušení jednoho pravidla = stop na den. Disciplína je skill, který se trénuje.',
        ],
        keyPoints: [
          'Písemná pravidla = menší prostor pro emoce',
          'Porušení pravidla → pauza, ne výjimka',
          'Disciplína se buduje měsíce, ne dny',
        ],
      },
      {
        id: 'b4-l5',
        title: 'Dlouhodobá udržitelnost',
        summary: 'Sázení jako maraton — vyhoření a work-life balance.',
        paragraphs: [
          'Sázení 8 hodin denně vede k únavě a horším rozhodnutím. Kvalita > kvantita. Lepší 3 dobře připravené tipy než 15 náhodných.',
          'Měj život mimo sázení — sport, práce, rodina. Izolace v bubble kurzů zhoršuje úsudek. Profesionálové mají rutinu a off-time.',
          'Pokud sázení přestane bavit nebo stresuje, je OK pauza nebo konec. Zdraví a finance jsou důležitější než „být tipér".',
        ],
        keyPoints: [
          'Méně sázek, lepší kvalita analýzy',
          'Vyhoření je reálné riziko — hlídej pauzy',
          'Udržitelnost > krátkodobý zisk za cenu zdraví',
        ],
      },
    ],
  },
];
