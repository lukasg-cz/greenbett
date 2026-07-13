import { NextRequest, NextResponse } from 'next/server';
import { MOCK_VALUE_BETS } from '@/lib/api/mock-data';

export async function GET(request: NextRequest) {
  const sport = request.nextUrl.searchParams.get('sport');
  const minEv = parseFloat(request.nextUrl.searchParams.get('minEv') ?? '0');

  let bets = MOCK_VALUE_BETS;

  if (sport && sport !== 'all') {
    bets = bets.filter((b) => b.sport === sport);
  }

  if (minEv > 0) {
    bets = bets.filter((b) => b.evPercent >= minEv);
  }

  return NextResponse.json(bets);
}
