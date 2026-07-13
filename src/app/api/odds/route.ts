import { NextRequest, NextResponse } from 'next/server';
import { getOdds } from '@/lib/api/odds';

export async function GET(request: NextRequest) {
  const sport = request.nextUrl.searchParams.get('sport') ?? 'soccer_epl';

  try {
    const odds = await getOdds(sport);
    return NextResponse.json(odds);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch odds' }, { status: 500 });
  }
}
