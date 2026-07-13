import type { Sport } from '@/types';

export interface SportPageContent {
  sport: Sport;
  label: string;
  emoji: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge1: string;
    badge2: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    logos: string[];
  };
  features: {
    sectionTag: string;
    sectionTitle: string;
    items: Array<{ icon: string; title: string; description: string; link?: { label: string; href: string } }>;
  };
  bento: Array<{
    size: 'large' | 'small';
    title: string;
    description: string;
    link: { label: string; href: string };
    emoji: string;
  }>;
  tools: {
    sectionTag: string;
    sectionTitle: string;
    cta: { label: string; href: string };
    items: Array<{ icon: string; title: string; description: string }>;
    preview: { title: string; lines: string[] };
  };
  markets: {
    sectionTag: string;
    sectionTitle: string;
    cta: { label: string; href: string };
    searchPlaceholder: string;
    rows: Array<{ name: string; sub: string; change: string; changePositive: boolean; value: string }>;
  };
  promo: { title: string; description: string; link: { label: string; href: string }; emoji: string };
  spotlight: {
    tag: string;
    title: string;
    description: string;
    link: { label: string; href: string };
    emoji: string;
  };
  news: {
    sectionTag: string;
    sectionTitle: string;
    link: { label: string; href: string };
    items: Array<{ title: string; time: string; emoji: string }>;
  };
  education: {
    sectionTag: string;
    sectionTitle: string;
    link: { label: string; href: string };
    items: Array<{ title: string; readTime: string; emoji: string }>;
  };
  faq: Array<{ q: string; a: string }>;
}

const baseTools = (sport: string) => [
  { icon: 'fa-satellite-dish', title: 'Live dashboard', description: `Sleduj ${sport} zápasy v reálném čase — skóre, kurzy a signály na jednom místě.` },
  { icon: 'fa-search-dollar', title: 'Value bet scanner', description: 'Automatická detekce sázek s kladnou očekávanou hodnotou (EV+).' },
  { icon: 'fa-chart-bar', title: 'Statistiky lig', description: 'Komplexní data per liga — trendy, průměry a domácí/venkovní bilance.' },
  { icon: 'fa-calculator', title: 'Bankroll kalkulačka', description: 'Kelly criterion, flat staking a optimální velikost sázky.' },
];

function page(
  sport: Sport,
  label: string,
  emoji: string,
  data: Omit<SportPageContent, 'sport' | 'label' | 'emoji'>
): SportPageContent {
  return { sport, label, emoji, ...data };
}

