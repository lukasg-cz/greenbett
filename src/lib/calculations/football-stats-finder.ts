export interface LeagueOption {
  value: string;
  label: string;
  group: string;
  country: string;
  fbref: string;
  tm: string;
  fs: string;
  sway: string;
}

export interface StatsLink {
  icon: string;
  name: string;
  url: string;
  tag?: 'best' | 'good';
  tagText?: string;
}

export interface StatsLinksResult {
  teamStats: StatsLink[];
  league: StatsLink[];
  h2h: StatsLink[];
  odds: StatsLink[];
}

export const LEAGUE_OPTIONS: LeagueOption[] = [
  { value: 'premier-league', label: 'Premier League', group: 'Top 5 lig', country: 'england', fbref: '9/Premier-League', tm: 'GB1', fs: 'england/premier-league', sway: 'england/premier-league' },
  { value: 'la-liga', label: 'La Liga', group: 'Top 5 lig', country: 'spain', fbref: '12/La-Liga', tm: 'ES1', fs: 'spain/laliga', sway: 'spain/primera-division' },
  { value: 'bundesliga', label: 'Bundesliga', group: 'Top 5 lig', country: 'germany', fbref: '20/Bundesliga', tm: 'L1', fs: 'germany/bundesliga', sway: 'germany/bundesliga' },
  { value: 'serie-a', label: 'Serie A', group: 'Top 5 lig', country: 'italy', fbref: '11/Serie-A', tm: 'IT1', fs: 'italy/serie-a', sway: 'italy/serie-a' },
  { value: 'ligue-1', label: 'Ligue 1', group: 'Top 5 lig', country: 'france', fbref: '13/Ligue-1', tm: 'FR1', fs: 'france/ligue-1', sway: 'france/ligue-1' },
  { value: 'eredivisie', label: 'Eredivisie', group: 'Další ligy', country: 'netherlands', fbref: '23/Eredivisie', tm: 'NL1', fs: 'netherlands/eredivisie', sway: 'netherlands/eredivisie' },
  { value: 'primeira-liga', label: 'Primeira Liga', group: 'Další ligy', country: 'portugal', fbref: '32/Primeira-Liga', tm: 'PO1', fs: 'portugal/liga-portugal', sway: 'portugal/portuguese-liga' },
  { value: 'super-lig', label: 'Süper Lig', group: 'Další ligy', country: 'turkey', fbref: '26/Super-Lig', tm: 'TR1', fs: 'turkey/super-lig', sway: 'turkey/super-lig' },
  { value: 'belgian-pro-league', label: 'Belgian Pro League', group: 'Další ligy', country: 'belgium', fbref: '37/Belgian-Pro-League', tm: 'BE1', fs: 'belgium/jupiler-pro-league', sway: 'belgium/first-division-a' },
  { value: 'scottish-premiership', label: 'Scottish Premiership', group: 'Další ligy', country: 'scotland', fbref: '40/Scottish-Premiership', tm: 'SC1', fs: 'scotland/premiership', sway: 'scotland/premier-league' },
  { value: 'chance-liga', label: 'Chance Liga (Česko)', group: 'Střední Evropa', country: 'czech', fbref: '66/Czech-First-League', tm: 'CZ1', fs: 'czech-republic/1-liga', sway: 'czech-republic/czech-liga' },
  { value: 'nike-liga', label: 'Nike Liga (Slovensko)', group: 'Střední Evropa', country: 'slovakia', fbref: 'none', tm: 'SK1', fs: 'slovakia/nike-liga', sway: 'slovakia/super-liga' },
  { value: 'ekstraklasa', label: 'Ekstraklasa (Polsko)', group: 'Střední Evropa', country: 'poland', fbref: '36/Ekstraklasa', tm: 'PL1', fs: 'poland/ekstraklasa', sway: 'poland/ekstraklasa' },
  { value: 'austrian-bundesliga', label: 'Bundesliga (Rakousko)', group: 'Střední Evropa', country: 'austria', fbref: '56/Austrian-Bundesliga', tm: 'A1', fs: 'austria/bundesliga', sway: 'austria/bundesliga' },
  { value: 'champions-league', label: 'Champions League', group: 'Poháry', country: 'europe', fbref: '8/Champions-League', tm: 'CL', fs: 'europe/champions-league', sway: 'europe/uefa-champions-league' },
  { value: 'europa-league', label: 'Europa League', group: 'Poháry', country: 'europe', fbref: '19/Europa-League', tm: 'EL', fs: 'europe/europa-league', sway: 'europe/uefa-europa-league' },
  { value: 'conference-league', label: 'Conference League', group: 'Poháry', country: 'europe', fbref: '882/Conference-League', tm: 'ECLQ', fs: 'europe/europa-conference-league', sway: 'europe/uefa-europa-conference-league' },
];

export const CHECKLIST_ITEMS = [
  'Ligový průměr gólů',
  'Průměr gólů domácích (liga)',
  'Průměr gólů hostů (liga)',
  'Góly domácího týmu doma',
  'Obdržené domácího doma',
  'Góly hostů venku',
  'Obdržené hostů venku',
  'H2H (3 zápasy)',
  'Kurzy bookmakera',
];

