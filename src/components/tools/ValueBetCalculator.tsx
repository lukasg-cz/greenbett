'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  BET_TYPE_OPTIONS,
  VALUE_BET_DEFAULTS,
  calculateValueBet,
  formatCZK,
  formatPercent,
  formatPercentSigned,
  parseDecimalInput,
  validateValueBetInput,
  type ValueBetMode,
  type ValueBetResult,
  type ValueBetType,
  type ValueBetVerdict,
} from '@/lib/calculations/value-bet';
import { formatDecimalInput } from '@/lib/calculations/poisson';

const inputClass =
  'w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3.5 py-3 text-white text-base outline-none transition-colors focus:border-green';

const VERDICT_CONFIG: Record<
  ValueBetVerdict | 'neutral',
  { icon: string; label: string; sub: string; boxClass: string; labelClass: string }
> = {
  value: {
    icon: '✅',
    label: 'VALUE BET',
    sub: 'Tip má kladnou očekávanou hodnotu — sázkej!',
    boxClass: 'bg-green/10 border-2 border-green',
    labelClass: 'text-green',
  },
  'weak-value': {
    icon: '⚠️',
    label: 'SLABÝ VALUE',
    sub: 'Minimální edge — zvaž, jestli se to vyplatí.',
    boxClass: 'bg-green/10 border-2 border-green',
    labelClass: 'text-green',
  },
  'no-value': {
    icon: '❌',
    label: 'NO VALUE',
    sub: 'Kurz je příliš nízký — přeskoč tento tip.',
    boxClass: 'bg-red/10 border-2 border-red',
    labelClass: 'text-red',
  },
  neutral: {
    icon: '🎯',
    label: 'Zadej údaje',
    sub: 'Klikni na „Spočítat" pro analýzu',
    boxClass: 'bg-white/[0.03] border-2 border-[#444]',
    labelClass: 'text-[#888]',
  },
};

function MetricBox({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub: string;
  valueClass: string;
}) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] p-4 text-center">
      <div className="text-[10px] uppercase text-[#888] tracking-wider mb-1.5">{label}</div>
      <div className={`text-[22px] font-extrabold ${valueClass}`}>{value}</div>
      <div className="text-[11px] text-[#666] mt-1">{sub}</div>
    </div>
  );
}

