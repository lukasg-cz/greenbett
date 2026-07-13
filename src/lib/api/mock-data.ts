import type { Match, ValueBet, LeaderboardEntry, LeagueStat, Signal, ForumCategory } from '@/types';

export const MOCK_MATCHES: Match[] = [
  { league: 'Premier League', home: 'Arsenal', away: 'Chelsea', homeIcon: '🔴', awayIcon: '🔵', score: '2 : 1', time: "67'", live: true, sport: 'football', odds: ['3.20', '3.50', '2.10'] },
  { league: 'La Liga', home: 'Real Madrid', away: 'Barcelona', homeIcon: '⚪', awayIcon: '🔵🔴', score: '0 : 0', time: "23'", live: true, sport: 'football', odds: ['2.40', '3.30', '2.80'] },
  { league: 'Bundesliga', home: 'Bayern', away: 'Dortmund', homeIcon: '🔴', awayIcon: '🟡', score: '— : —', time: '18:30', live: false, sport: 'football', odds: ['1.65', '4.00', '4.50'] },
  { league: 'Chance Liga', home: 'Sparta', away: 'Slavia', homeIcon: '🟤', awayIcon: '🔴⚪', score: '— : —', time: '20:00', live: false, sport: 'football', odds: ['2.10', '3.40', '3.20'] },
  { league: 'NHL', home: 'Colorado', away: 'Tampa Bay', homeIcon: '🏔️', awayIcon: '⚡', score: '3 : 2', time: 'P2 · 14:22', live: true, sport: 'hockey', odds: ['1.55', '—', '2.35'] },
  { league: 'NBA', home: 'Lakers', away: 'Celtics', homeIcon: '💜', awayIcon: '☘️', score: '— : —', time: '02:00', live: false, sport: 'basketball', odds: ['2.20', '—', '1.70'] },
  { league: 'ATP Indian Wells', home: 'Sinner', away: 'Medvedev', homeIcon: '🇮🇹', awayIcon: '🇷🇺', score: '1 : 0', time: 'Set 2', live: true, sport: 'tennis', odds: ['1.45', '—', '2.75'] },
  { league: 'ATP Indian Wells', home: 'Alcaraz', away: 'Zverev', homeIcon: '🇪🇸', awayIcon: '🇩🇪', score: '— : —', time: '19:00', live: false, sport: 'tennis', odds: ['1.55', '—', '2.45'] },
  { league: 'MLB', home: 'Yankees', away: 'Red Sox', homeIcon: '⚾', awayIcon: '🧦', score: '4 : 3', time: '7. inning', live: true, sport: 'baseball', odds: ['1.72', '—', '2.10'] },
  { league: 'MLB', home: 'Dodgers', away: 'Giants', homeIcon: '🔵', awayIcon: '🟠', score: '— : —', time: '04:10', live: false, sport: 'baseball', odds: ['1.60', '—', '2.30'] },
  { league: 'NFL', home: 'Chiefs', away: 'Bills', homeIcon: '🏈', awayIcon: '🔵', score: '— : —', time: 'Neděle 22:00', live: false, sport: 'amfootball', odds: ['1.85', '—', '1.95'] },
  { league: 'CS2 Major', home: 'NAVI', away: 'FaZe', homeIcon: '💛', awayIcon: '🔴', score: '1 : 0', time: 'Map 2', live: true, sport: 'esports', odds: ['1.90', '—', '1.90'] },
  { league: 'LoL LEC', home: 'G2', away: 'Fnatic', homeIcon: '⚫', awayIcon: '🟠', score: '— : —', time: '18:00', live: false, sport: 'esports', odds: ['1.65', '—', '2.20'] },
  { league: 'Extraliga', home: 'Sparta', away: 'Kometa', homeIcon: '🔵', awayIcon: '🟡', score: '2 : 1', time: '58. min', live: true, sport: 'hockey', odds: ['1.80', '—', '2.00'] },
  { league: 'EuroLeague', home: 'Real Madrid', away: 'Barcelona', homeIcon: '⚪', awayIcon: '🔵🔴', score: '— : —', time: '20:30', live: false, sport: 'basketball', odds: ['1.95', '—', '1.85'] },
];