const SLUG_MAP: Record<string, string> = {
  á: 'a', č: 'c', ď: 'd', é: 'e', ě: 'e', í: 'i', ň: 'n', ó: 'o', ř: 'r', š: 's', ť: 't', ú: 'u', ů: 'u', ý: 'y', ž: 'z',
  ä: 'a', ö: 'o', ü: 'u', ß: 'ss', ñ: 'n', ç: 'c', ø: 'o', å: 'a', ã: 'a', õ: 'o', ł: 'l', ś: 's', ź: 'z', ż: 'z', ć: 'c', ę: 'e', ą: 'a',
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((c) => SLUG_MAP[c] ?? c)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function googleSlug(text: string): string {
  return encodeURIComponent(text.trim());
}

export function generateStatsLinks(homeTeam: string, awayTeam: string, league: LeagueOption): StatsLinksResult {
  const home = homeTeam.trim();
  const away = awayTeam.trim();
  const homeEnc = googleSlug(home);
  const awayEnc = googleSlug(away);
  const leagueName = league.label;
  const fsPath = league.fs;
  const fbrefPath = league.fbref;

  const teamStats: StatsLink[] = [
    { icon: '📈', name: `FBref — ${home} statistiky`, url: `https://www.google.com/search?q=site:fbref.com+${homeEnc}+stats&btnI=1`, tag: 'best', tagText: 'Nejlepší' },
    { icon: '📈', name: `FBref — ${away} statistiky`, url: `https://www.google.com/search?q=site:fbref.com+${awayEnc}+stats&btnI=1`, tag: 'best', tagText: 'Nejlepší' },
    { icon: '⚡', name: `Flashscore — ${home}`, url: `https://www.flashscore.com/search/?q=${homeEnc}`, tag: 'good', tagText: 'Rychlé' },
    { icon: '⚡', name: `Flashscore — ${away}`, url: `https://www.flashscore.com/search/?q=${awayEnc}`, tag: 'good', tagText: 'Rychlé' },
    { icon: '📊', name: `FootyStats — ${home} + ${away}`, url: `https://www.google.com/search?q=site:footystats.org+${homeEnc}+${awayEnc}` },
  ];

  const leagueLinks: StatsLink[] = [];
  if (fbrefPath !== 'none') {
    leagueLinks.push({
      icon: '📈',
      name: `FBref — ${leagueName} stats`,
      url: `https://fbref.com/en/comps/${fbrefPath}/stats`,
      tag: 'best',
      tagText: 'Nejlepší',
    });
  }
  leagueLinks.push(
    { icon: '⚡', name: `Flashscore — ${leagueName} tabulka`, url: `https://www.flashscore.com/football/${fsPath}/standings/`, tag: 'good', tagText: 'Rychlé' },
    { icon: '🌐', name: `Soccerway — ${leagueName}`, url: `https://www.google.com/search?q=site:soccerway.com+${googleSlug(leagueName)}+standings` },
    { icon: '📊', name: `FootyStats — ${leagueName} průměr gólů`, url: `https://www.google.com/search?q=site:footystats.org+${googleSlug(leagueName)}+stats` },
    { icon: '🔍', name: `Google — „${leagueName} average goals per game"`, url: `https://www.google.com/search?q=${googleSlug(leagueName)}+average+goals+per+game+home+away` },
  );

  const h2h: StatsLink[] = [
    { icon: '⚡', name: `Flashscore — ${home} vs ${away} H2H`, url: `https://www.flashscore.com/search/?q=${homeEnc}+${awayEnc}`, tag: 'best', tagText: 'Nejlepší' },
    { icon: '⚔️', name: '11v11 — vzájemné zápasy', url: `https://www.11v11.com/teams/search/?q=${homeEnc}` },
    { icon: '🌐', name: 'Soccerway — H2H', url: `https://www.google.com/search?q=site:soccerway.com+${homeEnc}+vs+${awayEnc}+head+to+head` },
    { icon: '🔍', name: `Google — „${home} vs ${away} head to head"`, url: `https://www.google.com/search?q=${homeEnc}+vs+${awayEnc}+head+to+head+last+matches` },
  ];

  const odds: StatsLink[] = [
    { icon: '📉', name: `OddsPortal — ${home} vs ${away}`, url: `https://www.google.com/search?q=site:oddsportal.com+${homeEnc}+${awayEnc}&btnI=1`, tag: 'best', tagText: 'Nejlepší' },
    { icon: '⚡', name: 'Flashscore — kurzy na zápas', url: `https://www.flashscore.com/search/?q=${homeEnc}+${awayEnc}`, tag: 'good', tagText: 'Rychlé' },
    { icon: '📊', name: 'BetExplorer — porovnání kurzů', url: `https://www.google.com/search?q=site:betexplorer.com+${homeEnc}+${awayEnc}&btnI=1` },
    { icon: '🔍', name: `Google — „${home} vs ${away} odds"`, url: `https://www.google.com/search?q=${homeEnc}+vs+${awayEnc}+odds+1x2+over+under+btts` },
  ];

  return { teamStats, league: leagueLinks, h2h, odds };
}

export function getLeagueByValue(value: string): LeagueOption | undefined {
  return LEAGUE_OPTIONS.find((l) => l.value === value);
}
