const CZ_BOOKMAKER_KEYS = [
  'tipico_de',
  'betsson',
  'nordicbet',
  'unibet_nl',
  'unibet_se',
  'pinnacle',
  'onexbet',
  'marathonbet',
  'coolbet',
  'williamhill',
] as const;

export const CZ_BOOKMAKER_LABELS: Record<string, string> = {
  tipico_de: 'Tipico',
  betsson: 'Betsson',
  nordicbet: 'NordicBet',
  unibet_nl: 'Unibet',
  unibet_se: 'Unibet',
  unibet_fr: 'Unibet',
  unibet_it: 'Unibet',
  pinnacle: 'Pinnacle',
  onexbet: '1xBet',
  marathonbet: 'Marathonbet',
  coolbet: 'Coolbet',
  williamhill: 'William Hill',
  betfair_ex_eu: 'Betfair',
  sport888: '888sport',
};

export const ODDS_SPORTS = [
  { key: 'soccer_epl', label: '⚽ Premier League' },
  { key: 'soccer_germany_bundesliga', label: '⚽ Bundesliga' },
  { key: 'soccer_spain_la_liga', label: '⚽ La Liga' },
  { key: 'soccer_italy_serie_a', label: '⚽ Serie A' },
  { key: 'soccer_france_ligue_one', label: '⚽ Ligue 1' },
  { key: 'soccer_uefa_champs_league', label: '⚽ Champions League' },
  { key: 'soccer_uefa_europa_league', label: '⚽ Europa League' },
  { key: 'icehockey_nhl', label: '🏒 NHL' },
  { key: 'basketball_nba', label: '🏀 NBA' },
  { key: 'tennis_atp_french_open', label: '🎾 Tennis ATP' },
] as const;

export type OddsMarket = 'h2h' | 'totals' | 'spreads';

export interface OddsApiEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    title: string;
    last_update: string;
    markets: Array<{
      key: string;
      outcomes: Array<{ name: string; price: number; point?: number }>;
    }>;
  }>;
}

export interface OddsEventSummary {
  id: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  sportKey: string;
  sportTitle: string;
}

export interface OutcomeComparison {
  name: string;
  point?: number;
  bookmakerOdds: Array<{
    bookmakerKey: string;
    bookmaker: string;
    odds: number;
    isBest: boolean;
  }>;
  bestOdds: number;
  bestBookmaker: string;
}

export interface OddsComparisonResult {
  event: OddsEventSummary;
  market: OddsMarket;
  marketLabel: string;
  outcomes: OutcomeComparison[];
  updatedAt: string;
}

function getApiKey(): string | undefined {
  return process.env.THE_ODDS_API_KEY;
}

export function isOddsApiConfigured(): boolean {
  return Boolean(getApiKey());
}

function bookmakerLabel(key: string): string {
  return CZ_BOOKMAKER_LABELS[key] ?? key.replace(/_/g, ' ');
}

function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function matchesQuery(event: OddsApiEvent, query: string): boolean {
  const q = normalizeSearch(query);
  if (!q) return true;
  const haystack = normalizeSearch(`${event.home_team} ${event.away_team}`);
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((token) => haystack.includes(token));
}

