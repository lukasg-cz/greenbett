import { NextRequest, NextResponse } from 'next/server';
import { MOCK_SIGNALS } from '@/lib/api/mock-data';
import { sendSignalToTelegram } from '@/lib/telegram/bot';
import type { Signal, Sport } from '@/types';

export async function GET() {
  return NextResponse.json(MOCK_SIGNALS);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      sport: Sport;
      league: string;
      matchHome: string;
      matchAway: string;
      market: string;
      odds: number;
      confidence: number;
      unitSize: number;
      kickoffAt?: string;
    };

    const newSignal: Signal = {
      id: crypto.randomUUID(),
      sport: body.sport,
      league: body.league,
      matchHome: body.matchHome,
      matchAway: body.matchAway,
      market: body.market,
      odds: body.odds,
      confidence: body.confidence,
      unitSize: body.unitSize,
      status: 'pending',
      kickoffAt: body.kickoffAt,
      createdAt: new Date().toISOString(),
    };

    // TODO: Insert into Supabase when configured
    /*
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('signals').insert({
      sport: body.sport,
      league: body.league,
      match_home: body.matchHome,
      match_away: body.matchAway,
      market: body.market,
      odds: body.odds,
      confidence: body.confidence,
      unit_size: body.unitSize,
      kickoff_at: body.kickoffAt,
    }).select().single();
    if (error) throw error;
    */

    await sendSignalToTelegram(newSignal);

    return NextResponse.json(newSignal, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create signal' }, { status: 500 });
  }
}