export const MOCK_VALUE_BETS: ValueBet[] = [
  { match: 'Arsenal vs Chelsea', league: 'Premier League', market: 'Over 2.5', odds: '1.95', fair: '1.72', ev: '13.4%', evClass: 'ev-high', conf: '8.1', sport: 'football', evPercent: 13.4 },
  { match: 'Bayern vs Dortmund', league: 'Bundesliga', market: 'BTTS Ano', odds: '1.80', fair: '1.65', ev: '9.1%', evClass: 'ev-medium', conf: '7.4', sport: 'football', evPercent: 9.1 },
  { match: 'Sparta vs Slavia', league: 'Chance Liga', market: 'Over 2.5', odds: '1.82', fair: '1.68', ev: '8.3%', evClass: 'ev-medium', conf: '7.8', sport: 'football', evPercent: 8.3 },
  { match: 'Djokovic vs Alcaraz', league: 'ATP Wimbledon', market: 'Over 22.5 gamů', odds: '1.78', fair: '1.55', ev: '14.8%', evClass: 'ev-high', conf: '8.5', sport: 'tennis', evPercent: 14.8 },
  { match: 'Real Madrid vs Barcelona', league: 'La Liga', market: '1X', odds: '1.45', fair: '1.38', ev: '5.1%', evClass: 'ev-low', conf: '7.0', sport: 'football', evPercent: 5.1 },
  { match: 'Colorado vs Tampa Bay', league: 'NHL', market: 'Over 5.5', odds: '1.90', fair: '1.70', ev: '11.8%', evClass: 'ev-high', conf: '7.9', sport: 'hockey', evPercent: 11.8 },
  { match: 'NAVI vs FaZe', league: 'CS2 Major', market: 'NAVI ML', odds: '2.10', fair: '1.85', ev: '13.5%', evClass: 'ev-high', conf: '7.2', sport: 'esports', evPercent: 13.5 },
  { match: 'Lakers vs Celtics', league: 'NBA', market: 'Under 215.5', odds: '1.88', fair: '1.75', ev: '7.4%', evClass: 'ev-medium', conf: '6.8', sport: 'basketball', evPercent: 7.4 },
  { match: 'Yankees vs Red Sox', league: 'MLB', market: 'Over 8.5 runs', odds: '1.92', fair: '1.78', ev: '7.9%', evClass: 'ev-medium', conf: '7.1', sport: 'baseball', evPercent: 7.9 },
  { match: 'Chiefs vs Bills', league: 'NFL', market: 'Chiefs -3.5', odds: '1.91', fair: '1.80', ev: '6.1%', evClass: 'ev-low', conf: '6.5', sport: 'amfootball', evPercent: 6.1 },
  { match: 'G2 vs Fnatic', league: 'LoL LEC', market: 'G2 ML', odds: '1.65', fair: '1.52', ev: '8.6%', evClass: 'ev-medium', conf: '7.3', sport: 'esports', evPercent: 8.6 },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'ProTipér_CZ', initials: 'PT', tips: 342, hitRate: '68%', roi: '+24.3%', profit: '+82.1', streak: '🔥 W7' },
  { rank: 2, name: 'DataKing', initials: 'DK', tips: 289, hitRate: '65%', roi: '+19.8%', profit: '+57.2', streak: 'W3' },
  { rank: 3, name: 'ValueHunter', initials: 'VH', tips: 456, hitRate: '62%', roi: '+17.1%', profit: '+78.0', streak: 'L1' },
  { rank: 4, name: 'BetMaster99', initials: 'BM', tips: 198, hitRate: '71%', roi: '+15.6%', profit: '+30.9', streak: 'W5' },
  { rank: 5, name: 'SpartaFan', initials: 'SF', tips: 167, hitRate: '64%', roi: '+14.2%', profit: '+23.7', streak: 'W2' },
  { rank: 6, name: 'IceKingHockey', initials: 'IK', tips: 234, hitRate: '60%', roi: '+12.8%', profit: '+30.0', streak: 'L2' },
  { rank: 7, name: 'TennisAce', initials: 'TA', tips: 145, hitRate: '67%', roi: '+11.5%', profit: '+16.7', streak: 'W4' },
  { rank: 8, name: 'NBAInsider', initials: 'NI', tips: 178, hitRate: '59%', roi: '+10.3%', profit: '+18.3', streak: 'W1' },
  { rank: 9, name: 'EsportGuru', initials: 'EG', tips: 123, hitRate: '63%', roi: '+9.7%', profit: '+11.9', streak: 'L1' },
  { rank: 10, name: 'SafeBettor', initials: 'SB', tips: 312, hitRate: '58%', roi: '+8.4%', profit: '+26.2', streak: 'W2' },
];

