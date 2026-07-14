import { NextRequest, NextResponse } from 'next/server';
import {
  compareOdds,
  compareOddsByQuery,
  isOddsApiConfigured,
  searchOddsEvents,
  type OddsMarket,
} from '@/lib/api/odds-comparison';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sport = searchParams.get('sport') ?? 'soccer_epl';
  const query = searchParams.get('q')?.trim() ?? '';
  const eventId = searchParams.get('eventId')?.trim();
  const tip = searchParams.get('tip')?.trim();
  const market = (searchParams.get('market') ?? 'h2h') as OddsMarket;

  if (!isOddsApiConfigured()) {
    return NextResponse.json(
      {
        error: 'API_NOT_CONFIGURED',
        message: 'Chybí THE_ODDS_API_KEY. Přidej klíč na the-odds-api.com a nastav ho ve Vercel → Environment Variables.',
      },
      { status: 503 }
    );
  }

  try {
    if (eventId) {
      const comparison = await compareOdds(sport, eventId, market, tip);
      if (!comparison) {
        return NextResponse.json({ error: 'EVENT_NOT_FOUND', message: 'Zápas nebyl nalezen.' }, { status: 404 });
      }
      return NextResponse.json({ comparison });
    }

    if (query.length >= 2) {
      const events = await searchOddsEvents(sport, query);

      if (searchParams.get('compare') === '1') {
        const comparison = await compareOddsByQuery(sport, query, tip);
        return NextResponse.json({ events, comparison });
      }

      return NextResponse.json({ events });
    }

    const events = await searchOddsEvents(sport, '');
    return NextResponse.json({ events: events.slice(0, 12) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Nepodařilo se načíst kurzy.';
    return NextResponse.json({ error: 'ODDS_API_ERROR', message }, { status: 502 });
  }
}
