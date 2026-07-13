import { NextRequest, NextResponse } from 'next/server';
import { MOCK_LEAGUE_STATS } from '@/lib/api/mock-data';

export async function GET(request: NextRequest) {
  const sport = request.nextUrl.searchParams.get('sport');

  let stats = MOCK_LEAGUE_STATS;
  if (sport) {
    stats = stats.filter((s) => s.sport === sport);
  }

  return NextResponse.json(stats);
}