export const SPORT_PAGES: Record<Sport, SportPageContent> = {
  football: page('football', 'Fotbal', '⚽', {
    metaTitle: 'Sázení na fotbal',
    metaDescription: 'Analytické signály, statistiky a value bety na fotbal z 120+ lig.',
    hero: {
      badge1: '120+ lig',
      badge2: '2 100+ signálů',
      title: 'Analytické sázení na',
      titleAccent: 'fotbal',
      subtitle: 'Premier League, La Liga, Bundesliga, Serie A, Chance Liga a další. Každý signál je podložen statistikami, formou týmů a pohybem kurzů.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=football' },
      logos: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇪🇸', '🇩🇪', '🇮🇹', '🇫🇷', '🇨🇿', '⚽'],
    },
    features: {
      sectionTag: 'Fotbal',
      sectionTitle: 'Začněte sázení na fotbal s daty, ne s intuicí',
      items: [
        { icon: 'fa-percent', title: 'Signály bez skrývání', description: 'Veřejná evidence všech tipů — výhry i prohry. Žádné mazání historie.', link: { label: 'Zobrazit evidenci →', href: '/vysledky?sport=football' } },
        { icon: 'fa-lock-open', title: 'Sázej už od 1 unitu', description: 'Doporučený unit size u každého signálu. Začni s minimálním rizikem.' },
        { icon: 'fa-list', title: 'Široký výběr lig', description: 'Od Premier League po českou 2. ligu. Pokrýváme vše, kde jsou dostupná data.' },
      ],
    },
    bento: [
      { size: 'large', title: 'Sázej s confidence skóre', description: 'Každý fotbalový signál obsahuje confidence 0–10 a doporučený unit size. Víš přesně, jak silný tip dostáváš.', link: { label: 'Zjistit více →', href: '/vysledky?sport=football' }, emoji: '📊' },
      { size: 'small', title: 'Over/Under trendy', description: 'Statistiky gólů per liga — over 2.5, BTTS, průměry.', link: { label: 'Statistiky →', href: '/statistiky?sport=football' }, emoji: '⚽' },
      { size: 'small', title: 'Live kurzy', description: 'Sleduj pohyb kurzů v reálném čase během zápasu.', link: { label: 'Live dashboard →', href: '/live?sport=football' }, emoji: '📡' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'Vyberte si pohodlné řešení',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('fotbalové'),
      preview: { title: 'Dnešní fotbalové signály', lines: ['Sparta vs Slavia — Over 2.5 · 1.82 · conf. 7.8', 'Arsenal vs Chelsea — Over 2.5 · 1.95 · conf. 8.1', 'Bayern vs Dortmund — BTTS · 1.80 · conf. 7.4'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'Sázej na více než 120 fotbalových lig',
      cta: { label: 'Kompletní seznam lig →', href: '/statistiky?sport=football' },
      searchPlaceholder: 'Hledej ligu nebo tým...',
      rows: [
        { name: 'Premier League', sub: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Anglie', change: '+2.4%', changePositive: true, value: 'Over 2.5: 58%' },
        { name: 'La Liga', sub: '🇪🇸 Španělsko', change: '+1.1%', changePositive: true, value: 'Over 2.5: 53%' },
        { name: 'Bundesliga', sub: '🇩🇪 Německo', change: '+3.8%', changePositive: true, value: 'Over 2.5: 63%' },
        { name: 'Serie A', sub: '🇮🇹 Itálie', change: '-0.5%', changePositive: false, value: 'Over 2.5: 55%' },
        { name: 'Chance Liga', sub: '🇨🇿 Česko', change: '+1.7%', changePositive: true, value: 'Over 2.5: 49%' },
        { name: 'Ligue 1', sub: '🇫🇷 Francie', change: '+0.9%', changePositive: true, value: 'Over 2.5: 52%' },
      ],
    },
    promo: { title: 'Získej přístup k prémiovým fotbalovým signálům', description: '7 dní zdarma. Žádná platební karta. Plný přístup ke všem ligám a nástrojům.', link: { label: 'Začít zdarma →', href: '/registrace' }, emoji: '🎁' },
    spotlight: { tag: 'Value betting', title: 'Najdi fotbalové sázky s kladnou EV', description: 'Náš scanner automaticky porovnává kurzy s férovou pravděpodobností a hledá value příležitosti v reálném čase.', link: { label: 'Spustit scanner →', href: '/scanner?sport=football' }, emoji: '🔍' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'Měj přehled o fotbalovém dění',
      link: { label: 'Zobrazit všechny analýzy →', href: '/forum/2' },
      items: [
        { title: 'Arsenal vs Chelsea — preview a value bety 🔥', time: 'před 2 hod', emoji: '⚽' },
        { title: 'Bundesliga: over/under trendy této sezóny 📈', time: 'před 5 hod', emoji: '🇩🇪' },
        { title: 'Chance Liga — kdo postoupí do Evropy? 🏆', time: 'před 1 den', emoji: '🇨🇿' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'Nauč se sázet na fotbal',
      link: { label: 'Všechny články →', href: '/skola' },
      items: [
        { title: 'Over 2.5 vs BTTS — co funguje lépe?', readTime: '7 min', emoji: '📖' },
        { title: 'Jak číst confidence skóre u signálů', readTime: '5 min', emoji: '📊' },
        { title: 'Value betting na fotbal pro začátečníky', readTime: '10 min', emoji: '🎯' },
      ],
    },
    faq: [
      { q: 'Kolik fotbalových signálů dostanu denně?', a: 'Průměrně 2–5 signálů denně z různých lig. Počet závisí na kalendáři a kvalitě příležitostí.' },
      { q: 'Které fotbalové ligy pokrýváte?', a: 'Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League, české a slovenské ligy a další.' },
      { q: 'Jak se liší confidence skóre?', a: 'Skóre 0–10 vyjadřuje sílu signálu. 8+ = silný tip, 6–8 = standardní, pod 6 = spekulativní.' },
      { q: 'Můžu vidět historii výsledků?', a: 'Ano, veřejná evidence na /vysledky obsahuje kompletní track record bez mazání proher.' },
    ],
  }),

  hockey: page('hockey', 'Hokej', '🏒', {
    metaTitle: 'Sázení na hokej',
    metaDescription: 'NHL, Extraliga a další — hokejové signály, statistiky a live data.',
    hero: {
      badge1: '15+ lig',
      badge2: '890+ signálů',
      title: 'Hokejové analýzy s důrazem na',
      titleAccent: 'NHL a Extraligu',
      subtitle: 'Sledujeme brankářské rotace, power play efektivitu, formu týmů a pohyb pucklajnů. Signály na totals, moneyline a puckline.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=hockey' },
      logos: ['🏒', '🇺🇸', '🇨🇦', '🇸🇪', '🇫🇮', '🇨🇿', '🥅'],
    },
    features: {
      sectionTag: 'Hokej',
      sectionTitle: 'Začněte sázení na hokej s pokročilými daty',
      items: [
        { icon: 'fa-percent', title: 'Brankářská analýza', description: 'Sledujeme starting goalies, save % a formu brankářů před každým signálem.', link: { label: 'Zobrazit signály →', href: '/vysledky?sport=hockey' } },
        { icon: 'fa-bolt', title: 'Power play data', description: 'PP efektivita, penalty kill a speciální situace ovlivňují totals i moneyline.' },
        { icon: 'fa-snowflake', title: 'NHL + Extraliga', description: 'Pokrýváme NHL, KHL, SHL, Extraligu a Champions Hockey League.' },
      ],
    },
    bento: [
      { size: 'large', title: 'Totals a puckline strategie', description: 'Hokejové signály na over/under gólů s analýzou pace, střel a brankářské formy.', link: { label: 'Zjistit více →', href: '/statistiky?sport=hockey' }, emoji: '🏒' },
      { size: 'small', title: 'NHL injury report', description: 'Dopad zranění klíčových hráčů na kurzy a line movement.', link: { label: 'Live data →', href: '/live?sport=hockey' }, emoji: '🏥' },
      { size: 'small', title: 'Extraliga tipy', description: 'Česká extraliga s kompletními statistikami a signály.', link: { label: 'Signály →', href: '/vysledky?sport=hockey' }, emoji: '🇨🇿' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'Vše pro hokejové sázení',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('hokejové'),
      preview: { title: 'Dnešní hokejové signály', lines: ['Colorado vs Tampa — Over 5.5 · 1.90 · conf. 7.9', 'Sparta vs Kometa — ML · 1.80 · conf. 7.2', 'Boston vs Toronto — Puckline · 2.10 · conf. 6.8'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'Sázej na 15+ hokejových lig',
      cta: { label: 'Statistiky lig →', href: '/statistiky?sport=hockey' },
      searchPlaceholder: 'Hledej tým nebo ligu...',
      rows: [
        { name: 'NHL', sub: '🇺🇸🇨🇦 Severní Amerika', change: '+1.8%', changePositive: true, value: 'Over 5.5: 54%' },
        { name: 'Extraliga', sub: '🇨🇿 Česko', change: '+2.1%', changePositive: true, value: 'Over 5.5: 48%' },
        { name: 'SHL', sub: '🇸🇪 Švédsko', change: '+0.6%', changePositive: true, value: 'Over 5.5: 51%' },
        { name: 'Liiga', sub: '🇫🇮 Finsko', change: '-0.3%', changePositive: false, value: 'Over 5.5: 50%' },
        { name: 'KHL', sub: '🇷🇺 Rusko', change: '+1.2%', changePositive: true, value: 'Over 5.5: 52%' },
      ],
    },
    promo: { title: 'Hokejové signály s 89% historickou přesností', description: 'Transparentní evidence, brankářská analýza a power play data u každého tipu.', link: { label: 'Vyzkoušet zdarma →', href: '/registrace' }, emoji: '🏒' },
    spotlight: { tag: 'Live sázení', title: 'Sleduj hokej live s pohybem kurzů', description: 'Live dashboard zobrazuje skóre, čas, kurzy 1/X/2 a aktivní signály během zápasu.', link: { label: 'Otevřít live →', href: '/live?sport=hockey' }, emoji: '📡' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'Aktuální hokejové analýzy',
      link: { label: 'Fórum hokej →', href: '/forum/3' },
      items: [
        { title: 'NHL offseason moves — dopad na odds 🏒', time: 'před 3 hod', emoji: '🇺🇸' },
        { title: 'Extraliga play-off — formální analýza 📊', time: 'před 8 hod', emoji: '🇨🇿' },
        { title: 'Colorado vs Tampa — live preview 🔥', time: 'před 45 min', emoji: '⚡' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'Nauč se sázet na hokej',
      link: { label: 'Škola sázení →', href: '/skola' },
      items: [
        { title: 'Over/under gólů v NHL — kompletní průvodce', readTime: '8 min', emoji: '🏒' },
        { title: 'Jak brankář ovlivňuje kurzy', readTime: '6 min', emoji: '🥅' },
        { title: 'Puckline vs moneyline — kdy co použít', readTime: '5 min', emoji: '📊' },
      ],
    },
    faq: [
      { q: 'Sázíte i na českou Extraligu?', a: 'Ano, Extraliga je jedna z našich prioritních lig s denními signály v sezóně.' },
      { q: 'Jak brankář ovlivňuje tip?', a: 'Starting goalie je klíčový faktor. Sledujeme save %, GAA a formu z posledních 5 zápasů.' },
      { q: 'Kolik gólů je typický over v NHL?', a: 'Nejčastější linie je 5.5 nebo 6.5 gólů. Průměr NHL je kolem 6.1 gólu na zápas.' },
      { q: 'Máte live signály?', a: 'Ano, během zápasu publikujeme live tipy na momentum a kurzové příležitosti.' },
    ],
  }),

  basketball: page('basketball', 'Basketbal', '🏀', {
    metaTitle: 'Sázení na basketbal',
    metaDescription: 'NBA, EuroLeague — basketbalové signály, pace analýza a injury reporty.',
    hero: {
      badge1: '10+ lig',
      badge2: '540+ signálů',
      title: 'Basketbalové sázení na',
      titleAccent: 'NBA a EuroLeague',
      subtitle: 'Pace, efektivita, injury reporty a line movement. Signály na totals, spread a moneyline s datovou analýzou.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=basketball' },
      logos: ['🏀', '🇺🇸', '🇪🇺', '🇪🇸', '🇹🇷', '🇨🇿', '⛹️'],
    },
    features: {
      sectionTag: 'Basketbal',
      sectionTitle: 'Sázej na basketbal s pace a matchup daty',
      items: [
        { icon: 'fa-tachometer-alt', title: 'Pace analýza', description: 'Rychlost hry přímo ovlivňuje totals. Sledujeme pace per 48 minut u každého týmu.', link: { label: 'Statistiky →', href: '/statistiky?sport=basketball' } },
        { icon: 'fa-user-injured', title: 'Injury reporty', description: 'Dopad absence klíčových hráčů na spread a totals v reálném čase.' },
        { icon: 'fa-basketball-ball', title: 'NBA + EuroLeague', description: 'Pokrýváme NBA, EuroLeague, NBL, ACB a českou NBL.' },
      ],
    },
    bento: [
      { size: 'large', title: 'Totals a spread strategie', description: 'Basketbalové signály založené na pace, offensive/defensive rating a matchup datech.', link: { label: 'Scanner →', href: '/scanner?sport=basketball' }, emoji: '🏀' },
      { size: 'small', title: 'Back-to-back zápasy', description: 'Fatigue faktor výrazně ovlivňuje výkon — sledujeme B2B situace.', link: { label: 'Live →', href: '/live?sport=basketball' }, emoji: '😴' },
      { size: 'small', title: '3PT trendy', description: 'Analýza trojkových pokusů a jejich dopad na totals.', link: { label: 'Statistiky →', href: '/statistiky?sport=basketball' }, emoji: '🎯' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'Nástroje pro basketbalové sázení',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('basketbalové'),
      preview: { title: 'Dnešní basketbalové signály', lines: ['Lakers vs Celtics — Under 215.5 · 1.88 · conf. 6.8', 'Real vs Barca — Over 165.5 · 1.85 · conf. 7.1', 'Warriors vs Suns — Spread · 1.91 · conf. 7.5'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'NBA, EuroLeague a další ligy',
      cta: { label: 'Statistiky →', href: '/statistiky?sport=basketball' },
      searchPlaceholder: 'Hledej tým...',
      rows: [
        { name: 'NBA', sub: '🇺🇸 USA', change: '+2.2%', changePositive: true, value: 'Over 220.5: 57%' },
        { name: 'EuroLeague', sub: '🇪🇺 Evropa', change: '+1.0%', changePositive: true, value: 'Over 160.5: 52%' },
        { name: 'NBL', sub: '🇨🇿 Česko', change: '+0.8%', changePositive: true, value: 'Over 165.5: 50%' },
        { name: 'ACB', sub: '🇪🇸 Španělsko', change: '-0.4%', changePositive: false, value: 'Over 160.5: 51%' },
      ],
    },
    promo: { title: 'NBA sezóna — plný přístup k signálům', description: 'Denní tipy na totals, spread a moneyline s injury reporty a pace analýzou.', link: { label: 'Začít →', href: '/registrace' }, emoji: '🏀' },
    spotlight: { tag: 'Pace betting', title: 'Využij pace data pro totals', description: 'Dva rychlé týmy = vyšší totals. Náš model automaticky kalkuluje očekávaný počet bodů.', link: { label: 'Jak to funguje →', href: '/skola' }, emoji: '⚡' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'Basketbalové novinky a tipy',
      link: { label: 'Fórum →', href: '/forum/4' },
      items: [
        { title: 'NBA playoffs — injury report vliv na spread 🏀', time: 'před 1 den', emoji: '🇺🇸' },
        { title: 'EuroLeague — Real vs Barca preview 📊', time: 'před 4 hod', emoji: '🇪🇺' },
        { title: 'Lakers vs Celtics — under nebo over? 🤔', time: 'před 2 hod', emoji: '💜' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'Basketbalové sázení od základů',
      link: { label: 'Články →', href: '/skola' },
      items: [
        { title: 'Pace a totals — jak to spolu souvisí', readTime: '7 min', emoji: '🏀' },
        { title: 'Spread betting v NBA', readTime: '6 min', emoji: '📊' },
        { title: 'Back-to-back fatigue — skrytý edge', readTime: '5 min', emoji: '😴' },
      ],
    },
    faq: [
      { q: 'Sázíte na NBA i v play-off?', a: 'Ano, play-off pokrýváme s vyšší intenzitou signálů a detailními matchup analýzami.' },
      { q: 'Co je pace a proč je důležitý?', a: 'Pace = počet possessions za 48 minut. Vyšší pace = více bodů = vyšší totals.' },
      { q: 'Jak injury report ovlivňuje tip?', a: 'Absence klíčového hráče (MVP kandidát, top scorer) může posunout spread o 3–5 bodů.' },
      { q: 'Kolik signálů v NBA sezóně?', a: 'V sezóně 1–4 signály denně, v play-off až 6–8 během game days.' },
    ],
  }),

  tennis: page('tennis', 'Tenis', '🎾', {
    metaTitle: 'Sázení na tenis',
    metaDescription: 'ATP, WTA, Grand Slamy — tenisové signály založené na surface datech.',
    hero: {
      badge1: 'ATP + WTA',
      badge2: '650+ signálů',
      title: 'Tenisové analýzy založené na',
      titleAccent: 'surface datech',
      subtitle: 'ATP, WTA, Grand Slamy, Challenger Tour. Povrchy, H2H, servisní statistiky a forma hráčů u každého signálu.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=tennis' },
      logos: ['🎾', '🏆', '🇦🇺', '🇫🇷', '🇬🇧', '🇺🇸', '🥎'],
    },
    features: {
      sectionTag: 'Tenis',
      sectionTitle: 'Sázej na tenis s povrchovou expertízou',
      items: [
        { icon: 'fa-table-tennis', title: 'Surface data', description: 'Hard, clay, grass — každý povrch vyžaduje jiný přístup. Máme data per surface.', link: { label: 'Signály →', href: '/vysledky?sport=tennis' } },
        { icon: 'fa-handshake', title: 'H2H analýza', description: 'Head-to-head historie, styl matchup a psychologický faktor.' },
        { icon: 'fa-server', title: 'Serve statistiky', description: '1st serve %, break point conversion a hold % u každého hráče.' },
      ],
    },
    bento: [
      { size: 'large', title: 'Gamy, sety a moneyline', description: 'Tipy na over/under gamů, set betting a moneyline s důrazem na surface a formu.', link: { label: 'Signály →', href: '/vysledky?sport=tennis' }, emoji: '🎾' },
      { size: 'small', title: 'Grand Slam preview', description: 'Kompletní analýzy Australian Open, Roland Garros, Wimbledon, US Open.', link: { label: 'Analýzy →', href: '/forum/4' }, emoji: '🏆' },
      { size: 'small', title: 'Live tenis', description: 'Momentum betting během zápasu — break, tiebreak, set point.', link: { label: 'Live →', href: '/live?sport=tennis' }, emoji: '📡' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'Nástroje pro tenisové sázení',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('tenisové'),
      preview: { title: 'Dnešní tenisové signály', lines: ['Djokovic vs Alcaraz — Over 22.5 gamů · 1.78 · conf. 8.5', 'Sinner vs Medvedev — ML · 1.45 · conf. 7.8', 'Swiatek vs Sabalenka — Set 1 · 1.72 · conf. 7.0'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'ATP, WTA a Challenger Tour',
      cta: { label: 'Statistiky →', href: '/statistiky?sport=tennis' },
      searchPlaceholder: 'Hledej hráče...',
      rows: [
        { name: 'ATP', sub: '🎾 Muži', change: '+1.5%', changePositive: true, value: 'Over 22.5: 48%' },
        { name: 'WTA', sub: '🎾 Ženy', change: '+0.9%', changePositive: true, value: 'Over 21.5: 45%' },
        { name: 'Grand Slams', sub: '🏆 Major', change: '+2.8%', changePositive: true, value: 'Favorit: 62%' },
        { name: 'Challenger', sub: '📊 Tier 2', change: '+1.1%', changePositive: true, value: 'Over 22.5: 46%' },
      ],
    },
    promo: { title: 'Wimbledon sezóna — tenisové signály s 91% přesností', description: 'Surface analýza, H2H data a serve statistiky u každého tipu na trávě.', link: { label: 'Vyzkoušet →', href: '/registrace' }, emoji: '🏆' },
    spotlight: { tag: 'Surface betting', title: 'Tráva vs antuka vs hard — znát rozdíly', description: 'Nadal na antuce ≠ Nadal na trávě. Náš model zohledňuje surface win % každého hráče.', link: { label: 'Více v škole →', href: '/skola' }, emoji: '🎾' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'Tenisové preview a tipy',
      link: { label: 'Fórum →', href: '/forum/4' },
      items: [
        { title: 'Wimbledon 2026 — value bety na surface 🎾', time: 'před 5 hod', emoji: '🏆' },
        { title: 'Djokovic vs Alcaraz — H2H analýza 📊', time: 'před 1 den', emoji: '🔥' },
        { title: 'ATP Indian Wells — denní preview 🌴', time: 'před 3 hod', emoji: '🇺🇸' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'Tenisové sázení — průvodce',
      link: { label: 'Články →', href: '/skola' },
      items: [
        { title: 'Surface betting — kompletní průvodce', readTime: '9 min', emoji: '🎾' },
        { title: 'Over/under gamů — kdy vsadit', readTime: '6 min', emoji: '📊' },
        { title: 'H2H data — jak je správně číst', readTime: '5 min', emoji: '🤝' },
      ],
    },
    faq: [
      { q: 'Sázíte na gamy, sety i moneyline?', a: 'Ano, pokrýváme všechny hlavní trhy — ML, set betting, over/under gamů a handicapy.' },
      { q: 'Proč je surface tak důležitý?', a: 'Hráči mají dramaticky různé win % na hard/clay/grass. Ignorování surface = ztráta edge.' },
      { q: 'Kolik signálů během Grand Slamu?', a: '2–6 signálů denně během main draw, více v prvních kolech.' },
      { q: 'Máte WTA signály?', a: 'Ano, WTA pokrýváme stejně jako ATP s surface a form analýzou.' },
    ],
  }),

  baseball: page('baseball', 'Baseball', '⚾', {
    metaTitle: 'Sázení na baseball',
    metaDescription: 'MLB a NPB — baseballové signály s pitcher analýzou a park factors.',
    hero: {
      badge1: 'MLB + NPB',
      badge2: '320+ signálů',
      title: 'Baseball sázení na',
      titleAccent: 'MLB',
      subtitle: 'Moneyline, run line, totals. Starting pitchery, bullpen statistiky, park factors a weather data u každého signálu.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=baseball' },
      logos: ['⚾', '🇺🇸', '🇯🇵', '🇰🇷', '🏟️', '🧢', '⚾'],
    },
    features: {
      sectionTag: 'Baseball',
      sectionTitle: 'Sázej na baseball s pitcher daty',
      items: [
        { icon: 'fa-baseball-ball', title: 'Pitcher analýza', description: 'FIP, xERA, WHIP a K/9 u starting pitcherů. Klíč k úspěšnému MLB sázení.', link: { label: 'Signály →', href: '/vysledky?sport=baseball' } },
        { icon: 'fa-cloud-sun', title: 'Weather & park factors', description: 'Vítr, teplota a rozměry stadionu ovlivňují počet runs.' },
        { icon: 'fa-chart-line', title: 'Run line strategie', description: 'MLB run line (-1.5) vs moneyline — kdy který trh dává smysl.' },
      ],
    },
    bento: [
      { size: 'large', title: 'Starting pitcher je klíč', description: 'Ace vs fifth starter = obrovský rozdíl v kurzech. Analyzujeme matchup pitcher vs lineup.', link: { label: 'Statistiky →', href: '/statistiky?sport=baseball' }, emoji: '⚾' },
      { size: 'small', title: 'F5 (First 5 innings)', description: 'Sázení jen na prvních 5 směn — eliminuje bullpen variance.', link: { label: 'Signály →', href: '/vysledky?sport=baseball' }, emoji: '5️⃣' },
      { size: 'small', title: 'Over/under runs', description: 'Park factors a weather data pro totals betting.', link: { label: 'Scanner →', href: '/scanner?sport=baseball' }, emoji: '📊' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'MLB nástroje pro sázkaře',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('baseballové'),
      preview: { title: 'Dnešní MLB signály', lines: ['Yankees vs Red Sox — Over 8.5 · 1.92 · conf. 7.1', 'Dodgers vs Giants — ML · 1.60 · conf. 7.5', 'Astros vs Rangers — F5 Over · 1.85 · conf. 6.9'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'MLB a NPB — kompletní pokrytí',
      cta: { label: 'Statistiky →', href: '/statistiky?sport=baseball' },
      searchPlaceholder: 'Hledej tým...',
      rows: [
        { name: 'MLB', sub: '🇺🇸 USA', change: '+1.3%', changePositive: true, value: 'Over 8.5: 51%' },
        { name: 'NPB', sub: '🇯🇵 Japonsko', change: '+0.7%', changePositive: true, value: 'Over 7.5: 49%' },
        { name: 'KBO', sub: '🇰🇷 Korea', change: '+1.0%', changePositive: true, value: 'Over 8.5: 50%' },
      ],
    },
    promo: { title: 'MLB sezóna — denní signály s pitcher analýzou', description: 'FIP, xERA, park factors a weather data. 84% historická přesnost.', link: { label: 'Začít →', href: '/registrace' }, emoji: '⚾' },
    spotlight: { tag: 'F5 betting', title: 'First 5 innings — méně variance', description: 'Sázej jen na starting pitcher matchup. Bullpen neovlivní výsledek.', link: { label: 'Více →', href: '/skola' }, emoji: '5️⃣' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'MLB preview a tipy',
      link: { label: 'Fórum →', href: '/forum' },
      items: [
        { title: 'Yankees vs Red Sox — pitcher preview ⚾', time: 'před 2 hod', emoji: '🧦' },
        { title: 'MLB trade deadline — dopad na kurzy 📊', time: 'před 1 den', emoji: '🇺🇸' },
        { title: 'Coors Field — park factor analýza 🏔️', time: 'před 3 dny', emoji: '📈' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'Baseball betting průvodce',
      link: { label: 'Články →', href: '/skola' },
      items: [
        { title: 'FIP vs ERA — která metrika je lepší', readTime: '7 min', emoji: '⚾' },
        { title: 'Run line vs moneyline v MLB', readTime: '6 min', emoji: '📊' },
        { title: 'Park factors — skrytý edge', readTime: '5 min', emoji: '🏟️' },
      ],
    },
    faq: [
      { q: 'Proč je pitcher tak důležitý?', a: 'Starting pitcher ovlivňuje 60–70 % výsledku zápasu. Ace vs spot starter = obrovský rozdíl.' },
      { q: 'Co je F5 betting?', a: 'Sázka jen na prvních 5 směn. Eliminuje bullpen, který je nepředvídatelný.' },
      { q: 'Sázíte na NPB?', a: 'Ano, japonská NPB je naše druhá priorita po MLB.' },
      { q: 'Jak weather ovlivňuje totals?', a: 'Vítr směrem ven = více homerunů = vyšší totals. Teplota a vlhkost také hrají roli.' },
    ],
  }),

  amfootball: page('amfootball', 'Am. fotbal', '🏈', {
    metaTitle: 'Sázení na americký fotbal',
    metaDescription: 'NFL a NCAA — spread, totals a props s DVOA a EPA analýzou.',
    hero: {
      badge1: 'NFL + NCAA',
      badge2: '280+ signálů',
      title: 'Americký fotbal —',
      titleAccent: 'NFL a NCAA',
      subtitle: 'Spread, moneyline, totals, props. DVOA, EPA, injury reporty a weather conditions u každého signálu.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=amfootball' },
      logos: ['🏈', '🇺🇸', '🏟️', '🎓', '🏆', '🦅', '🏈'],
    },
    features: {
      sectionTag: 'Am. fotbal',
      sectionTitle: 'Sázej na NFL s pokročilými metrikami',
      items: [
        { icon: 'fa-football-ball', title: 'DVOA & EPA', description: 'Defense-adjusted Value Over Average a Expected Points Added — základ naší NFL analýzy.', link: { label: 'Signály →', href: '/vysledky?sport=amfootball' } },
        { icon: 'fa-cloud', title: 'Weather impact', description: 'Vítr, déšť a teplota dramaticky ovlivňují totals a passing hru.' },
        { icon: 'fa-users', title: 'Injury reporty', description: 'QB, OL a defensive stars — sledujeme Friday injury reporty.' },
      ],
    },
    bento: [
      { size: 'large', title: 'Spread a totals strategie', description: 'NFL signály na spread, totals a team props s DVOA matchup analýzou.', link: { label: 'Scanner →', href: '/scanner?sport=amfootball' }, emoji: '🏈' },
      { size: 'small', title: 'Primetime games', description: 'SNF, MNF, TNF — extra analýza pro nejsledovanější zápasy.', link: { label: 'Live →', href: '/live?sport=amfootball' }, emoji: '🌙' },
      { size: 'small', title: 'NCAA Power 5', description: 'Vybrané zápasy z Power 5 konferencí s kompletní analýzou.', link: { label: 'Signály →', href: '/vysledky?sport=amfootball' }, emoji: '🎓' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'NFL nástroje pro sázkaře',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('NFL'),
      preview: { title: 'Tento týden NFL', lines: ['Chiefs vs Bills — Spread -3.5 · 1.91 · conf. 6.5', 'Eagles vs Cowboys — Over 44.5 · 1.88 · conf. 7.2', '49ers vs Rams — ML · 1.55 · conf. 7.8'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'NFL a NCAA — kompletní sezóna',
      cta: { label: 'Statistiky →', href: '/statistiky?sport=amfootball' },
      searchPlaceholder: 'Hledej tým...',
      rows: [
        { name: 'NFL', sub: '🇺🇸 USA', change: '+1.6%', changePositive: true, value: 'Over 44.5: 49%' },
        { name: 'NCAA Power 5', sub: '🎓 Kollege', change: '+2.0%', changePositive: true, value: 'Over 52.5: 51%' },
        { name: 'Super Bowl', sub: '🏆 Playoff', change: '+3.5%', changePositive: true, value: 'Spread cover: 48%' },
      ],
    },
    promo: { title: 'NFL sezóna 2026 — 3–8 signálů týdně', description: 'Spread, totals a props s DVOA analýzou a injury reporty.', link: { label: 'Začít →', href: '/registrace' }, emoji: '🏈' },
    spotlight: { tag: 'Spread betting', title: 'Rozumět NFL spreadu', description: 'Spread -3.5 znamená, že tým musí vyhrát o 4+ bodů. Klíčové pro NFL sázení.', link: { label: 'Glosář →', href: '/glosar' }, emoji: '📊' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'NFL preview a tipy',
      link: { label: 'Fórum →', href: '/forum' },
      items: [
        { title: 'Chiefs vs Bills — spread analýza 🏈', time: 'před 1 den', emoji: '🔥' },
        { title: 'NFL Week 1 — injury report přehled 🏥', time: 'před 2 dny', emoji: '🇺🇸' },
        { title: 'Weather impact — kdy ovlivní totals 🌧️', time: 'před 3 dny', emoji: '🌡️' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'NFL betting od základů',
      link: { label: 'Články →', href: '/skola' },
      items: [
        { title: 'Spread vs moneyline v NFL', readTime: '7 min', emoji: '🏈' },
        { title: 'DVOA — co to je a jak použít', readTime: '8 min', emoji: '📊' },
        { title: 'Totals betting — weather a pace', readTime: '6 min', emoji: '🌡️' },
      ],
    },
    faq: [
      { q: 'Kolik signálů v NFL sezóně?', a: '3–8 signálů týdně během regular season, více v play-off a Super Bowl.' },
      { q: 'Sázíte na NCAA?', a: 'Ano, vybrané Power 5 zápasy s kompletní analýzou.' },
      { q: 'Co je DVOA?', a: 'Defense-adjusted Value Over Average — metrika efektivity týmu oproti průměru ligy.' },
      { q: 'Jak weather ovlivňuje NFL?', a: 'Vítr 15+ mph = méně passing yardů = nižší totals. Déšť/sníh = více běhové hry.' },
    ],
  }),

  esports: page('esports', 'Esporty', '🎮', {
    metaTitle: 'Sázení na esporty',
    metaDescription: 'CS2, LoL, Dota 2, Valorant — esportové signály s map pool analýzou.',
    hero: {
      badge1: '4 hry',
      badge2: '410+ signálů',
      title: 'Esportové sázení na',
      titleAccent: 'CS2, LoL, Dota 2',
      subtitle: 'Major turnaje, tier 1 ligy. Map pool analýzy, roster changes, meta shifty a live momentum betting.',
      ctaPrimary: { label: 'Zkušební přístup zdarma', href: '/registrace' },
      ctaSecondary: { label: 'Zobrazit signály', href: '/vysledky?sport=esports' },
      logos: ['🎮', '⌨️', '🖱️', '🏆', '🎯', '🕹️', '🎮'],
    },
    features: {
      sectionTag: 'Esporty',
      sectionTitle: 'Sázej na esporty s map pool daty',
      items: [
        { icon: 'fa-map', title: 'Map pool analýza', description: 'CS2 mapy, LoL draft, Dota meta — každá hra má svou specifiku.', link: { label: 'Signály →', href: '/vysledky?sport=esports' } },
        { icon: 'fa-users-cog', title: 'Roster changes', description: 'Nový hráč nebo trenér = změna formy. Sledujeme transfery v reálném čase.' },
        { icon: 'fa-gamepad', title: '4 hry', description: 'CS2, League of Legends, Dota 2 a Valorant — tier 1 turnaje a ligy.' },
      ],
    },
    bento: [
      { size: 'large', title: 'CS2 Major signály', description: 'Map picks, economy rounds a momentum analýza pro CS2 Major turnaje.', link: { label: 'Signály →', href: '/vysledky?sport=esports' }, emoji: '🔫' },
      { size: 'small', title: 'LoL draft analýza', description: 'Champion picks a meta shifty ovlivňují kurzy před zápasem.', link: { label: 'Live →', href: '/live?sport=esports' }, emoji: '⚔️' },
      { size: 'small', title: 'Live esport betting', description: 'Momentum betting během mapy — economy, round wins, objective control.', link: { label: 'Dashboard →', href: '/live?sport=esports' }, emoji: '📡' },
    ],
    tools: {
      sectionTag: 'Nástroje',
      sectionTitle: 'Esport betting nástroje',
      cta: { label: 'Otevřít účet', href: '/registrace' },
      items: baseTools('esportové'),
      preview: { title: 'Dnešní esport signály', lines: ['NAVI vs FaZe — CS2 ML · 2.10 · conf. 7.2', 'G2 vs Fnatic — LoL ML · 1.65 · conf. 7.3', 'T1 vs Gen.G — Map 1 · 1.80 · conf. 6.9'] },
    },
    markets: {
      sectionTag: 'Nabídka',
      sectionTitle: 'CS2, LoL, Dota 2 a Valorant',
      cta: { label: 'Statistiky →', href: '/statistiky?sport=esports' },
      searchPlaceholder: 'Hledej tým...',
      rows: [
        { name: 'CS2', sub: '🔫 FPS', change: '+2.5%', changePositive: true, value: 'Favorit: 58%' },
        { name: 'LoL', sub: '⚔️ MOBA', change: '+1.8%', changePositive: true, value: 'Map 1: 55%' },
        { name: 'Dota 2', sub: '🏰 MOBA', change: '+1.2%', changePositive: true, value: 'Map 1: 54%' },
        { name: 'Valorant', sub: '🎯 FPS', change: '+2.0%', changePositive: true, value: 'Map 1: 56%' },
      ],
    },
    promo: { title: 'CS2 Major Copenhagen — signály s map pool analýzou', description: 'Roster changes, meta shifty a live momentum betting během turnaje.', link: { label: 'Začít →', href: '/registrace' }, emoji: '🏆' },
    spotlight: { tag: 'Map betting', title: 'CS2 map picks — skrytý edge', description: 'Některé týmy mají 80%+ win rate na své pick mapě. To je obrovský edge.', link: { label: 'Více →', href: '/skola' }, emoji: '🗺️' },
    news: {
      sectionTag: 'Analýzy',
      sectionTitle: 'Esport preview a tipy',
      link: { label: 'Fórum →', href: '/forum/5' },
      items: [
        { title: 'CS2 Major Copenhagen — skupiny a tipy 🎮', time: 'před 8 hod', emoji: '🏆' },
        { title: 'LoL LEC — G2 vs Fnatic preview ⚔️', time: 'před 12 hod', emoji: '🇪🇺' },
        { title: 'NAVI roster change — dopad na kurzy 🔫', time: 'před 1 den', emoji: '💛' },
      ],
    },
    education: {
      sectionTag: 'Vzdělávání',
      sectionTitle: 'Esport betting průvodce',
      link: { label: 'Články →', href: '/skola' },
      items: [
        { title: 'CS2 map pool — kompletní průvodce', readTime: '8 min', emoji: '🔫' },
        { title: 'LoL draft analýza pro sázkaře', readTime: '7 min', emoji: '⚔️' },
        { title: 'Live esport betting — momentum', readTime: '6 min', emoji: '📡' },
      ],
    },
    faq: [
      { q: 'Které esporty pokrýváte?', a: 'CS2, League of Legends, Dota 2 a Valorant — tier 1 turnaje a ligy.' },
      { q: 'Co je map pool analýza?', a: 'V CS2 každý tým má silné a slabé mapy. Sázení na pick mapu = edge.' },
      { q: 'Sázíte live během zápasu?', a: 'Ano, momentum betting na economy, round wins a objective control.' },
      { q: 'Jak roster change ovlivní kurz?', a: 'Nový hráč potřebuje čas na synergii. Kurzy se často neadjustují dostatečně rychle.' },
    ],
  }),
};

export function getSportPage(sport: Sport): SportPageContent {
  return SPORT_PAGES[sport];
}
