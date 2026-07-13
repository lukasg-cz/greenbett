import { NextResponse } from 'next/server';
import { MOCK_LEADERBOARD } from '@/lib/api/mock-data';

export async function GET() {
  return NextResponse.json(MOCK_LEADERBOARD);
}
