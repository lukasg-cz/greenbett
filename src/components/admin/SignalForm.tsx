'use client';

import { useState } from 'react';
import type { Sport } from '@/types';

interface SignalFormData {
  sport: Sport;
  league: string;
  matchHome: string;
  matchAway: string;
  market: string;
  odds: number;
  confidence: number;
  unitSize: number;
  kickoffAt: string;
}

interface SignalFormProps {
  onSubmit: (data: SignalFormData) => Promise<void>;
}

export function SignalForm({ onSubmit }: SignalFormProps) {
  const [form, setForm] = useState<SignalFormData>({
    sport: 'football',
    league: '',
    matchHome: '',
    matchAway: '',
    market: '',
    odds: 1.5,
    confidence: 7,
    unitSize: 1,
    kickoffAt: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  const inputClass = 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat text-sm focus:outline-none focus:border-green';

  return (
    <form onSubmit={handleSubmit} className="bg-dark-card border border-gray-700 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-bold mb-2">Nový signál</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Sport</label>
          <select
            value={form.sport}
            onChange={(e) => setForm({ ...form, sport: e.target.value as Sport })}
            className={inputClass}
          >
            <option value="football">Fotbal</option>
            <option value="hockey">Hokej</option>
            <option value="basketball">Basketbal</option>
            <option value="tennis">Tenis</option>
            <option value="baseball">Baseball</option>
            <option value="amfootball">Am. fotbal</option>
            <option value="esports">Esporty</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Liga</label>
          <input value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Domácí</label>
          <input value={form.matchHome} onChange={(e) => setForm({ ...form, matchHome: e.target.value })} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Hosté</label>
          <input value={form.matchAway} onChange={(e) => setForm({ ...form, matchAway: e.target.value })} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Trh</label>
          <input value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Kurz</label>
          <input type="number" step="0.01" value={form.odds} onChange={(e) => setForm({ ...form, odds: parseFloat(e.target.value) })} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Confidence: {form.confidence}/10</label>
          <input type="range" min="1" max="10" step="0.1" value={form.confidence} onChange={(e) => setForm({ ...form, confidence: parseFloat(e.target.value) })} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Unit size</label>
          <input type="number" step="0.5" value={form.unitSize} onChange={(e) => setForm({ ...form, unitSize: parseFloat(e.target.value) })} className={inputClass} />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Výkop</label>
          <input type="datetime-local" value={form.kickoffAt} onChange={(e) => setForm({ ...form, kickoffAt: e.target.value })} className={inputClass} />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Vytváření...' : 'Vytvořit signál'}
      </button>
    </form>
  );
}
