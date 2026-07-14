'use client';

import { useCallback, useEffect, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FilterButton } from '@/components/ui/FilterButton';
import { ODDS_SPORTS } from '@/lib/api/odds-comparison';
import type { OddsComparisonResult, OddsEventSummary } from '@/lib/api/odds-comparison';

export default function KurzyClient() {
  const [sport, setSport] = useState('soccer_epl');
  const [query, setQuery] = useState('');
  const [tip, setTip] = useState('');
  const [events, setEvents] = useState<OddsEventSummary[]>([]);
  const [comparison, setComparison] = useState<OddsComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const fetchEvents = useCallback(async (search: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ sport });
      if (search) params.set('q', search);
      const res = await fetch(`/api/odds/compare?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Chyba při načítání zápasů');
      setEvents(data.events ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chyba při načítání');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [sport]);

  const compare = useCallback(async (eventId?: string, searchQuery?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ sport });
      if (eventId) {
        params.set('eventId', eventId);
      } else if (searchQuery) {
        params.set('q', searchQuery);
        params.set('compare', '1');
      }
      if (tip) params.set('tip', tip);

      const res = await fetch(`/api/odds/compare?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Chyba při porovnávání kurzů');

      if (data.events) setEvents(data.events);
      setComparison(data.comparison ?? null);
      if (!data.comparison) {
        setError('Pro tento zápas nejsou dostupné kurzy. Zkus jiný zápas nebo sport.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chyba při porovnávání');
      setComparison(null);
    } finally {
      setLoading(false);
    }
  }, [sport, tip]);

  useEffect(() => {
    fetchEvents('');
  }, [fetchEvents]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedEventId(null);
    setComparison(null);
    fetchEvents(query.trim().length >= 2 ? query.trim() : '');
  };

  const handleCompare = () => {
    if (selectedEventId) {
      compare(selectedEventId);
      return;
    }
    if (query.trim().length >= 2) {
      compare(undefined, query.trim());
    }
  };

  return (
    <section className="page-section">
      <div className="max-w-[1100px] mx-auto px-6">
        <SectionLabel>Nástroje</SectionLabel>
        <h2 className="section-title">
          POROVNÁNÍ <span className="accent">KURZŮ</span>
        </h2>
        <p className="section-desc mb-8">
          Zadej zápas nebo tip a porovnej kurzy napříč českými a evropskými sázkovkami (Tipico, Betsson, Unibet, Pinnacle…). Data v reálném čase přes The Odds API.
        </p>

        <div className="flex gap-3 flex-wrap mb-6">
          {ODDS_SPORTS.map((s) => (
            <FilterButton
              key={s.key}
              label={s.label}
              active={sport === s.key}
              onClick={() => {
                setSport(s.key);
                setComparison(null);
                setSelectedEventId(null);
              }}
            />
          ))}
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[0.75rem] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Zápas nebo týmy
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="např. Arsenal Chelsea, Sparta Slavia..."
              className="w-full bg-dark-card border border-gray-700 rounded px-4 py-3 text-white outline-none focus:border-green"
            />
          </div>
          <div>
            <label className="block text-[0.75rem] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Tip / trh (volitelné)
            </label>
            <input
              type="text"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              placeholder="např. Over 2.5, Under 215.5, handicap..."
              className="w-full bg-dark-card border border-gray-700 rounded px-4 py-3 text-white outline-none focus:border-green"
            />
          </div>
        </form>

        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={() => {
              setSelectedEventId(null);
              setComparison(null);
              fetchEvents(query.trim().length >= 2 ? query.trim() : '');
            }}
            className="btn-outline"
            disabled={loading}
          >
            Hledat zápasy
          </button>
          <button type="button" onClick={handleCompare} className="btn-primary" disabled={loading}>
            {loading ? 'Načítám…' : 'Porovnat kurzy'}
          </button>
        </div>

        {error && (
          <div className="bg-red/10 border border-red/30 text-red rounded p-4 mb-6 text-[0.9rem]">
            {error}
          </div>
        )}

        {events.length > 0 && !comparison && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Nalezené zápasy</h3>
            <div className="space-y-2">
              {events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => {
                    setSelectedEventId(event.id);
                    setQuery(`${event.homeTeam} ${event.awayTeam}`);
                    compare(event.id);
                  }}
                  className={`w-full text-left p-4 rounded border transition-all ${
                    selectedEventId === event.id
                      ? 'border-green bg-green/5'
                      : 'border-gray-700 bg-dark-card hover:border-green'
                  }`}
                >
                  <div className="font-semibold">{event.homeTeam} vs {event.awayTeam}</div>
                  <div className="text-[0.8rem] text-gray-400 mt-1">
                    {event.sportTitle} · {new Date(event.commenceTime).toLocaleString('cs-CZ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {comparison && (
          <div className="bg-dark-card border border-gray-700 rounded p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold">
                {comparison.event.homeTeam} vs {comparison.event.awayTeam}
              </h3>
              <p className="text-gray-400 text-[0.85rem] mt-1">
                {comparison.marketLabel} · {comparison.event.sportTitle} · aktualizováno{' '}
                {new Date(comparison.updatedAt).toLocaleTimeString('cs-CZ')}
              </p>
            </div>

            {comparison.outcomes.length === 0 ? (
              <p className="text-gray-400">Pro vybraný trh nejsou dostupné kurzy.</p>
            ) : (
              <div className="space-y-6">
                {comparison.outcomes.map((outcome) => (
                  <div key={outcome.name}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-green">{outcome.name}</h4>
                      <span className="text-[0.8rem] text-gray-400">
                        Nejlepší: <strong className="text-white">{outcome.bestBookmaker}</strong> ({outcome.bestOdds.toFixed(2)})
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {outcome.bookmakerOdds.map((row) => (
                        <div
                          key={`${outcome.name}-${row.bookmakerKey}`}
                          className={`p-3 rounded text-center border ${
                            row.isBest
                              ? 'border-green bg-green/10'
                              : 'border-gray-700 bg-gray-900/40'
                          }`}
                        >
                          <div className="text-[0.7rem] text-gray-400 uppercase mb-1">{row.bookmaker}</div>
                          <div className={`text-lg font-extrabold ${row.isBest ? 'text-green' : 'text-white'}`}>
                            {row.odds.toFixed(2)}
                          </div>
                          {row.isBest && (
                            <div className="text-[0.65rem] text-green font-bold mt-1">NEJLEPŠÍ</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[0.75rem] text-gray-500 mt-6">
              Zdroj: The Odds API · Tipico, Betsson, NordicBet, Unibet, Pinnacle, 1xBet a další. Tipsport/Fortuna budou doplněny, až bude dostupné API.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
