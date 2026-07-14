'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  POISSON_DEFAULTS,
  calculatePoisson,
  formatDecimalInput,
  formatPercent,
  heatColor,
  parseDecimalInput,
  validatePoissonInput,
  type PoissonResult,
} from '@/lib/calculations/poisson';

const inputClass =
  'w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3.5 py-3 text-white text-base outline-none transition-colors focus:border-green';

function ResultBox({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className={`text-center py-4 px-2 rounded-[10px] border ${
        active ? 'border-green bg-green/[0.08]' : 'border-[#333] bg-[#1a1a1a]'
      }`}
    >
      <div className="text-[10px] uppercase text-[#888] mb-1.5 tracking-wider">{label}</div>
      <div className={`text-2xl font-extrabold ${active ? 'text-green' : 'text-white'}`}>{value}</div>
    </div>
  );
}

function ScoreMatrix({ result }: { result: PoissonResult }) {
  const { matrix, displayMaxGoals, maxProb } = result;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th />
            {Array.from({ length: displayMaxGoals + 1 }, (_, a) => (
              <th key={a} className="text-[13px] text-[#888] p-1.5 text-center font-semibold">
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: displayMaxGoals + 1 }, (_, h) => (
            <tr key={h}>
              <td className="text-[13px] text-[#888] p-1.5 text-center font-semibold w-[30px]">{h}</td>
              {Array.from({ length: displayMaxGoals + 1 }, (_, a) => {
                const prob = matrix[h][a];
                return (
                  <td key={a} className="p-0">
                    <div
                      className="text-center py-2.5 px-1.5 rounded-md min-w-[70px] transition-transform hover:scale-105"
                      style={{ backgroundColor: heatColor(prob, maxProb) }}
                    >
                      <div className="text-sm font-bold text-white">
                        {h}:{a}
                      </div>
                      <div className="text-[11px] text-white/70 mt-0.5">{formatPercent(prob)}</div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[#666] mt-2.5">Osa Y = góly domácích · Osa X = góly hostů</p>
    </div>
  );
}

export function PoissonCalculator() {
  const [lambdaHomeInput, setLambdaHomeInput] = useState(formatDecimalInput(POISSON_DEFAULTS.lambdaHome));
  const [lambdaAwayInput, setLambdaAwayInput] = useState(formatDecimalInput(POISSON_DEFAULTS.lambdaAway));
  const [maxGoals, setMaxGoals] = useState(POISSON_DEFAULTS.maxGoals);
  const [result, setResult] = useState<PoissonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const runCalculate = useCallback(() => {
    const lambdaHome = parseDecimalInput(lambdaHomeInput);
    const lambdaAway = parseDecimalInput(lambdaAwayInput);
    const validationError = validatePoissonInput({ lambdaHome, lambdaAway, maxGoals });

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setResult(calculatePoisson({ lambdaHome, lambdaAway, maxGoals }));
  }, [lambdaHomeInput, lambdaAwayInput, maxGoals]);

  const handleReset = () => {
    setLambdaHomeInput(formatDecimalInput(POISSON_DEFAULTS.lambdaHome));
    setLambdaAwayInput(formatDecimalInput(POISSON_DEFAULTS.lambdaAway));
    setMaxGoals(POISSON_DEFAULTS.maxGoals);
    setResult(null);
    setError(null);
  };

  useEffect(() => {
    setResult(
      calculatePoisson({
        lambdaHome: POISSON_DEFAULTS.lambdaHome,
        lambdaAway: POISSON_DEFAULTS.lambdaAway,
        maxGoals: POISSON_DEFAULTS.maxGoals,
      })
    );
  }, []);

  const outcomeHighlight = result
    ? (['homeWin', 'draw', 'awayWin'] as const).reduce(
        (best, key) => (result.outcomes[key] > result.outcomes[best] ? key : best),
        'homeWin' as 'homeWin' | 'draw' | 'awayWin'
      )
    : null;

  const bttsFavoredYes = result ? result.btts.bothScoreYes >= result.btts.bothScoreNo : true;
  const dash = '—';

  return (
    <section className="page-section">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="inline-flex items-center gap-1.5 bg-green/15 border border-green/40 rounded-full px-3.5 py-1 text-xs text-green uppercase tracking-wider mb-3 before:content-[''] before:w-2 before:h-2 before:bg-green before:rounded-full">
          Nástroj
        </div>
        <h1 className="text-[clamp(1.4rem,4vw,2rem)] font-black uppercase mb-2">
          Poisson Football <span className="text-green">Calculator</span>
        </h1>
        <p className="text-[#888] text-sm mb-8 leading-relaxed max-w-[720px]">
          Poissonův model odhaduje pravděpodobnosti přesných skóre, výsledku 1X2, over/under a BTTS na
          základě očekávaných gólů domácích a hostů (λ).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
            <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">Vstupy</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">
                  Očekávané góly domácích (λ)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={lambdaHomeInput}
                  onChange={(e) => setLambdaHomeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">
                  Očekávané góly hostů (λ)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={lambdaAwayInput}
                  onChange={(e) => setLambdaAwayInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[11px] uppercase text-[#888] mb-2.5 tracking-wide">
                Max gólů v matici ({maxGoals})
              </label>
              <input
                type="range"
                min={3}
                max={8}
                value={maxGoals}
                onChange={(e) => setMaxGoals(parseInt(e.target.value, 10))}
                className="w-full h-1.5 rounded bg-[#333] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green [&::-moz-range-thumb]:border-0"
              />
            </div>

            {error && <p className="text-red text-sm mb-4">{error}</p>}

            <div className="flex gap-3 flex-wrap">
              <button type="button" onClick={runCalculate} className="btn-primary text-sm py-2.5 px-7">
                Spočítat
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center px-7 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide bg-[#2a2a2a] text-[#e0e0e0] border border-[#444] hover:opacity-85 transition-opacity"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
            <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">Shrnutí</h2>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <ResultBox
                label="Home Win"
                value={result ? formatPercent(result.outcomes.homeWin) : dash}
                active={outcomeHighlight === 'homeWin'}
              />
              <ResultBox
                label="Draw"
                value={result ? formatPercent(result.outcomes.draw) : dash}
                active={outcomeHighlight === 'draw'}
              />
              <ResultBox
                label="Away Win"
                value={result ? formatPercent(result.outcomes.awayWin) : dash}
                active={outcomeHighlight === 'awayWin'}
              />
            </div>

            <div className="bg-[#1a1a1a] border border-[#333] rounded-[10px] px-4 py-3.5 mb-4">
              <div className="text-[10px] uppercase text-[#888] tracking-wider mb-1">
                Nejpravděpodobnější skóre
              </div>
              <div className="text-base font-bold">
                {result ? (
                  <>
                    <span className="text-white">
                      {result.mostLikelyScore.homeGoals}:{result.mostLikelyScore.awayGoals}
                    </span>{' '}
                    <span className="text-[#ccc]">
                      ({formatPercent(result.mostLikelyScore.probability)})
                    </span>
                  </>
                ) : (
                  dash
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className={`text-center py-3.5 px-2 rounded-[10px] border ${
                  result && bttsFavoredYes ? 'border-green bg-green/[0.08]' : 'border-[#333] bg-[#1a1a1a]'
                }`}
              >
                <div className="text-[10px] uppercase text-[#888] mb-1 tracking-wider">BTTS Ano</div>
                <div className={`text-[22px] font-extrabold ${result && bttsFavoredYes ? 'text-green' : 'text-white'}`}>
                  {result ? formatPercent(result.btts.bothScoreYes) : dash}
                </div>
              </div>
              <div
                className={`text-center py-3.5 px-2 rounded-[10px] border ${
                  result && !bttsFavoredYes ? 'border-green bg-green/[0.08]' : 'border-[#333] bg-[#1a1a1a]'
                }`}
              >
                <div className="text-[10px] uppercase text-[#888] mb-1 tracking-wider">BTTS Ne</div>
                <div className={`text-[22px] font-extrabold ${result && !bttsFavoredYes ? 'text-green' : 'text-white'}`}>
                  {result ? formatPercent(result.btts.bothScoreNo) : dash}
                </div>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <>
            <div className="bg-[#141414] border border-[#222] rounded-xl p-6 mb-5">
              <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">
                Pravděpodobnost přesného skóre
              </h2>
              <ScoreMatrix result={result} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
                <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">
                  Over / Under pravděpodobnosti
                </h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {['Line', 'Over', 'Under'].map((col) => (
                        <th
                          key={col}
                          className="text-left text-[11px] uppercase text-[#888] px-3 py-2 border-b border-[#2a2a2a] tracking-wide"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.overUnder.map((row) => (
                      <tr key={row.line}>
                        <td className="px-3 py-2.5 border-b border-[#1a1a1a] text-[15px]">
                          {row.line.toFixed(1)}
                        </td>
                        <td className="px-3 py-2.5 border-b border-[#1a1a1a] text-[15px] text-green font-bold">
                          {formatPercent(row.over)}
                        </td>
                        <td className="px-3 py-2.5 border-b border-[#1a1a1a] text-[15px] text-[#e0e0e0]">
                          {formatPercent(row.under)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
                <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">BTTS Detail</h2>

                {[
                  {
                    label: 'Oba týmy skórují — ANO',
                    value: result.btts.bothScoreYes,
                    favored: bttsFavoredYes,
                    barClass: 'bg-green',
                  },
                  {
                    label: 'Oba týmy skórují — NE',
                    value: result.btts.bothScoreNo,
                    favored: !bttsFavoredYes,
                    barClass: 'bg-[#555]',
                  },
                ].map((item) => (
                  <div key={item.label} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[13px] font-semibold ${item.favored ? 'text-green' : 'text-[#e0e0e0]'}`}>
                        {item.label}
                      </span>
                      <span className="text-sm font-bold">{formatPercent(item.value)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#2a2a2a] rounded overflow-hidden">
                      <div
                        className={`h-full rounded transition-all duration-400 ${item.barClass}`}
                        style={{ width: `${item.value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}

                <p className="text-xs text-[#666] mt-4 leading-relaxed">
                  Model předpokládá nezávislost gólů obou týmů. Pro pokročilé modelování viz{' '}
                  <Link href="/skola/modely-pravdepodobnosti" className="text-[#e0e0e0] font-semibold hover:text-green">
                    kurz Poisson model
                  </Link>{' '}
                  ve Škole sázení.
                </p>
              </div>
            </div>
          </>
        )}

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setGuideOpen((open) => !open)}
            className={`w-full bg-[#141414] border border-[#222] px-6 py-4 text-[#e0e0e0] text-base font-extrabold uppercase tracking-wide cursor-pointer flex justify-between items-center transition-colors hover:border-green ${
              guideOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'
            }`}
          >
            <span>📖 Návod k použití</span>
            <span className={`text-green text-xl transition-transform ${guideOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {guideOpen && (
            <div className="bg-[#141414] border border-[#222] border-t-0 rounded-b-xl px-6 py-6 text-sm text-[#bbb] leading-relaxed">
              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-0">Co je Poissonova kalkulačka?</h3>
              <p className="mb-4">
                Poissonovo rozdělení je statistický model, který odhaduje pravděpodobnost výskytu určitého počtu
                událostí (gólů) v daném časovém intervalu (zápas). Stačí zadat{' '}
                <strong className="text-[#e0e0e0]">očekávaný průměr gólů</strong> pro každý tým a kalkulačka vypočítá
                vše ostatní.
              </p>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">Jak zadat vstupy (λ — lambda)</h3>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>
                  <strong className="text-[#e0e0e0]">Očekávané góly domácích (λ₁)</strong> — průměrný počet gólů, které
                  domácí tým pravděpodobně vstřelí. Např. <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-green text-[13px]">1,5</code>{' '}
                  znamená, že tým v průměru dá 1,5 gólu za zápas.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Očekávané góly hostů (λ₂)</strong> — totéž pro hostující tým.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Max gólů v matici</strong> — kolik gólů se zobrazí v matici přesného
                  skóre (3–8). Vyšší hodnota = přesnější výpočet, ale většina pravděpodobnosti je do 4–5 gólů.
                </li>
              </ol>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">Jak zjistit hodnotu λ?</h3>
              <p className="mb-2">Nejjednodušší způsob:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-3">
                <li>Vezmi si statistiky ligy za aktuální sezónu (např. z Transfermarkt, Flashscore, FBref).</li>
                <li>
                  Spočítej <strong className="text-[#e0e0e0]">útočnou sílu</strong> a{' '}
                  <strong className="text-[#e0e0e0]">obrannou sílu</strong> obou týmů:
                </li>
              </ol>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3.5 my-2.5 font-mono text-sm text-green text-center">
                λ domácí = (útočná síla domácích × obranná slabost hostů) × průměr gólů ligy
                <br />
                λ hostů = (útočná síla hostů × obranná slabost domácích) × průměr gólů ligy
              </div>
              <div className="bg-green/[0.08] border-l-[3px] border-green pl-4 py-3 rounded-r-lg my-3 text-[13px]">
                <strong className="text-[#e0e0e0]">💡 Tip:</strong> Pokud nechceš počítat ručně, použij prostě průměr
                vstřelených gólů daného týmu doma (resp. venku) za posledních 10–20 zápasů. Není to tak přesné, ale pro
                rychlý odhad to stačí.
              </div>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">Co kalkulačka zobrazuje</h3>
              <ul className="list-disc pl-5 space-y-1.5 mb-4">
                <li>
                  <strong className="text-[#e0e0e0]">1X2</strong> — pravděpodobnost výhry domácích, remízy a výhry hostů.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Nejpravděpodobnější skóre</strong> — výsledek s nejvyšší pravděpodobností.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">BTTS</strong> — pravděpodobnost, že oba týmy skórují.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Matice přesného skóre</strong> — heatmapa všech kombinací skóre.
                  Tmavší zelená = vyšší pravděpodobnost.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Over/Under</strong> — pravděpodobnosti pro lajny 0.5 až 5.5 (celkový
                  počet gólů).
                </li>
              </ul>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">Jak najít value bet</h3>
              <ol className="list-decimal pl-5 space-y-2 mb-3">
                <li>Spočítej pravděpodobnost pomocí kalkulačky (např. Over 2.5 = 55 %).</li>
                <li>Podívej se na kurz u sázkové kanceláře (např. Over 2.5 = kurz 2.10).</li>
                <li>
                  Převeď kurz na implied probability:{' '}
                  <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-green text-[13px]">1 / 2.10 = 47.6 %</code>.
                </li>
                <li>
                  Pokud tvůj model ukazuje <strong className="text-[#e0e0e0]">vyšší pravděpodobnost</strong> než kurz (55 %
                  &gt; 47.6 %), máš potenciální <strong className="text-[#e0e0e0]">value bet</strong>.
                </li>
              </ol>
              <div className="bg-green/[0.08] border-l-[3px] border-green pl-4 py-3 rounded-r-lg text-[13px]">
                <strong className="text-[#e0e0e0]">⚠️ Limity modelu:</strong> Poisson předpokládá, že góly padají
                nezávisle na sobě. Nezohledňuje formu, zranění, červené karty, motivaci ani herní styl. Používej ho jako{' '}
                <strong className="text-[#e0e0e0]">jeden z nástrojů</strong>, ne jako jediný zdroj rozhodování.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
