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
