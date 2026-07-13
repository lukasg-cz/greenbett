'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CalcForm } from '@/components/calculator/CalcForm';
import { CalcResultDisplay } from '@/components/calculator/CalcResult';
import { calculateKelly } from '@/lib/calculator';
import type { KellyStrategy } from '@/types';

export default function KalkulackaPage() {
  const [bankroll, setBankroll] = useState(10000);
  const [odds, setOdds] = useState(1.85);
  const [probability, setProbability] = useState(60);
  const [strategy, setStrategy] = useState<KellyStrategy>('halfkelly');

  const result = calculateKelly(bankroll, odds, probability, strategy);

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Nástroj</SectionLabel>
        <h2 className="section-title">
          BANKROLL <span className="accent">KALKULAČKA</span>
        </h2>
        <p className="section-desc mb-10">
          Vypočítej optimální stake podle Kelly criterion, flat staking nebo vlastní strategie.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CalcForm
            bankroll={bankroll}
            odds={odds}
            probability={probability}
            strategy={strategy}
            onBankrollChange={setBankroll}
            onOddsChange={setOdds}
            onProbabilityChange={setProbability}
            onStrategyChange={setStrategy}
          />
          <CalcResultDisplay result={result} />
        </div>
      </div>
    </section>
  );
}
