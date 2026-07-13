'use client';

import { useState } from 'react';
import { SignalForm } from '@/components/admin/SignalForm';
import { SignalList } from '@/components/admin/SignalList';
import { MOCK_SIGNALS } from '@/lib/api/mock-data';
import type { Signal } from '@/types';

export default function AdminPage() {
  const [signals, setSignals] = useState<Signal[]>(MOCK_SIGNALS);

  const handleCreate = async (data: {
    sport: Signal['sport'];
    league: string;
    matchHome: string;
    matchAway: string;
    market: string;
    odds: number;
    confidence: number;
    unitSize: number;
    kickoffAt: string;
  }) => {
    const response = await fetch('/api/signals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newSignal: Signal = await response.json();
      setSignals([newSignal, ...signals]);
    } else {
      const newSignal: Signal = {
        id: String(Date.now()),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setSignals([newSignal, ...signals]);
    }
  };

  const handleResolve = async (id: string, status: 'win' | 'loss' | 'void') => {
    setSignals(signals.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-2xl font-extrabold uppercase mb-8">Admin Panel</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SignalForm onSubmit={handleCreate} />
          <SignalList signals={signals} onResolve={handleResolve} />
        </div>
      </div>
    </section>
  );
}
