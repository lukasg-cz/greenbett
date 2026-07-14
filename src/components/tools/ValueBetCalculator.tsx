'use client';

import { useState } from 'react';
import {
  OU_LINE_OPTIONS,
  VALUE_BET_DEFAULTS,
  analyzeValueBet,
  formatCZK,
  formatPercentNum,
  formatPercentSignedNum,
  parseDecimalInput,
  validateValueBetInput,
  type MarketAnalysis,
  type ValueBetAnalyzeResult,
} from '@/lib/calculations/value-bet';
import { formatDecimalInput } from '@/lib/calculations/poisson';

const inputClass =
  'w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3.5 py-2.5 text-white text-[15px] outline-none transition-colors focus:border-green';

const selectClass =
  'w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3.5 py-2.5 text-white text-[15px] outline-none transition-colors focus:border-green';

const h2hInputClass =
  'w-full bg-[#222] border border-[#333] rounded-md px-2 py-2 text-white text-base text-center outline-none focus:border-green';

function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-3.5 ${className ?? ''}`}>
      <label className="block text-[11px] uppercase text-[#888] mb-1.5 tracking-wide">{label}</label>
      {children}
      {hint ? <div className="text-[11px] text-[#555] mt-1">{hint}</div> : null}
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-6 mb-5">
      <div className="text-[15px] font-extrabold uppercase mb-5 tracking-wide">
        <span className="mr-1.5">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function ValueBadge({ badge }: { badge: MarketAnalysis['badge'] }) {
  if (badge === 'value') {
    return (
      <span className="inline-block px-2.5 py-0.5 rounded-xl text-[11px] font-bold uppercase tracking-wide bg-green/15 text-green border border-green/30">
        ✅ VALUE
      </span>
    );
  }
  if (badge === 'weak') {
    return (
      <span className="inline-block px-2.5 py-0.5 rounded-xl text-[11px] font-bold uppercase tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/20">
        ⚠️ SLABÝ
      </span>
    );
  }
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-xl text-[11px] font-bold uppercase tracking-wide bg-red/10 text-red border border-red/20">
      ❌ NE
    </span>
  );
}

export function ValueBetCalculator() {
  const d = VALUE_BET_DEFAULTS;

  const [leagueAvg, setLeagueAvg] = useState(formatDecimalInput(d.leagueAvg));
  const [leagueHomeAvg, setLeagueHomeAvg] = useState(formatDecimalInput(d.leagueHomeAvg));
  const [leagueAwayAvg, setLeagueAwayAvg] = useState(formatDecimalInput(d.leagueAwayAvg));

  const [homeScored, setHomeScored] = useState(formatDecimalInput(d.homeScored));
  const [homeConceded, setHomeConceded] = useState(formatDecimalInput(d.homeConceded));
  const [homeSample, setHomeSample] = useState(String(d.homeSample));

  const [awayScored, setAwayScored] = useState(formatDecimalInput(d.awayScored));
  const [awayConceded, setAwayConceded] = useState(formatDecimalInput(d.awayConceded));
  const [awaySample, setAwaySample] = useState(String(d.awaySample));

  const [h2h1home, setH2h1home] = useState(String(d.h2h[0].homeGoals));
  const [h2h1away, setH2h1away] = useState(String(d.h2h[0].awayGoals));
  const [h2h2home, setH2h2home] = useState(String(d.h2h[1].homeGoals));
  const [h2h2away, setH2h2away] = useState(String(d.h2h[1].awayGoals));
  const [h2h3home, setH2h3home] = useState(String(d.h2h[2].homeGoals));
  const [h2h3away, setH2h3away] = useState(String(d.h2h[2].awayGoals));

  const [odds1, setOdds1] = useState(formatDecimalInput(d.odds1));
  const [oddsX, setOddsX] = useState(formatDecimalInput(d.oddsX));
  const [odds2, setOdds2] = useState(formatDecimalInput(d.odds2));
  const [ouLine, setOuLine] = useState(String(d.ouLine));
  const [oddsOver, setOddsOver] = useState(formatDecimalInput(d.oddsOver));
  const [oddsUnder, setOddsUnder] = useState(formatDecimalInput(d.oddsUnder));
  const [oddsBttsYes, setOddsBttsYes] = useState(formatDecimalInput(d.oddsBttsYes));
  const [oddsBttsNo, setOddsBttsNo] = useState(formatDecimalInput(d.oddsBttsNo));

  const [bankroll, setBankroll] = useState(String(d.bankroll));
  const [kellyPercent, setKellyPercent] = useState(d.kellyPercent);

  const [result, setResult] = useState<ValueBetAnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  function buildInput() {
    return {
      leagueAvg: parseDecimalInput(leagueAvg),
      leagueHomeAvg: parseDecimalInput(leagueHomeAvg),
      leagueAwayAvg: parseDecimalInput(leagueAwayAvg),
      homeScored: parseDecimalInput(homeScored),
      homeConceded: parseDecimalInput(homeConceded),
      awayScored: parseDecimalInput(awayScored),
      awayConceded: parseDecimalInput(awayConceded),
      h2h: [
        { homeGoals: parseDecimalInput(h2h1home), awayGoals: parseDecimalInput(h2h1away), weight: 0.5 },
        { homeGoals: parseDecimalInput(h2h2home), awayGoals: parseDecimalInput(h2h2away), weight: 0.3 },
        { homeGoals: parseDecimalInput(h2h3home), awayGoals: parseDecimalInput(h2h3away), weight: 0.2 },
      ],
      odds1: parseDecimalInput(odds1),
      oddsX: parseDecimalInput(oddsX),
      odds2: parseDecimalInput(odds2),
      ouLine: parseDecimalInput(ouLine),
      oddsOver: parseDecimalInput(oddsOver),
      oddsUnder: parseDecimalInput(oddsUnder),
      oddsBttsYes: parseDecimalInput(oddsBttsYes),
      oddsBttsNo: parseDecimalInput(oddsBttsNo),
      bankroll: parseDecimalInput(bankroll),
      kellyFraction: kellyPercent / 100,
    };
  }

  function handleAnalyze() {
    const input = buildInput();
    const validationError = validateValueBetInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setResult(analyzeValueBet(input));
    requestAnimationFrame(() => {
      document.getElementById('value-bet-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function handleReset() {
    setLeagueAvg(formatDecimalInput(d.leagueAvg));
    setLeagueHomeAvg(formatDecimalInput(d.leagueHomeAvg));
    setLeagueAwayAvg(formatDecimalInput(d.leagueAwayAvg));
    setHomeScored(formatDecimalInput(d.homeScored));
    setHomeConceded(formatDecimalInput(d.homeConceded));
    setHomeSample(String(d.homeSample));
    setAwayScored(formatDecimalInput(d.awayScored));
    setAwayConceded(formatDecimalInput(d.awayConceded));
    setAwaySample(String(d.awaySample));
    setH2h1home(String(d.h2h[0].homeGoals));
    setH2h1away(String(d.h2h[0].awayGoals));
    setH2h2home(String(d.h2h[1].homeGoals));
    setH2h2away(String(d.h2h[1].awayGoals));
    setH2h3home(String(d.h2h[2].homeGoals));
    setH2h3away(String(d.h2h[2].awayGoals));
    setOdds1(formatDecimalInput(d.odds1));
    setOddsX(formatDecimalInput(d.oddsX));
    setOdds2(formatDecimalInput(d.odds2));
    setOuLine(String(d.ouLine));
    setOddsOver(formatDecimalInput(d.oddsOver));
    setOddsUnder(formatDecimalInput(d.oddsUnder));
    setOddsBttsYes(formatDecimalInput(d.oddsBttsYes));
    setOddsBttsNo(formatDecimalInput(d.oddsBttsNo));
    setBankroll(String(d.bankroll));
    setKellyPercent(d.kellyPercent);
    setResult(null);
    setError(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleAnalyze();
  }

  const h2hRows = [
    { label: 'Zápas 1 (nejnovější)', home: h2h1home, setHome: setH2h1home, away: h2h1away, setAway: setH2h1away, weightLabel: 'váha 50 %', weightColor: 'text-green' },
    { label: 'Zápas 2', home: h2h2home, setHome: setH2h2home, away: h2h2away, setAway: setH2h2away, weightLabel: 'váha 30 %', weightColor: 'text-[#888]' },
    { label: 'Zápas 3', home: h2h3home, setHome: setH2h3home, away: h2h3away, setAway: setH2h3away, weightLabel: 'váha 20 %', weightColor: 'text-[#555]' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-5">
      <div className="inline-flex items-center gap-1.5 bg-green/15 border border-green/40 rounded-full px-3.5 py-1 text-xs text-green uppercase tracking-wider mb-3">
        <span className="w-2 h-2 bg-green rounded-full" />
        Nástroj
      </div>

      <h1 className="text-[32px] max-[850px]:text-[22px] font-black uppercase mb-2">
        Value Bet <span className="text-green">Calculator</span>
      </h1>
      <p className="text-[#888] text-sm mb-7 leading-relaxed max-w-[700px]">
        Zadej reálné statistiky obou týmů, vzájemné zápasy a kurzy bookmakera. Kalkulačka sama spočítá
        pravděpodobnosti přes Poissonův model a ukáže ti, kde je value bet a kde ne.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column */}
        <div>
          <Card title="Liga" icon="🏟️">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Field label="Průměr gólů / zápas (liga)" hint="Celkový průměr gólů na zápas v lize">
                <input type="text" className={inputClass} value={leagueAvg} onChange={(e) => setLeagueAvg(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="Průměr gólů domácích (liga)" hint="Průměr gólů domácích týmů v lize">
                <input type="text" className={inputClass} value={leagueHomeAvg} onChange={(e) => setLeagueHomeAvg(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="Průměr gólů hostů (liga)" hint="Průměr gólů hostujících týmů v lize">
                <input type="text" className={inputClass} value={leagueAwayAvg} onChange={(e) => setLeagueAwayAvg(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
            </div>
          </Card>

          <Card title="Domácí tým" icon="🟢">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field label="Vstřelené góly doma (Ø / zápas)">
                <input type="text" className={inputClass} value={homeScored} onChange={(e) => setHomeScored(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="Obdržené góly doma (Ø / zápas)">
                <input type="text" className={inputClass} value={homeConceded} onChange={(e) => setHomeConceded(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
            </div>
            <Field label="Počet zápasů (vzorek)" hint="Z kolika domácích zápasů jsou statistiky">
              <input type="text" className={`${inputClass} max-w-[120px]`} value={homeSample} onChange={(e) => setHomeSample(e.target.value)} onKeyDown={handleKeyDown} inputMode="numeric" />
            </Field>
          </Card>

          <Card title="Hostující tým" icon="🔴">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field label="Vstřelené góly venku (Ø / zápas)">
                <input type="text" className={inputClass} value={awayScored} onChange={(e) => setAwayScored(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="Obdržené góly venku (Ø / zápas)">
                <input type="text" className={inputClass} value={awayConceded} onChange={(e) => setAwayConceded(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
            </div>
            <Field label="Počet zápasů (vzorek)" hint="Z kolika venkovních zápasů jsou statistiky">
              <input type="text" className={`${inputClass} max-w-[120px]`} value={awaySample} onChange={(e) => setAwaySample(e.target.value)} onKeyDown={handleKeyDown} inputMode="numeric" />
            </Field>
          </Card>
        </div>

        {/* Right column */}
        <div>
          <Card title="Vzájemné zápasy (poslední 3)" icon="⚔️">
            <p className="text-[11px] text-[#555] mb-2">Nejnovější zápas má největší váhu. Domácí góly vlevo, hosté vpravo.</p>
            {h2hRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[auto_60px_20px_60px_auto] gap-2 items-center mb-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5"
              >
                <span className="text-xs text-[#888] whitespace-nowrap">{row.label}</span>
                <input type="text" className={h2hInputClass} value={row.home} onChange={(e) => row.setHome(e.target.value)} onKeyDown={handleKeyDown} inputMode="numeric" />
                <span className="text-center text-base font-bold text-[#555]">:</span>
                <input type="text" className={h2hInputClass} value={row.away} onChange={(e) => row.setAway(e.target.value)} onKeyDown={handleKeyDown} inputMode="numeric" />
                <span className={`text-xs whitespace-nowrap ${row.weightColor}`}>{row.weightLabel}</span>
              </div>
            ))}
          </Card>

          <Card title="Kurzy bookmakera" icon="💰">
            <div className="text-[11px] uppercase text-green tracking-wider font-bold mb-3 mt-2">1X2</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Field label="1 (domácí)">
                <input type="text" className={inputClass} value={odds1} onChange={(e) => setOdds1(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="X (remíza)">
                <input type="text" className={inputClass} value={oddsX} onChange={(e) => setOddsX(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="2 (hosté)">
                <input type="text" className={inputClass} value={odds2} onChange={(e) => setOdds2(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
            </div>

            <div className="text-[11px] uppercase text-green tracking-wider font-bold mb-3 mt-2">Over / Under</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <Field label="Lajna">
                <select className={selectClass} value={ouLine} onChange={(e) => setOuLine(e.target.value)}>
                  {OU_LINE_OPTIONS.map((line) => (
                    <option key={line} value={line}>
                      {line}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Over">
                <input type="text" className={inputClass} value={oddsOver} onChange={(e) => setOddsOver(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="Under">
                <input type="text" className={inputClass} value={oddsUnder} onChange={(e) => setOddsUnder(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
            </div>

            <div className="text-[11px] uppercase text-green tracking-wider font-bold mb-3 mt-2">BTTS (oba skórují)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field label="BTTS Ano">
                <input type="text" className={inputClass} value={oddsBttsYes} onChange={(e) => setOddsBttsYes(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
              <Field label="BTTS Ne">
                <input type="text" className={inputClass} value={oddsBttsNo} onChange={(e) => setOddsBttsNo(e.target.value)} onKeyDown={handleKeyDown} inputMode="decimal" />
              </Field>
            </div>
          </Card>

          <Card title="Money Management" icon="🏦">
            <Field label="Bankroll (Kč)">
              <input type="text" className={inputClass} value={bankroll} onChange={(e) => setBankroll(e.target.value)} onKeyDown={handleKeyDown} inputMode="numeric" />
            </Field>
            <div className="mb-4">
              <label className="block text-[11px] uppercase text-[#888] mb-2 tracking-wide">Kelly frakce</label>
              <div className="flex items-center gap-3.5">
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={kellyPercent}
                  onChange={(e) => setKellyPercent(Number(e.target.value))}
                  className="flex-1 h-1.5 appearance-none bg-[#333] rounded outline-none accent-green"
                />
                <span className="text-sm font-bold text-green min-w-[45px] text-right">{kellyPercent} %</span>
              </div>
              <div className="text-[11px] text-[#555] mt-1">Doporučeno 25 % (čtvrtinový Kelly) pro bezpečný růst</div>
            </div>
          </Card>

          {error ? (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red/10 border border-red/30 text-red text-sm">{error}</div>
          ) : null}

          <div className="flex gap-3">
            <button type="button" onClick={handleAnalyze} className="px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wide bg-green text-black hover:opacity-85 transition-opacity">
              Analyzovat
            </button>
            <button type="button" onClick={handleReset} className="px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wide bg-[#2a2a2a] text-[#e0e0e0] border border-[#444] hover:opacity-85 transition-opacity">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div id="value-bet-results" className="mt-5">
          <Card title="Výpočet modelu" icon="📐">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] p-3.5 text-center">
                <div className="text-[10px] uppercase text-[#888] tracking-wider mb-1">λ domácí (očekávané góly)</div>
                <div className="text-xl font-extrabold text-green">{result.lambdaHome.toFixed(2)}</div>
                <div className="text-[11px] text-[#555] mt-0.5">
                  Poisson: {result.lambdaHomeBase.toFixed(2)}
                  {result.h2hValid ? ` → H2H korekce: ${result.lambdaHome.toFixed(2)}` : ''}
                </div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] p-3.5 text-center">
                <div className="text-[10px] uppercase text-[#888] tracking-wider mb-1">λ hostů (očekávané góly)</div>
                <div className="text-xl font-extrabold text-green">{result.lambdaAway.toFixed(2)}</div>
                <div className="text-[11px] text-[#555] mt-0.5">
                  Poisson: {result.lambdaAwayBase.toFixed(2)}
                  {result.h2hValid ? ` → H2H korekce: ${result.lambdaAway.toFixed(2)}` : ''}
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-4 py-3.5 text-[13px] text-[#aaa] leading-relaxed">
              {result.h2hValid ? (
                <>
                  <strong className="text-green">⚔️ Vzájemné zápasy:</strong> {result.h2hSummaries.join(' · ')}
                  <br />
                  Vážený průměr H2H: domácí <strong className="text-green">{result.h2hHomeGoals.toFixed(2)}</strong> gólů, hosté{' '}
                  <strong className="text-green">{result.h2hAwayGoals.toFixed(2)}</strong> gólů. H2H tvoří 20 % finální λ.
                </>
              ) : (
                'H2H data nebyla zadána — model používá čistý Poisson.'
              )}
            </div>
          </Card>

          <div
            className={`flex items-center gap-4 rounded-[10px] p-4 mb-4 border ${
              result.bestMarket ? 'bg-green/5 border-green' : 'bg-red/5 border-red'
            }`}
          >
            <div className="text-[32px]">{result.bestMarket ? '🎯' : '❌'}</div>
            <div className="flex-1">
              <div className="text-[13px] text-green uppercase tracking-wider font-bold mb-1">Nejlepší value bet</div>
              {result.bestMarket ? (
                <>
                  <div className="text-xl font-extrabold text-white">
                    {result.bestMarket.name} → kurz {result.bestMarket.odds.toFixed(2)}
                  </div>
                  <div className="text-[13px] text-[#888] mt-1">
                    Model: {formatPercentNum(result.bestMarket.prob)} | Implied: {formatPercentNum(result.bestMarket.implied)} | Edge: +
                    {formatPercentNum(result.bestMarket.edge)} | EV: +{(result.bestMarket.ev * 100).toFixed(1)} %
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xl font-extrabold text-white">Žádný value bet nenalezen</div>
                  <div className="text-[13px] text-[#888] mt-1">
                    Žádný z trhů nemá kladnou očekávanou hodnotu při zadaných kurzech. Tento zápas přeskoč.
                  </div>
                </>
              )}
            </div>
          </div>

          <Card title="Analýza všech trhů" icon="📊">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['Tip', 'Model (%)', 'Kurz', 'Implied (%)', 'Edge', 'EV', 'Value?'].map((col) => (
                      <th key={col} className="text-left text-[11px] uppercase text-[#888] px-3 py-2.5 border-b border-[#2a2a2a] tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.markets.map((market) => (
                    <tr key={market.name}>
                      <td className="px-3 py-3 border-b border-[#1e1e1e] text-sm font-bold">{market.name}</td>
                      <td className="px-3 py-3 border-b border-[#1e1e1e] text-sm">{formatPercentNum(market.prob)}</td>
                      <td className="px-3 py-3 border-b border-[#1e1e1e] text-sm">{market.odds.toFixed(2)}</td>
                      <td className="px-3 py-3 border-b border-[#1e1e1e] text-sm">{formatPercentNum(market.implied)}</td>
                      <td className={`px-3 py-3 border-b border-[#1e1e1e] text-sm font-bold ${market.edge > 0 ? 'text-green' : 'text-red'}`}>
                        {formatPercentSignedNum(market.edge)}
                      </td>
                      <td className={`px-3 py-3 border-b border-[#1e1e1e] text-sm font-bold ${market.ev > 0 ? 'text-green' : 'text-red'}`}>
                        {formatPercentSignedNum(market.ev)}
                      </td>
                      <td className="px-3 py-3 border-b border-[#1e1e1e] text-sm">
                        <ValueBadge badge={market.badge} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {result.bestMarket && result.stake ? (
            <Card title="Doporučená sázka" icon="💵">
              <div className="text-[13px] text-[#888] mb-3">
                Stake pro: {result.bestMarket.name} (kurz {result.bestMarket.odds.toFixed(2)})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3.5 text-center">
                  <div className="text-[10px] uppercase text-[#888] tracking-wide mb-1">Full Kelly</div>
                  <div className="text-xl font-extrabold">{formatCZK(result.stake.fullKelly)}</div>
                  <div className="text-[10px] text-[#555] mt-0.5">{result.stake.kellyFullPct.toFixed(1)} % bankrollu</div>
                </div>
                <div className="bg-green/[0.06] border border-green rounded-lg p-3.5 text-center">
                  <div className="text-[10px] uppercase text-[#888] tracking-wide mb-1">Tvůj Kelly ({kellyPercent} %)</div>
                  <div className="text-xl font-extrabold text-green">{formatCZK(result.stake.yourKelly)}</div>
                  <div className="text-[10px] text-[#555] mt-0.5">{result.stake.kellyYourPct.toFixed(1)} % bankrollu</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3.5 text-center">
                  <div className="text-[10px] uppercase text-[#888] tracking-wide mb-1">Flat 2 %</div>
                  <div className="text-xl font-extrabold">{formatCZK(result.stake.flat)}</div>
                  <div className="text-[10px] text-[#555] mt-0.5">fixní stake</div>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      ) : null}

      {/* Guide */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setGuideOpen((o) => !o)}
          className={`w-full bg-[#141414] border border-[#222] rounded-xl px-6 py-4.5 text-[#e0e0e0] text-base font-extrabold uppercase tracking-wide cursor-pointer flex justify-between items-center hover:border-green transition-colors ${
            guideOpen ? 'rounded-b-none' : ''
          }`}
        >
          📖 Návod k použití
          <span className={`text-xl text-green transition-transform ${guideOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {guideOpen ? (
          <div className="bg-[#141414] border border-[#222] border-t-0 rounded-b-xl px-6 py-6 leading-relaxed text-sm text-[#bbb]">
            <h3 className="text-green text-[15px] uppercase tracking-wide font-bold mb-2">Jak kalkulačka funguje</h3>
            <p className="mb-4">
              Kalkulačka používá <strong className="text-[#e0e0e0]">Poissonův model</strong> k výpočtu pravděpodobností všech výsledků.
              Nepotřebuješ nic odhadovat — zadáš reálná data a kalkulačka spočítá vše sama.
            </p>

            <h3 className="text-green text-[15px] uppercase tracking-wide font-bold mb-2 mt-5">Kde vzít statistiky</h3>
            <ol className="list-decimal pl-5 mb-4 space-y-1.5">
              <li>
                <strong className="text-[#e0e0e0]">Ligový průměr gólů</strong> — najdeš na Transfermarkt, Flashscore, Soccerway nebo FBref.
              </li>
              <li>
                <strong className="text-[#e0e0e0]">Statistiky týmů</strong> — domácí tým jen z domácích zápasů, hosté jen z venkovních.
              </li>
              <li>
                <strong className="text-[#e0e0e0]">Vzájemné zápasy</strong> — poslední 3 zápasy mezi těmito týmy (H2H na Flashscore).
              </li>
              <li>
                <strong className="text-[#e0e0e0]">Kurzy</strong> — aktuální kurzy z tvé sázkové kanceláře.
              </li>
            </ol>

            <h3 className="text-green text-[15px] uppercase tracking-wide font-bold mb-2 mt-5">Co kalkulačka počítá</h3>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3.5 my-2.5 font-mono text-[13px] text-green text-center leading-loose">
              Útočná síla domácích = vstřelené doma / ligový průměr domácích gólů
              <br />
              Obranná slabost hostů = obdržené venku / ligový průměr domácích gólů
              <br />
              <br />
              λ domácí = útočná síla × obranná slabost × ligový průměr domácích
              <br />
              λ hostů = útočná síla hostů × obranná slabost domácích × ligový průměr hostů
            </div>
            <p className="mb-4">
              Vzájemné zápasy (H2H) upravují výsledné λ s váhami 50/30/20 %. H2H korekce tvoří 20 % finální λ,
              zbylých 80 % je čistý Poisson z ligových statistik.
            </p>

            <h3 className="text-green text-[15px] uppercase tracking-wide font-bold mb-2 mt-5">Jak číst výsledky</h3>
            <ul className="list-disc pl-5 mb-4 space-y-1.5">
              <li>
                <strong className="text-[#e0e0e0]">Model (%)</strong> — pravděpodobnost z Poissonova modelu.
              </li>
              <li>
                <strong className="text-[#e0e0e0]">Implied (%)</strong> — pravděpodobnost naznačená kurzem: 1 / kurz × 100.
              </li>
              <li>
                <strong className="text-[#e0e0e0]">Edge</strong> — rozdíl mezi modelem a implied. Kladný edge = vyšší šance než bookmaker.
              </li>
              <li>
                <strong className="text-[#e0e0e0]">EV</strong> — očekávaný výnos na každou vsazenou 1 Kč. Kladné = value bet.
              </li>
            </ul>

            <h3 className="text-green text-[15px] uppercase tracking-wide font-bold mb-2 mt-5">Kelly kritérium</h3>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3.5 my-2.5 font-mono text-[13px] text-green text-center">
              Kelly % = (pravděpodobnost × kurz − 1) / (kurz − 1)
            </div>

            <div className="bg-green/[0.08] border-l-[3px] border-green px-4 py-3 rounded-r-lg my-3 text-[13px]">
              <strong>💡 Tip:</strong> Minimální doporučený vzorek je 10+ zápasů na tým. Čím víc dat, tím přesnější model.
            </div>
            <div className="bg-green/[0.08] border-l-[3px] border-green px-4 py-3 rounded-r-lg my-3 text-[13px]">
              <strong>💡 Tip:</strong> Edge pod 3 % raději přeskoč — model není tak přesný, aby tak malý rozdíl byl spolehlivý.
            </div>
            <div className="bg-red/[0.08] border-l-[3px] border-red px-4 py-3 rounded-r-lg my-3 text-[13px]">
              <strong>⚠️ Limity modelu:</strong> Poisson předpokládá nezávislost gólů a nezohledňuje formu, zranění,
              červené karty, počasí ani motivaci. Nikdy nesázkuj peníze, které si nemůžeš dovolit ztratit.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
