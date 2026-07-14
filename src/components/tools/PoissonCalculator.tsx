'use client';

import { useMemo, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import {
  calculatePoisson,
  formatPercent,
  getScoreMatrix,
  validatePoissonInput,
  type PoissonResult,
} from '@/lib/calculations/poisson';

const DEFAULTS = {
  lambdaHome: 1.5,
  lambdaAway: 1.3,
  maxGoals: 5,
};

const inputClass =
  'w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-sm text-white font-montserrat text-[0.9rem] font-semibold focus:outline-none focus:border-green transition-all';

function OutcomeBox({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg p-4 text-center border ${
        highlight ? 'border-green bg-green/10' : 'border-gray-700 bg-gray-900/40'
      }`}
    >
      <div className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 mb-2">{label}</div>
      <div className={`text-2xl font-extrabold ${highlight ? 'text-green' : 'text-white'}`}>
        {formatPercent(value)}
      </div>
    </div>
  );
}

function ScoreHeatmap({ result, maxGoals }: { result: PoissonResult; maxGoals: number }) {
  const matrix = getScoreMatrix(result.scores, maxGoals);
  const maxProb = Math.max(...matrix.flat(), 0.0001);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-10" />
            {Array.from({ length: maxGoals + 1 }, (_, a) => (
              <th key={a} className="text-center text-[0.65rem] font-bold text-gray-500 pb-1">
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxGoals + 1 }, (_, h) => (
            <tr key={h}>
              <td className="text-right pr-2 text-[0.65rem] font-bold text-gray-500">{h}</td>
              {Array.from({ length: maxGoals + 1 }, (_, a) => {
                const prob = matrix[h][a];
                const intensity = prob / maxProb;
                const isMode =
                  result.mostLikelyScore.homeGoals === h &&
                  result.mostLikelyScore.awayGoals === a;
                return (
                  <td key={a} className="p-0">
                    <div
                      className={`rounded p-2 text-center border h-full ${
                        isMode ? 'border-green ring-1 ring-green/50' : 'border-gray-800'
                      }`}
                      style={{ backgroundColor: `rgba(57, 255, 20, ${0.08 + intensity * 0.45})` }}
                    >
                      <div className="text-[0.7rem] font-bold text-white">
                        {h}:{a}
                      </div>
                      <div className={`text-[0.65rem] ${isMode ? 'text-green font-bold' : 'text-gray-400'}`}>
                        {formatPercent(prob, 1)}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[0.72rem] text-gray-500 mt-3">
        Osa Y = góly domácích · Osa X = góly hostů
      </p>
    </div>
  );
}

export function PoissonCalculator() {
  const [lambdaHome, setLambdaHome] = useState(DEFAULTS.lambdaHome);
  const [lambdaAway, setLambdaAway] = useState(DEFAULTS.lambdaAway);
  const [maxGoals, setMaxGoals] = useState(DEFAULTS.maxGoals);

  const validationError = useMemo(
    () => validatePoissonInput({ lambdaHome, lambdaAway, maxGoals }),
    [lambdaHome, lambdaAway, maxGoals]
  );

  const result = useMemo(() => {
    if (validationError) return null;
    return calculatePoisson({ lambdaHome, lambdaAway, maxGoals });
  }, [lambdaHome, lambdaAway, maxGoals, validationError]);

  const highLambdaWarning = lambdaHome > 4 || lambdaAway > 4;

  const handleReset = () => {
    setLambdaHome(DEFAULTS.lambdaHome);
    setLambdaAway(DEFAULTS.lambdaAway);
    setMaxGoals(DEFAULTS.maxGoals);
  };

  const bttsFavored = result
    ? result.btts.bothScoreYes >= result.btts.bothScoreNo
      ? 'yes'
      : 'no'
    : 'yes';

  const outcomeHighlight = result
    ? (['homeWin', 'draw', 'awayWin'] as const).reduce((best, key) =>
        result.outcomes[key] > result.outcomes[best] ? key : best
      , 'homeWin' as 'homeWin' | 'draw' | 'awayWin')
    : 'homeWin';

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Nástroj</SectionLabel>
        <h2 className="section-title">
          POISSON FOOTBALL <span className="accent">CALCULATOR</span>
        </h2>
        <p className="section-desc mb-10 max-w-[720px]">
          Poissonův model odhaduje pravděpodobnosti přesných skóre, výsledku 1X2, over/under a BTTS
          na základě očekávaných gólů domácích a hostů (λ).
        </p>

        <div className="lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 mb-8">
          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 md:p-8">
            <h3 className="text-white font-bold text-[1rem] mb-6 uppercase tracking-wider">Vstupy</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Očekávané góly domácích (λ)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={lambdaHome}
                  onChange={(e) => setLambdaHome(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Očekávané góly hostů (λ)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={lambdaAway}
                  onChange={(e) => setLambdaAway(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[0.78rem] font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Max gólů v matici ({maxGoals})
              </label>
              <input
                type="range"
                min={3}
                max={8}
                step={1}
                value={maxGoals}
                onChange={(e) => setMaxGoals(parseInt(e.target.value, 10))}
                className="w-full accent-green"
              />
              <div className="flex justify-between text-[0.7rem] text-gray-500 mt-1">
                <span>3</span>
                <span>8</span>
              </div>
            </div>

            {validationError && (
              <p className="text-red text-[0.85rem] mb-4">{validationError}</p>
            )}
            {highLambdaWarning && !validationError && (
              <p className="text-yellow text-[0.85rem] mb-4">
                λ &gt; 4 — model je méně realistický pro extrémně ofenzivní zápasy. Výsledky ber s rezervou.
              </p>
            )}

            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                className="btn-primary"
                onClick={() => document.getElementById('poisson-results')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Spočítat
              </button>
              <button type="button" className="btn-outline" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>

          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 md:p-8">
            <h3 className="text-white font-bold text-[1rem] mb-6 uppercase tracking-wider">Shrnutí</h3>

            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <OutcomeBox
                    label="Home win"
                    value={result.outcomes.homeWin}
                    highlight={outcomeHighlight === 'homeWin'}
                  />
                  <OutcomeBox
                    label="Draw"
                    value={result.outcomes.draw}
                    highlight={outcomeHighlight === 'draw'}
                  />
                  <OutcomeBox
                    label="Away win"
                    value={result.outcomes.awayWin}
                    highlight={outcomeHighlight === 'awayWin'}
                  />
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <div className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Nejpravděpodobnější skóre
                  </div>
                  <div className="text-xl font-extrabold text-green">
                    {result.mostLikelyScore.homeGoals}:{result.mostLikelyScore.awayGoals}{' '}
                    <span className="text-white text-base font-semibold">
                      ({formatPercent(result.mostLikelyScore.probability)})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`rounded-lg p-4 border text-center ${
                      bttsFavored === 'yes' ? 'border-green bg-green/10' : 'border-gray-700'
                    }`}
                  >
                    <div className="text-[0.68rem] font-bold uppercase text-gray-400 mb-1">BTTS ano</div>
                    <div className="text-lg font-extrabold text-white">
                      {formatPercent(result.btts.bothScoreYes)}
                    </div>
                  </div>
                  <div
                    className={`rounded-lg p-4 border text-center ${
                      bttsFavored === 'no' ? 'border-green bg-green/10' : 'border-gray-700'
                    }`}
                  >
                    <div className="text-[0.68rem] font-bold uppercase text-gray-400 mb-1">BTTS ne</div>
                    <div className="text-lg font-extrabold text-white">
                      {formatPercent(result.btts.bothScoreNo)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-[0.9rem]">Oprav vstupy pro zobrazení výsledků.</p>
            )}
          </div>
        </div>

        {result && (
          <div id="poisson-results">
            <div className="bg-dark-card border border-gray-700 rounded-lg p-6 md:p-8 mb-8">
              <h3 className="text-white font-bold text-[1rem] mb-6 uppercase tracking-wider">
                Pravděpodobnost přesného skóre
              </h3>
              <ScoreHeatmap result={result} maxGoals={maxGoals} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8">
              <div className="bg-dark-card border border-gray-700 rounded-lg p-6 md:p-8">
                <h3 className="text-white font-bold text-[1rem] mb-6 uppercase tracking-wider">
                  Over / under pravděpodobnosti
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-1">
                    <thead>
                      <tr>
                        {['Line', 'Over', 'Under'].map((col) => (
                          <th
                            key={col}
                            className="text-left px-3 py-2 text-[0.68rem] font-bold uppercase tracking-wider text-gray-400"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.overUnder.map((row) => {
                        const highlight = row.over > 0.6 || row.under > 0.6;
                        const overFavored = row.over >= row.under;
                        return (
                          <tr
                            key={row.line}
                            className={`${highlight ? 'bg-green/5' : 'bg-gray-900/30'} rounded`}
                          >
                            <td className="px-3 py-3 font-semibold text-white">{row.line}</td>
                            <td
                              className={`px-3 py-3 font-bold ${
                                highlight && overFavored ? 'text-green' : 'text-white'
                              }`}
                            >
                              {formatPercent(row.over)}
                            </td>
                            <td
                              className={`px-3 py-3 font-bold ${
                                highlight && !overFavored ? 'text-green' : 'text-gray-300'
                              }`}
                            >
                              {formatPercent(row.under)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-dark-card border border-gray-700 rounded-lg p-6 md:p-8">
                <h3 className="text-white font-bold text-[1rem] mb-6 uppercase tracking-wider">
                  BTTS detail
                </h3>
                <div className="space-y-5">
                  {[
                    { label: 'Oba týmy skórují — ANO', value: result.btts.bothScoreYes, favored: bttsFavored === 'yes' },
                    { label: 'Oba týmy skórují — NE', value: result.btts.bothScoreNo, favored: bttsFavored === 'no' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[0.82rem] mb-2">
                        <span className={item.favored ? 'text-green font-semibold' : 'text-gray-300'}>
                          {item.label}
                        </span>
                        <span className="font-bold text-white">{formatPercent(item.value)}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            item.favored ? 'bg-green' : 'bg-gray-600'
                          }`}
                          style={{ width: `${item.value * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[0.75rem] text-gray-500 mt-6 leading-relaxed">
                  Model předpokládá nezávislost gólů obou týmů. Pro pokročilé modelování viz{' '}
                  <a href="/skola/modely-pravdepodobnosti" className="text-green hover:underline">
                    kurz Poisson model
                  </a>{' '}
                  ve Škole sázení.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
