import { NextResponse } from 'next/server';
import { MOCK_MATCHES } from '@/lib/api/mock-data';
import { getLiveFootballMatches } from '@/lib/api/football';
import { getLiveHockeyMatches } from '@/lib/api/hockey';
import { getLiveBasketballMatches } from '@/lib/api/basketball';

export async function GET() {
  try {
    const [football, hockey, basketball] = await Promise.all([
      getLiveFootballMatches(),
      getLiveHockeyMatches(),
      getLiveBasketballMatches(),
    ]);

    const matches = [...football, ...hockey, ...basketball];

    if (matches.length === 0) {
      return NextResponse.json(MOCK_MATCHES);
    }

    return NextResponse.json(matches);
  } catch {
    return NextResponse.json(MOCK_MATCHES);
  }
}