export function ValueBetCalculator() {
  const [mode, setMode] = useState<ValueBetMode>('quick');
  const [myProb, setMyProb] = useState(String(VALUE_BET_DEFAULTS.quick.myProbPercent));
  const [bookOdds, setBookOdds] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.quick.odds));
  const [betType, setBetType] = useState<ValueBetType>(VALUE_BET_DEFAULTS.advanced.betType);
  const [homeScored, setHomeScored] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.homeScored));
  const [homeConceded, setHomeConceded] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.homeConceded));
  const [awayScored, setAwayScored] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.awayScored));
  const [awayConceded, setAwayConceded] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.awayConceded));
  const [leagueAvg, setLeagueAvg] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.leagueAvg));
  const [advBookOdds, setAdvBookOdds] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.odds));
  const [ouLine, setOuLine] = useState(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.ouLine));
  const [bankroll, setBankroll] = useState(String(VALUE_BET_DEFAULTS.bankroll));
  const [kellyPercent, setKellyPercent] = useState(VALUE_BET_DEFAULTS.kellyPercent);
  const [result, setResult] = useState<ValueBetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const dash = '—';
  const verdictKey = result ? result.verdict : 'neutral';
  const verdict = VERDICT_CONFIG[verdictKey];

  const runCalculate = () => {
    const input = {
      mode,
      bankroll: parseDecimalInput(bankroll),
      kellyFraction: kellyPercent / 100,
      quick: {
        myProbPercent: parseDecimalInput(myProb),
        odds: parseDecimalInput(bookOdds),
      },
      advanced: {
        betType,
        homeScored: parseDecimalInput(homeScored),
        homeConceded: parseDecimalInput(homeConceded),
        awayScored: parseDecimalInput(awayScored),
        awayConceded: parseDecimalInput(awayConceded),
        leagueAvg: parseDecimalInput(leagueAvg),
        odds: parseDecimalInput(advBookOdds),
        ouLine: parseDecimalInput(ouLine),
      },
    };

    const validationError = validateValueBetInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setResult(calculateValueBet(input));
  };

  const handleReset = () => {
    setMode('quick');
    setMyProb(String(VALUE_BET_DEFAULTS.quick.myProbPercent));
    setBookOdds(formatDecimalInput(VALUE_BET_DEFAULTS.quick.odds));
    setBetType(VALUE_BET_DEFAULTS.advanced.betType);
    setHomeScored(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.homeScored));
    setHomeConceded(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.homeConceded));
    setAwayScored(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.awayScored));
    setAwayConceded(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.awayConceded));
    setLeagueAvg(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.leagueAvg));
    setAdvBookOdds(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.odds));
    setOuLine(formatDecimalInput(VALUE_BET_DEFAULTS.advanced.ouLine));
    setBankroll(String(VALUE_BET_DEFAULTS.bankroll));
    setKellyPercent(VALUE_BET_DEFAULTS.kellyPercent);
    setResult(null);
    setError(null);
  };

  const stakeBarColor =
    result?.stakeBarLevel === 'safe'
      ? 'bg-green'
      : result?.stakeBarLevel === 'moderate'
        ? 'bg-yellow'
        : 'bg-red';

  return (
    <section className="page-section">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="inline-flex items-center gap-1.5 bg-green/15 border border-green/40 rounded-full px-3.5 py-1 text-xs text-green uppercase tracking-wider mb-3 before:content-[''] before:w-2 before:h-2 before:bg-green before:rounded-full">
          Nástroj
        </div>
        <h1 className="text-[clamp(1.4rem,4vw,2rem)] font-black uppercase mb-2">
          Value Bet <span className="text-green">Calculator</span>
        </h1>
        <p className="text-[#888] text-sm mb-6 leading-relaxed max-w-[720px]">
          Zjisti, jestli má tvůj tip kladnou očekávanou hodnotu (EV). Porovnej svůj odhad pravděpodobnosti s
          kurzem bookmakera a zjisti optimální výši sázky podle Kellyho kritéria.
        </p>

        <div className="flex w-fit rounded-[10px] overflow-hidden border border-[#333] mb-6">
          {([
            { id: 'quick' as const, label: '⚡ Rychlý' },
            { id: 'advanced' as const, label: '📊 Pokročilý' },
          ]).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide border-none cursor-pointer transition-all ${
                mode === tab.id ? 'bg-green text-black' : 'bg-[#1a1a1a] text-[#888] hover:text-[#ccc]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
            <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">Vstupy</h2>

            {mode === 'quick' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">
                    Tvůj odhad pravděpodobnosti (%)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={myProb}
                    onChange={(e) => setMyProb(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">
                    Kurz bookmakera
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={bookOdds}
                    onChange={(e) => setBookOdds(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                    className={inputClass}
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-[11px] uppercase text-green tracking-wide font-bold mb-3">Typ sázky</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {BET_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBetType(opt.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all ${
                        betType === opt.id
                          ? 'bg-green/15 text-green border-green'
                          : 'bg-[#1a1a1a] text-[#888] border-[#333] hover:text-[#ccc] hover:border-[#555]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] uppercase text-[#888] tracking-wide font-bold mb-3 mt-2">
                  Statistiky týmů
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Góly domácích (doma)', value: homeScored, set: setHomeScored },
                    { label: 'Obdržené domácích (doma)', value: homeConceded, set: setHomeConceded },
                    { label: 'Góly hostů (venku)', value: awayScored, set: setAwayScored },
                    { label: 'Obdržené hostů (venku)', value: awayConceded, set: setAwayConceded },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Průměr gólů ligy (na zápas)', value: leagueAvg, set: setLeagueAvg },
                    { label: 'Kurz bookmakera', value: advBookOdds, set: setAdvBookOdds },
                    { label: 'Over/Under lajn', value: ouLine, set: setOuLine },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">Bankroll (Kč)</label>
              <input
                type="text"
                inputMode="numeric"
                value={bankroll}
                onChange={(e) => setBankroll(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runCalculate()}
                className={inputClass}
              />
            </div>

            <div className="mb-5">
              <label className="block text-[11px] uppercase text-[#888] mb-2.5 tracking-wide">Kelly frakce</label>
              <div className="flex items-center gap-3.5">
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={kellyPercent}
                  onChange={(e) => setKellyPercent(parseInt(e.target.value, 10))}
                  className="flex-1 h-1.5 rounded bg-[#333] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green"
                />
                <span className="text-sm font-bold text-green min-w-[45px] text-right">{kellyPercent} %</span>
              </div>
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
            <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">Výsledek</h2>

            <div className={`text-center py-6 px-4 rounded-xl mb-5 ${verdict.boxClass}`}>
              <div className="text-[40px] mb-2">{verdict.icon}</div>
              <div className={`text-[22px] font-black uppercase tracking-[2px] ${verdict.labelClass}`}>
                {verdict.label}
              </div>
              <div className="text-[13px] text-[#888] mt-1.5">{verdict.sub}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <MetricBox
                label="Expected Value"
                value={result ? formatPercentSigned(result.ev) : dash}
                sub="na každou 1 Kč"
                valueClass={result ? (result.ev >= 0 ? 'text-green' : 'text-red') : 'text-[#888]'}
              />
              <MetricBox
                label="Edge"
                value={result ? formatPercentSigned(result.edge) : dash}
                sub="tvůj odhad vs. kurz"
                valueClass={result ? (result.edge >= 0 ? 'text-green' : 'text-red') : 'text-[#888]'}
              />
              <MetricBox
                label="Implied Prob."
                value={result ? formatPercent(result.impliedProb) : dash}
                sub="z kurzu bookmakera"
                valueClass="text-[#888]"
              />
            </div>

            {result?.poisson && mode === 'advanced' && (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] p-4">
                <p className="text-[11px] uppercase text-green tracking-wide font-bold mb-2.5">📐 Poisson výpočet</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'λ domácí', value: result.poisson.lambdaHome.toFixed(2) },
                    { label: 'λ hostů', value: result.poisson.lambdaAway.toFixed(2) },
                    { label: 'Tvůj odhad', value: formatPercent(result.poisson.myProb) },
                  ].map((item) => (
                    <div key={item.label} className="text-center py-2 bg-[#222] rounded-md">
                      <div className="text-[10px] text-[#888] uppercase mb-0.5">{item.label}</div>
                      <div className="text-base font-bold text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
              <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">Rozklad výpočtu</h2>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] p-4">
                <p className="text-xs uppercase text-[#888] tracking-wide font-bold mb-3">
                  Expected Value krok po kroku
                </p>
                {[
                  { label: 'Tvůj odhad pravděpodobnosti', value: formatPercent(result.myProb) },
                  { label: 'Kurz bookmakera', value: result.odds.toFixed(2) },
                  { label: 'Implied probability (z kurzu)', value: formatPercent(result.impliedProb) },
                  { label: 'Potenciální výnos při výhře', value: `+${(result.odds - 1).toFixed(2)} Kč` },
                  { label: 'Ztráta při prohře', value: '−1,00 Kč' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center py-2 border-b border-[#222] text-[13px]"
                  >
                    <span className="text-[#aaa]">{row.label}</span>
                    <span className="font-bold">{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 text-[15px] font-extrabold">
                  <span className="text-[#aaa]">EV = (prob × výnos) − ((1−prob) × ztráta)</span>
                  <span className={result.ev >= 0 ? 'text-green' : 'text-red'}>
                    {result.ev >= 0 ? '+' : ''}
                    {result.ev.toFixed(4)} Kč
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
              <h2 className="text-base font-extrabold uppercase tracking-wide mb-5">Doporučená sázka</h2>
              <div className="flex justify-between text-xs text-[#888] mb-1.5">
                <span>Konzervativní</span>
                <span>Agresivní</span>
              </div>
              <div className="w-full h-2.5 bg-[#2a2a2a] rounded overflow-hidden mb-4">
                <div
                  className={`h-full rounded transition-all duration-400 ${stakeBarColor}`}
                  style={{ width: `${result.stakeBarPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase text-[#888] mb-1">Full Kelly</div>
                  <div className="text-lg font-extrabold">{formatCZK(result.stakeFullKelly)}</div>
                  <div className="text-[10px] text-[#666] mt-0.5">
                    {(result.kellyFull * 100).toFixed(1)} % bankrollu
                  </div>
                </div>
                <div className="bg-green/[0.06] border border-green rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase text-[#888] mb-1">
                    Tvůj Kelly ({kellyPercent} %)
                  </div>
                  <div className="text-lg font-extrabold text-green">{formatCZK(result.stakeYourKelly)}</div>
                  <div className="text-[10px] text-[#666] mt-0.5">
                    {(result.kellyYour * 100).toFixed(1)} % bankrollu
                  </div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase text-[#888] mb-1">Flat 2 %</div>
                  <div className="text-lg font-extrabold">{formatCZK(result.stakeFlat)}</div>
                  <div className="text-[10px] text-[#666] mt-0.5">fixní stake</div>
                </div>
              </div>
              <p className="text-xs text-[#666] mt-3 leading-relaxed">
                Kelly kritérium maximalizuje dlouhodobý růst bankrollu. Frakční Kelly (¼ nebo ½) snižuje
                varianci za cenu mírně pomalejšího růstu. Flat stake je nejbezpečnější.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setGuideOpen((o) => !o)}
            className={`w-full bg-[#141414] border border-[#222] px-6 py-4 text-[#e0e0e0] text-base font-extrabold uppercase tracking-wide cursor-pointer flex justify-between items-center transition-colors hover:border-green ${
              guideOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'
            }`}
          >
            <span>📖 Návod k použití</span>
            <span className={`text-green text-xl transition-transform ${guideOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {guideOpen && (
            <div className="bg-[#141414] border border-[#222] border-t-0 rounded-b-xl px-6 py-6 text-sm text-[#bbb] leading-relaxed">
              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2">Co je Value Bet?</h3>
              <p className="mb-4">
                Value bet je sázka, kde <strong className="text-[#e0e0e0]">tvůj odhad pravděpodobnosti je vyšší</strong>{' '}
                než pravděpodobnost naznačená kurzem bookmakera. Dlouhodobě sázením pouze value betů budeš v plusu — i
                když jednotlivé sázky můžeš prohrát.
              </p>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">⚡ Rychlý režim</h3>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>
                  <strong className="text-[#e0e0e0]">Tvůj odhad pravděpodobnosti (%)</strong> — můžeš použít výstup z{' '}
                  <Link href="/nastroje/poisson" className="text-green hover:underline">
                    Poissonovy kalkulačky
                  </Link>
                  .
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Kurz bookmakera</strong> — aktuální kurz na daný tip.
                </li>
              </ol>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">📊 Pokročilý režim</h3>
              <p className="mb-2">
                Pravděpodobnost se <strong className="text-[#e0e0e0]">spočítá sama</strong> pomocí Poissonova modelu
                ze statistik týmů.
              </p>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3.5 my-2.5 font-mono text-sm text-green text-center">
                λ domácí = (útoč. síla domácích × obran. slabost hostů) × (průměr ligy / 2)
                <br />
                λ hostů = (útoč. síla hostů × obran. slabost domácích) × (průměr ligy / 2)
              </div>

              <h3 className="text-green text-[15px] uppercase tracking-wide mb-2 mt-5">Jak číst výsledky</h3>
              <ul className="list-disc pl-5 space-y-1.5 mb-4">
                <li>
                  <strong className="text-[#e0e0e0]">EV</strong> — kolik Kč vyděláš na každou vsazenou 1 Kč. Kladné =
                  value bet.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Edge</strong> — o kolik % je tvůj odhad lepší než bookmakerův.
                </li>
                <li>
                  <strong className="text-[#e0e0e0]">Implied Probability</strong> —{' '}
                  <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-green text-[13px]">1 / kurz × 100</code>
                </li>
              </ul>

              <div className="bg-green/[0.08] border-l-[3px] border-green pl-4 py-3 rounded-r-lg my-3 text-[13px]">
                <strong className="text-[#e0e0e0]">💡 Tip:</strong> Edge pod 3 % raději přeskoč — model není dost
                přesný na spolehlivý malý edge.
              </div>
              <div className="bg-red/10 border-l-[3px] border-red pl-4 py-3 rounded-r-lg text-[13px]">
                <strong className="text-[#e0e0e0]">⚠️ Důležité:</strong> Žádný model nezaručuje zisk. Value betting
                funguje pouze <strong className="text-[#e0e0e0]">dlouhodobě a s disciplínou</strong>.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