export const MOCK_LEAGUE_STATS: LeagueStat[] = [
  { name: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League', sport: 'football', league: 'Premier League', stats: { 'Průměr gólů': '2.85', 'Over 2.5': '58%', 'BTTS': '52%', 'Domácí výhry': '44%', 'Remízy': '24%', 'Venkovní výhry': '32%' } },
  { name: '🇪🇸 La Liga', sport: 'football', league: 'La Liga', stats: { 'Průměr gólů': '2.62', 'Over 2.5': '53%', 'BTTS': '48%', 'Domácí výhry': '47%', 'Remízy': '25%', 'Venkovní výhry': '28%' } },
  { name: '🇩🇪 Bundesliga', sport: 'football', league: 'Bundesliga', stats: { 'Průměr gólů': '3.12', 'Over 2.5': '63%', 'BTTS': '57%', 'Domácí výhry': '43%', 'Remízy': '22%', 'Venkovní výhry': '35%' } },
  { name: '🇮🇹 Serie A', sport: 'football', league: 'Serie A', stats: { 'Průměr gólů': '2.71', 'Over 2.5': '55%', 'BTTS': '50%', 'Domácí výhry': '46%', 'Remízy': '26%', 'Venkovní výhry': '28%' } },
  { name: '🇫🇷 Ligue 1', sport: 'football', league: 'Ligue 1', stats: { 'Průměr gólů': '2.68', 'Over 2.5': '52%', 'BTTS': '46%', 'Domácí výhry': '45%', 'Remízy': '24%', 'Venkovní výhry': '31%' } },
  { name: '🇨🇿 Chance Liga', sport: 'football', league: 'Chance Liga', stats: { 'Průměr gólů': '2.54', 'Over 2.5': '49%', 'BTTS': '44%', 'Domácí výhry': '48%', 'Remízy': '23%', 'Venkovní výhry': '29%' } },
  { name: '🏒 NHL', sport: 'hockey', league: 'NHL', stats: { 'Průměr gólů': '6.12', 'Over 5.5': '54%', 'Domácí výhry': '52%', 'Overtime': '18%', 'Power play góly': '22%', 'Průměr střel': '30.4' } },
  { name: '🇨🇿 Extraliga', sport: 'hockey', league: 'Extraliga', stats: { 'Průměr gólů': '5.48', 'Over 5.5': '48%', 'Domácí výhry': '55%', 'Overtime': '14%', 'Power play góly': '19%', 'Průměr střel': '28.1' } },
  { name: '🇸🇪 SHL', sport: 'hockey', league: 'SHL', stats: { 'Průměr gólů': '5.72', 'Over 5.5': '51%', 'Domácí výhry': '53%', 'Overtime': '16%', 'Power play góly': '20%', 'Průměr střel': '29.3' } },
  { name: '🏀 NBA', sport: 'basketball', league: 'NBA', stats: { 'Průměr bodů': '228.4', 'Over 220.5': '57%', 'Domácí výhry': '58%', 'Průměr 3PT': '12.8', 'Pace': '99.2', 'OT zápasy': '6%' } },
  { name: '🇪🇺 EuroLeague', sport: 'basketball', league: 'EuroLeague', stats: { 'Průměr bodů': '165.2', 'Over 160.5': '52%', 'Domácí výhry': '61%', 'Průměr 3PT': '8.4', 'Pace': '72.1', 'OT zápasy': '4%' } },
  { name: '🎾 ATP', sport: 'tennis', league: 'ATP', stats: { 'Průměr gamů': '22.8', 'Over 22.5': '48%', 'Favorit výhra': '62%', 'Tiebreak %': '11%', '1. set výhra': '54%', '3-set zápasy': '38%' } },
  { name: '🎾 WTA', sport: 'tennis', league: 'WTA', stats: { 'Průměr gamů': '21.4', 'Over 21.5': '45%', 'Favorit výhra': '59%', 'Tiebreak %': '9%', '1. set výhra': '52%', '3-set zápasy': '42%' } },
  { name: '⚾ MLB', sport: 'baseball', league: 'MLB', stats: { 'Průměr runs': '8.6', 'Over 8.5': '51%', 'Domácí výhry': '54%', 'F5 Over 4.5': '47%', 'Bullpen ERA': '3.82', 'HR/zápas': '2.1' } },
  { name: '🏈 NFL', sport: 'amfootball', league: 'NFL', stats: { 'Průměr bodů': '44.8', 'Over 44.5': '49%', 'Domácí výhry': '57%', 'Cover spread': '48%', 'Průměr yardů': '338', 'Turnover diff.': '+0.3' } },
  { name: '🎮 CS2', sport: 'esports', league: 'CS2', stats: { 'Průměr map': '2.4', 'Over 2.5 map': '42%', 'Favorit výhra': '58%', 'OT mapy': '8%', 'CT win %': '52%', 'Pistol round': '51%' } },
];

export const MOCK_SIGNALS: Signal[] = [
  { id: '1', sport: 'football', league: 'Chance Liga', matchHome: 'Sparta', matchAway: 'Slavia', market: 'Over 2.5 gólů', odds: 1.82, confidence: 7.8, unitSize: 2, status: 'pending', createdAt: new Date().toISOString() },
  { id: '2', sport: 'football', league: 'Premier League', matchHome: 'Arsenal', matchAway: 'Chelsea', market: 'Over 2.5', odds: 1.95, confidence: 8.1, unitSize: 2, status: 'win', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', sport: 'football', league: 'Bundesliga', matchHome: 'Bayern', matchAway: 'Dortmund', market: 'BTTS Ano', odds: 1.80, confidence: 7.4, unitSize: 1.5, status: 'win', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '4', sport: 'hockey', league: 'NHL', matchHome: 'Colorado', matchAway: 'Tampa Bay', market: 'Over 5.5', odds: 1.90, confidence: 7.9, unitSize: 2, status: 'loss', createdAt: new Date(Date.now() - 259200000).toISOString() },
  { id: '5', sport: 'tennis', league: 'ATP Wimbledon', matchHome: 'Djokovic', matchAway: 'Alcaraz', market: 'Over 22.5 gamů', odds: 1.78, confidence: 8.5, unitSize: 2, status: 'win', createdAt: new Date(Date.now() - 345600000).toISOString() },
  { id: '6', sport: 'basketball', league: 'NBA', matchHome: 'Lakers', matchAway: 'Celtics', market: 'Under 215.5', odds: 1.88, confidence: 6.8, unitSize: 1, status: 'pending', createdAt: new Date(Date.now() - 432000000).toISOString() },
  { id: '7', sport: 'esports', league: 'CS2 Major', matchHome: 'NAVI', matchAway: 'FaZe', market: 'NAVI ML', odds: 2.10, confidence: 7.2, unitSize: 1.5, status: 'win', createdAt: new Date(Date.now() - 518400000).toISOString() },
  { id: '8', sport: 'football', league: 'La Liga', matchHome: 'Real Madrid', matchAway: 'Barcelona', market: '1X', odds: 1.45, confidence: 7.0, unitSize: 1, status: 'loss', createdAt: new Date(Date.now() - 604800000).toISOString() },
  { id: '9', sport: 'baseball', league: 'MLB', matchHome: 'Yankees', matchAway: 'Red Sox', market: 'Over 8.5 runs', odds: 1.92, confidence: 7.1, unitSize: 1.5, status: 'win', createdAt: new Date(Date.now() - 691200000).toISOString() },
  { id: '10', sport: 'amfootball', league: 'NFL', matchHome: 'Chiefs', matchAway: 'Bills', market: 'Chiefs -3.5', odds: 1.91, confidence: 6.5, unitSize: 1, status: 'pending', createdAt: new Date(Date.now() - 777600000).toISOString() },
];

export const MOCK_FORUM_CATEGORIES: ForumCategory[] = [
  { id: '1', name: 'Dnešní zápasy', description: 'Diskuze o dnešních zápasech, tipy a analýzy od komunity', icon: 'fire', threadCount: 342, latestTitle: 'Arsenal vs Chelsea — preview', latestAuthor: 'MarekT', latestTime: 'před 12 min' },
  { id: '2', name: 'Fotbal', description: 'Premier League, La Liga, Bundesliga, Serie A, české ligy', icon: 'futbol', threadCount: 1247, latestTitle: 'PL sezóna 26/27 — predikce', latestAuthor: 'DavidK', latestTime: 'před 1 hod' },
  { id: '3', name: 'Hokej', description: 'NHL, Extraliga, KHL, SHL', icon: 'hockey-puck', threadCount: 589, latestTitle: 'NHL offseason moves — dopad na odds', latestAuthor: 'PetrV', latestTime: 'před 3 hod' },
  { id: '4', name: 'Basketbal & Tenis', description: 'NBA, EuroLeague, ATP, WTA, Grand Slamy', icon: 'basketball-ball', threadCount: 412, latestTitle: 'Wimbledon 2026 — value bety', latestAuthor: 'JakubH', latestTime: 'před 5 hod' },
  { id: '5', name: 'Esporty', description: 'CS2, LoL, Dota 2, Valorant', icon: 'gamepad', threadCount: 278, latestTitle: 'CS2 Major Copenhagen — skupiny', latestAuthor: 'LukasN', latestTime: 'před 8 hod' },
  { id: '6', name: 'Strategie & Bankroll', description: 'Value betting, Kelly criterion, bankroll management, psychologie', icon: 'chart-line', threadCount: 156, latestTitle: 'Flat vs Kelly — co funguje lépe?', latestAuthor: 'MartinP', latestTime: 'před 1 den' },
];

export const SPORTS_DATA = [
  {
    id: 'football' as const,
    label: 'Fotbal',
    emoji: '⚽',
    leagues: '120+ lig',
    signals: '2 100+ signálů',
    title: 'Analytické sázení na',
    titleAccent: 'fotbal',
    titleSuffix: 's daty z 120+ lig',
    description: 'Pokrýváme Premier League, La Ligu, Bundesligu, Serie A, Ligue 1, Champions League, české a slovenské ligy i exotické soutěže. Každý signál je podložen statistikami, formou a pohybem kurzů.',
    features: [
      { icon: 'signal', title: '2–5 signálů denně', description: 'Průměrně 2–5 fotbalových tipů denně s confidence skóre a doporučeným unit size.' },
      { icon: 'chart-pie', title: '94 % přesnost', description: 'Historická přesnost fotbalových signálů ověřená ve veřejné evidenci.' },
      { icon: 'globe', title: '120+ lig', description: 'Od Premier League po českou 2. ligu. Pokrýváme vše, kde jsou data.' },
    ],
    logos: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇪🇸', '🇩🇪', '🇮🇹', '🇫🇷', '🇨🇿', '⚽'],
  },
  {
    id: 'hockey' as const,
    label: 'Hokej',
    emoji: '🏒',
    leagues: '15+ lig',
    signals: '890+ signálů',
    title: 'Hokejové analýzy s důrazem na',
    titleAccent: 'NHL a Extraligu',
    titleSuffix: '',
    description: 'Specializujeme se na NHL, KHL, SHL, Extraligu a Champions Hockey League. Sledujeme brankářské rotace, power play efektivitu a pohyb pucklajnů.',
    features: [
      { icon: 'signal', title: '1–3 signály denně', description: 'Hokejové tipy na totals, moneyline a puckline s důrazem na formu brankářů.' },
      { icon: 'chart-pie', title: '89 % přesnost', description: 'Ověřená přesnost hokejových signálů za posledních 12 měsíců.' },
      { icon: 'globe', title: '15+ lig', description: 'NHL, Extraliga, KHL, SHL, Liiga a další soutěže s kompletními daty.' },
    ],
    logos: ['🏒', '🇺🇸', '🇨🇦', '🇸🇪', '🇫🇮', '🇨🇿', '🥅'],
  },
  {
    id: 'basketball' as const,
    label: 'Basketbal',
    emoji: '🏀',
    leagues: '10+ lig',
    signals: '540+ signálů',
    title: 'Basketbalové sázení na',
    titleAccent: 'NBA, EuroLeague',
    titleSuffix: 'a další',
    description: 'NBA, EuroLeague, FIBA, NBL, NCAA. Sledujeme pace, efektivitu, injury reporty a line movement.',
    features: [
      { icon: 'signal', title: '1–4 signály denně', description: 'Totals, spread a moneyline tipy s analýzou pace a matchup dat.' },
      { icon: 'chart-pie', title: '86 % přesnost', description: 'Basketbalové signály s transparentní veřejnou evidencí výsledků.' },
      { icon: 'globe', title: '10+ lig', description: 'NBA, EuroLeague, NBL, ACB, česká NBL a vybrané NCAA zápasy.' },
    ],
    logos: ['🏀', '🇺🇸', '🇪🇺', '🇪🇸', '🇹🇷', '🇨🇿', '⛹️'],
  },
  {
    id: 'tennis' as const,
    label: 'Tenis',
    emoji: '🎾',
    leagues: 'ATP + WTA',
    signals: '650+ signálů',
    title: 'Tenisové analýzy založené na',
    titleAccent: 'surface datech',
    titleSuffix: '',
    description: 'ATP, WTA, Grand Slamy, Challenger Tour. Analyzujeme povrchy, H2H, servisní statistiky a formu hráčů.',
    features: [
      { icon: 'signal', title: '2–6 signálů denně', description: 'Tipy na gamy, sety a moneyline s důrazem na surface a H2H data.' },
      { icon: 'chart-pie', title: '91 % přesnost', description: 'Tenisové signály využívající pokročilé surface a serve statistiky.' },
      { icon: 'globe', title: 'ATP + WTA', description: 'Grand Slamy, Masters 1000, Challenger Tour a WTA 500/1000 turnaje.' },
    ],
    logos: ['🎾', '🏆', '🇦🇺', '🇫🇷', '🇬🇧', '🇺🇸', '🥎'],
  },
  {
    id: 'baseball' as const,
    label: 'Baseball',
    emoji: '⚾',
    leagues: 'MLB + NPB',
    signals: '320+ signálů',
    title: 'Baseball sázení na',
    titleAccent: 'MLB',
    titleSuffix: 's pokročilými metrikami',
    description: 'Moneyline, run line, totals. Sledujeme starting pitchery, bullpen statistiky, park factors a weather data.',
    features: [
      { icon: 'signal', title: '1–3 signály denně', description: 'MLB tipy na moneyline, run line a totals s pitcher analýzou.' },
      { icon: 'chart-pie', title: '84 % přesnost', description: 'Baseball signály založené na FIP, xERA a park factor datech.' },
      { icon: 'globe', title: 'MLB + NPB', description: 'Americká MLB a japonská NPB s kompletními pitcher statistikami.' },
    ],
    logos: ['⚾', '🇺🇸', '🇯🇵', '🇰🇷', '🏟️', '🧢', '⚾'],
  },
  {
    id: 'amfootball' as const,
    label: 'Am. fotbal',
    emoji: '🏈',
    leagues: 'NFL + NCAA',
    signals: '280+ signálů',
    title: 'Americký fotbal —',
    titleAccent: 'NFL a NCAA',
    titleSuffix: 'analýzy',
    description: 'Spread, moneyline, totals, props. Sledujeme DVOA, EPA, injury reporty a weather conditions.',
    features: [
      { icon: 'signal', title: '3–8 signálů týdně', description: 'NFL a NCAA tipy na spread, totals a team props v sezóně.' },
      { icon: 'chart-pie', title: '87 % přesnost', description: 'Americký fotbal s analýzou DVOA, EPA a injury reportů.' },
      { icon: 'globe', title: 'NFL + NCAA', description: 'NFL regular season, playoffs a vybrané NCAA Power 5 zápasy.' },
    ],
    logos: ['🏈', '🇺🇸', '🏟️', '🎓', '🏆', '🦅', '🏈'],
  },
  {
    id: 'esports' as const,
    label: 'Esporty',
    emoji: '🎮',
    leagues: 'CS2, LoL, Dota 2, Valorant',
    signals: '410+ signálů',
    title: 'Esportové sázení na',
    titleAccent: 'CS2, LoL, Dota 2',
    titleSuffix: '',
    description: 'Pokrýváme Major turnaje, tier 1 ligy a vybrané tier 2 soutěže. Map pool analýzy, roster changes, meta shifty.',
    features: [
      { icon: 'signal', title: '2–5 signálů denně', description: 'CS2, LoL, Dota 2 a Valorant tipy na mapy, handicap a moneyline.' },
      { icon: 'chart-pie', title: '88 % přesnost', description: 'Esport signály s map pool a roster change analýzou.' },
      { icon: 'globe', title: '4 hry', description: 'CS2, League of Legends, Dota 2 a Valorant — tier 1 turnaje a ligy.' },
    ],
    logos: ['🎮', '⌨️', '🖱️', '🏆', '🎯', '🕹️', '🎮'],
  },
];

export interface MockForumThread {
  id: string;
  categoryId: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  pinned?: boolean;
}

export const MOCK_FORUM_THREADS: MockForumThread[] = [
  { id: 't1', categoryId: '1', title: 'Arsenal vs Chelsea — preview a tipy', author: 'MarekT', replies: 24, views: 412, lastReply: 'před 12 min', pinned: true },
  { id: 't2', categoryId: '1', title: 'Dnešní NHL — Colorado vs Tampa', author: 'IceKingHockey', replies: 8, views: 156, lastReply: 'před 45 min' },
  { id: 't3', categoryId: '1', title: 'NBA night — Lakers vs Celtics analýza', author: 'NBAInsider', replies: 15, views: 289, lastReply: 'před 2 hod' },
  { id: 't4', categoryId: '2', title: 'PL sezóna 26/27 — predikce a value bety', author: 'DavidK', replies: 67, views: 1240, lastReply: 'před 1 hod', pinned: true },
  { id: 't5', categoryId: '2', title: 'Bundesliga — over/under trendy', author: 'ValueHunter', replies: 31, views: 567, lastReply: 'před 4 hod' },
  { id: 't6', categoryId: '2', title: 'Chance Liga — kdo postoupí do Evropy?', author: 'SpartaFan', replies: 42, views: 890, lastReply: 'před 6 hod' },
  { id: 't7', categoryId: '3', title: 'NHL offseason moves — dopad na odds', author: 'PetrV', replies: 19, views: 345, lastReply: 'před 3 hod' },
  { id: 't8', categoryId: '3', title: 'Extraliga play-off — formální analýza', author: 'IceKingHockey', replies: 12, views: 234, lastReply: 'před 8 hod' },
  { id: 't9', categoryId: '4', title: 'Wimbledon 2026 — value bety na surface', author: 'JakubH', replies: 28, views: 478, lastReply: 'před 5 hod' },
  { id: 't10', categoryId: '4', title: 'NBA playoffs — injury report vliv na spread', author: 'NBAInsider', replies: 16, views: 312, lastReply: 'před 1 den' },
  { id: 't11', categoryId: '5', title: 'CS2 Major Copenhagen — skupiny a tipy', author: 'LukasN', replies: 35, views: 620, lastReply: 'před 8 hod', pinned: true },
  { id: 't12', categoryId: '5', title: 'LoL LEC — G2 vs Fnatic preview', author: 'EsportGuru', replies: 9, views: 178, lastReply: 'před 12 hod' },
  { id: 't13', categoryId: '6', title: 'Flat vs Kelly — co funguje lépe?', author: 'MartinP', replies: 54, views: 980, lastReply: 'před 1 den', pinned: true },
  { id: 't14', categoryId: '6', title: 'Bankroll management pro začátečníky', author: 'SafeBettor', replies: 22, views: 445, lastReply: 'před 2 dny' },
];
