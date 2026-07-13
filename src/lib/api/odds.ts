import type { Odds } from '@/types';

export interface OddsApiResponse {
  id: string;
  sport_key: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    markets: Array<{
      key: string;
      outcomes: Array<{ name: string; price: number }>;
    }>;
  }>;
}

// TODO: Replace mock data with real API call — uncomment block above and delete mock data below
/*
export async function getOdds(sport: string): Promise<Odds[]> {
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${process.env.THE_ODDS_API_KEY}&regions=eu&markets=h2h`,
    { next: { revalidate: 300 } }
  );
  const data: OddsApiResponse[] = await response.json();
  return data.flatMap(mapOddsResponse);
}

function mapOddsResponse(event: OddsApiResponse): Odds[] {
  return event.bookmakers.flatMap((bookmaker) =>
    bookmaker.markets.flatMap((market) =>
      market.outcomes.map((outcome) => ({
        matchId: event.id,
        bookmaker: bookmaker.key,
        market: market.key,
        value: outcome.price,
      }))
    )
  );
}
*/

export async function getOdds(_sport: string): Promise<Odds[]> {
  return [
    { matchId: '1', bookmaker: 'tipsport', market: 'h2h', value: 2.10 },
    { matchId: '1', bookmaker: 'tipsport', market: 'h2h', value: 3.40 },
    { matchId: '1', bookmaker: 'tipsport', market: 'h2h', value: 3.20 },
  ];
}