async function fetchOddsFromApi(sportKey: string): Promise<OddsApiEvent[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('THE_ODDS_API_KEY není nastaven. Přidej klíč do Vercel env a .env.local.');
  }

  const bookmakers = CZ_BOOKMAKER_KEYS.join(',');
  const url = new URL(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`);
  url.searchParams.set('apiKey', apiKey);
  url.searchParams.set('regions', 'eu');
  url.searchParams.set('bookmakers', bookmakers);
  url.searchParams.set('markets', 'h2h,totals,spreads');
  url.searchParams.set('oddsFormat', 'decimal');

  const response = await fetch(url.toString(), { next: { revalidate: 120 } });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`The Odds API error ${response.status}: ${body.slice(0, 200)}`);
  }

  return response.json() as Promise<OddsApiEvent[]>;
}

export async function searchOddsEvents(sportKey: string, query: string): Promise<OddsEventSummary[]> {
  const events = await fetchOddsFromApi(sportKey);
  return events
    .filter((event) => matchesQuery(event, query))
    .slice(0, 20)
    .map((event) => ({
      id: event.id,
      homeTeam: event.home_team,
      awayTeam: event.away_team,
      commenceTime: event.commence_time,
      sportKey: event.sport_key,
      sportTitle: event.sport_title,
    }));
}

function parseTipQuery(tip: string): { market: OddsMarket; point?: number; side?: 'over' | 'under' } {
  const q = normalizeSearch(tip);
  const overMatch = q.match(/over\s*([\d.]+)/);
  if (overMatch) return { market: 'totals', point: parseFloat(overMatch[1]), side: 'over' };
  const underMatch = q.match(/under\s*([\d.]+)/);
  if (underMatch) return { market: 'totals', point: parseFloat(underMatch[1]), side: 'under' };
  if (q.includes('handicap') || q.includes('spread')) return { market: 'spreads' };
  return { market: 'h2h' };
}

function marketLabel(market: OddsMarket): string {
  if (market === 'h2h') return 'Výsledek zápasu (1X2)';
  if (market === 'totals') return 'Over/Under';
  return 'Handicap';
}

function filterOutcomes(
  outcomes: Array<{ name: string; price: number; point?: number }>,
  market: OddsMarket,
  tip?: string
) {
  if (!tip || market !== 'totals') return outcomes;
  const parsed = parseTipQuery(tip);
  if (parsed.point === undefined) return outcomes;
  return outcomes.filter((o) => {
    const name = normalizeSearch(o.name);
    const hasPoint = o.point === parsed.point || Math.abs((o.point ?? 0) - parsed.point) < 0.01;
    if (!hasPoint) return false;
    if (parsed.side === 'over') return name.includes('over');
    if (parsed.side === 'under') return name.includes('under');
    return true;
  });
}

function buildComparison(
  event: OddsApiEvent,
  market: OddsMarket,
  tip?: string
): OddsComparisonResult {
  const outcomeMap = new Map<string, OutcomeComparison>();

  for (const bookmaker of event.bookmakers) {
    const marketData = bookmaker.markets.find((m) => m.key === market);
    if (!marketData) continue;

    const outcomes = filterOutcomes(marketData.outcomes, market, tip);

    for (const outcome of outcomes) {
      const key = `${outcome.name}|${outcome.point ?? ''}`;
      const label =
        outcome.point !== undefined
          ? `${outcome.name} ${outcome.point}`
          : outcome.name;

      if (!outcomeMap.has(key)) {
        outcomeMap.set(key, {
          name: label,
          point: outcome.point,
          bookmakerOdds: [],
          bestOdds: 0,
          bestBookmaker: '',
        });
      }

      const entry = outcomeMap.get(key)!;
      entry.bookmakerOdds.push({
        bookmakerKey: bookmaker.key,
        bookmaker: bookmakerLabel(bookmaker.key),
        odds: outcome.price,
        isBest: false,
      });
    }
  }

  const outcomes = Array.from(outcomeMap.values()).map((outcome) => {
    const sorted = [...outcome.bookmakerOdds].sort((a, b) => b.odds - a.odds);
    const best = sorted[0];
    return {
      ...outcome,
      bookmakerOdds: sorted.map((row) => ({
        ...row,
        isBest: row.bookmakerKey === best?.bookmakerKey,
      })),
      bestOdds: best?.odds ?? 0,
      bestBookmaker: best?.bookmaker ?? '',
    };
  });

  return {
    event: {
      id: event.id,
      homeTeam: event.home_team,
      awayTeam: event.away_team,
      commenceTime: event.commence_time,
      sportKey: event.sport_key,
      sportTitle: event.sport_title,
    },
    market,
    marketLabel: marketLabel(market),
    outcomes: outcomes.sort((a, b) => b.bestOdds - a.bestOdds),
    updatedAt: new Date().toISOString(),
  };
}

export async function compareOdds(
  sportKey: string,
  eventId: string,
  market: OddsMarket = 'h2h',
  tip?: string
): Promise<OddsComparisonResult | null> {
  const events = await fetchOddsFromApi(sportKey);
  const event = events.find((e) => e.id === eventId);
  if (!event) return null;

  const resolvedMarket = tip ? parseTipQuery(tip).market : market;
  return buildComparison(event, resolvedMarket, tip);
}

export async function compareOddsByQuery(
  sportKey: string,
  query: string,
  tip?: string
): Promise<OddsComparisonResult | null> {
  const events = await fetchOddsFromApi(sportKey);
  const event = events.find((e) => matchesQuery(e, query));
  if (!event) return null;

  const market = tip ? parseTipQuery(tip).market : 'h2h';
  return buildComparison(event, market, tip);
}
