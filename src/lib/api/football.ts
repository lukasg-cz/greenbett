import type { Match } from '@/types';
import { MOCK_MATCHES } from './mock-data';

export interface FootballFixture {
  fixture: { id: number; status: { short: string; elapsed: number | null } };
  league: { name: string };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
}

// TODO: Replace mock data with real API call — uncomment block above and delete mock data below
/*
export async function getLiveFootballMatches(): Promise<Match[]> {
  const response = await fetch(
    'https://v3.football.api-sports.io/fixtures?live=all',
    {
      headers: { 'x-apisports-key': process.env.API_FOOTBALL_KEY! },
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  return data.response.map(mapFootballFixture);
}

function mapFootballFixture(fixture: FootballFixture): Match {
  const live = fixture.fixture.status.short === '1H' || fixture.fixture.status.short === '2H';
  return {
    apiId: String(fixture.fixture.id),
    league: fixture.league.name,
    home: fixture.teams.home.name,
    away: fixture.teams.away.name,
    homeIcon: '⚽',
    awayIcon: '⚽',
    score: fixture.goals.home !== null
      ? `${fixture.goals.home} : ${fixture.goals.away}`
      : '— : —',
    time: live ? `${fixture.fixture.status.elapsed}'` : 'TBD',
    live,
    sport: 'football',
    odds: ['—', '—', '—'],
  };
}
*/

export async function getLiveFootballMatches(): Promise<Match[]> {
  return MOCK_MATCHES.filter((m) => m.sport === 'football');
}
