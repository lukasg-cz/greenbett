import type { Match } from '@/types';
import { MOCK_MATCHES } from './mock-data';

// TODO: Replace mock data with real API call — uncomment block above and delete mock data below
/*
export async function getLiveEsportsMatches(): Promise<Match[]> {
  const response = await fetch(
    `https://api.pandascore.co/matches/running?token=${process.env.PANDASCORE_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();
  return data.map(mapEsportsMatch);
}
*/

export async function getLiveEsportsMatches(): Promise<Match[]> {
  return MOCK_MATCHES.filter((m) => m.sport === 'esports');
}
