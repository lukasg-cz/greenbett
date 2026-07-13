import type { Match } from '@/types';
import { MOCK_MATCHES } from './mock-data';

// TODO: Replace mock data with real API call — uncomment block above and delete mock data below
/*
export async function getLiveAmericanFootballMatches(): Promise<Match[]> {
  const response = await fetch(
    'https://v1.american-football.api-sports.io/games?live=all',
    {
      headers: { 'x-apisports-key': process.env.API_FOOTBALL_KEY! },
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  return data.response.map(mapAmericanFootballGame);
}
*/

export async function getLiveAmericanFootballMatches(): Promise<Match[]> {
  return MOCK_MATCHES.filter((m) => m.sport === 'amfootball');
}
