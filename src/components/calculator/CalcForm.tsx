'use client';

import type { KellyStrategy } from '@/types';

interface CalcFormProps {
  bankroll: number;
  odds: number;
  probability: number;
  strategy: KellyStrategy;
  onBankrollChange: (v: number) => void;
  onOddsChange: (v: number) => void;
  onProbabilityChange: (v: number) => void;
  onStrategyChange: (v: KellyStrategy) => void;
}

export function CalcForm({
  bankroll,
  odds,
  probability,
  strategy,
  onBankrollChange,
  onOddsChange,
  onProbabilityChange,
  onStrategyChange,
}: CalcFormProps) {
  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-9">
      <div className="mb-5">
        <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Bankroll (Kč)
        </label>
        <input
          type="number"
          value={bankroll}
          onChange={(e) => onBankrollChange(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat text-[0.9rem] font-semibold focus:outline-none focus:border-green transition-all"
        />
      </div>
      <div className="mb-5">
        <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Kurz
        </label>
        <input
          type="number"
          step="0.01"
          value={odds}
          onChange={(e) => onOddsChange(parseFloat(e.target.value) || 1)}
          className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat text-[0.9rem] font-semibold focus:outline-none focus:border-green transition-all"
        />
      </div>
      <div className="mb-5">
        <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Odhadovaná pravděpodobnost (%)
        </label>
        <input
          type="number"
          step="1"
          value={probability}
          onChange={(e) => onProbabilityChange(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat text-[0.9rem] font-semibold focus:outline-none focus:border-green transition-all"
        />
      </div>
      <div>
        <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Strategie
        </label>
        <select
          value={strategy}
          onChange={(e) => onStrategyChange(e.target.value as KellyStrategy)}
          className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat text-[0.9rem] font-semibold focus:outline-none focus:border-green transition-all"
        >
          <option value="kelly">Full Kelly</option>
          <option value="halfkelly">Half Kelly (doporučeno)</option>
          <option value="quarterkelly">Quarter Kelly</option>
          <option value="flat">Flat staking (2%)</option>
        </select>
      </div>
    </div>
  );
}
