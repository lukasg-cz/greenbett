export interface StatsLink {
  icon: string;
  name: string;
  url: string;
  tag?: 'primary' | 'alt';
  tagText?: string;
}

export interface StatsLinksResult {
  teamStats: StatsLink[];
  league: StatsLink[];
  h2h: StatsLink[];
  odds: StatsLink[];
}

export const CHECKLIST_ITEMS = [
  'Ligový průměr gólů',
  'Průměr domácích (liga)',
  'Průměr hostů (liga)',
  'Góly domácího doma',
  'Obdržené domácího doma',
  'Góly hostů venku',
  'Obdržené hostů venku',
  'H2H (3 zápasy)',
  'Kurzy bookmakera',
];

function enc(text: string): string {
  return encodeURIComponent(text.trim());
}

export function generateStatsLinks(homeTeam: string, awayTeam: string): StatsLinksResult {
  const home = homeTeam.trim();
  const away = awayTeam.trim();
  const homeEnc = enc(home);
  const awayEnc = enc(away);

  const teamStats: StatsLink[] = [
    { icon: '🟢', name: `Livesport — ${home} (statistiky)`, url: `https://www.livesport.cz/search/?q=${homeEnc}`, tag: 'primary', tagText: 'Hlavní' },
    { icon: '🔴', name: `Livesport — ${away} (statistiky)`, url: `https://www.livesport.cz/search/?q=${awayEnc}`, tag: 'primary', tagText: 'Hlavní' },
    { icon: '📈', name: `FBref — ${home} (xG, detailní stats)`, url: `https://www.google.com/search?q=site:fbref.com+${homeEnc}+stats`, tag: 'alt', tagText: 'Detailní' },
    { icon: '📈', name: `FBref — ${away} (xG, detailní stats)`, url: `https://www.google.com/search?q=site:fbref.com+${awayEnc}+stats`, tag: 'alt', tagText: 'Detailní' },
    { icon: '📊', name: `FootyStats — ${home} + ${away}`, url: `https://www.google.com/search?q=site:footystats.org+${homeEnc}+${awayEnc}` },
    { icon: '🔍', name: `Google — „${home} goals stats home away per game"`, url: `https://www.google.com/search?q=${homeEnc}+goals+stats+home+away+per+game+2024+2025` },
    { icon: '🔍', name: `Google — „${away} goals stats home away per game"`, url: `https://www.google.com/search?q=${awayEnc}+goals+stats+home+away+per+game+2024+2025` },
  ];

  const league: StatsLink[] = [
    { icon: '🟢', name: 'Livesport — tabulka a statistiky ligy', url: `https://www.livesport.cz/search/?q=${homeEnc}`, tag: 'primary', tagText: 'Hlavní' },
    { icon: '📈', name: 'FBref — ligové statistiky (průměr gólů)', url: `https://www.google.com/search?q=site:fbref.com+${homeEnc}+league+stats`, tag: 'alt', tagText: 'Detailní' },
    { icon: '📊', name: 'FootyStats — ligový přehled gólů', url: `https://www.google.com/search?q=site:footystats.org+league+stats+goals+per+match+${homeEnc}` },
    { icon: '🌐', name: 'Soccerway — tabulka ligy', url: `https://www.google.com/search?q=site:soccerway.com+${homeEnc}+standings` },
    { icon: '🔍', name: 'Google — „[liga] average goals per game home away"', url: `https://www.google.com/search?q=${homeEnc}+league+average+goals+per+game+home+away+2024+2025` },
  ];

  const h2h: StatsLink[] = [
    { icon: '⚔️', name: `Livesport — ${home} vs ${away} H2H`, url: `https://www.livesport.cz/search/?q=${homeEnc}+${awayEnc}`, tag: 'primary', tagText: 'Hlavní' },
    { icon: '⚔️', name: 'BetExplorer — vzájemné zápasy', url: `https://www.google.com/search?q=site:betexplorer.com+${homeEnc}+vs+${awayEnc}+h2h`, tag: 'alt', tagText: 'Alternativa' },
    { icon: '🌐', name: 'Soccerway — H2H', url: `https://www.google.com/search?q=site:soccerway.com+${homeEnc}+vs+${awayEnc}+head+to+head` },
    { icon: '🔍', name: `Google — „${home} vs ${away} head to head last matches"`, url: `https://www.google.com/search?q=${homeEnc}+vs+${awayEnc}+head+to+head+last+matches+results` },
  ];

  const odds: StatsLink[] = [
    { icon: '📉', name: 'Livesport — kurzy na zápas', url: `https://www.livesport.cz/search/?q=${homeEnc}+${awayEnc}`, tag: 'primary', tagText: 'Hlavní' },
    { icon: '📉', name: 'OddsPortal — porovnání kurzů', url: `https://www.google.com/search?q=site:oddsportal.com+${homeEnc}+${awayEnc}`, tag: 'alt', tagText: 'Porovnání' },
    { icon: '📊', name: 'BetExplorer — kurzy od více bookmakerů', url: `https://www.google.com/search?q=site:betexplorer.com+${homeEnc}+${awayEnc}` },
    { icon: '🔍', name: `Google — „${home} vs ${away} odds 1x2 over under btts"`, url: `https://www.google.com/search?q=${homeEnc}+vs+${awayEnc}+odds+1x2+over+under+btts` },
  ];

  return { teamStats, league, h2h, odds };
}
