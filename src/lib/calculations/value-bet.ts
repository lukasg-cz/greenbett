import { parseDecimalInput } from './poisson';

export type MarketValueBadge = 'value' | 'weak' | 'no';

export interface H2HMatchInput {
  homeGoals: number;
  awayGoals: number;
  weight: number;
}

export interface ValueBetAnalyzeInput {
  leagueAvg: number;
  leagueHomeAvg: number;
  leagueAwayAvg: number;
  homeScored: number;
  homeConceded: number;
  awayScored: number;
  awayConceded: number;
  h2h: H2HMatchInput[];
  odds1: number;
  oddsX: number;
  odds2: number;
  ouLine: number;
  oddsOver: number;
  oddsUnder: number;
  oddsBttsYes: number;
  oddsBttsNo: number;
  bankroll: number;
  kellyFraction: number;
}

export interface MarketAnalysis {
  name: string;
  prob: number;
  odds: number;
  implied: number;
  edge: number;
  ev: number;
  valid: boolean;
  badge: MarketValueBadge;
}

export interface ValueBetAnalyzeResult {
  lambdaHome: number;
  lambdaAway: number;
  lambdaHomeBase: number;
  lambdaAwayBase: number;
  h2hValid: boolean;
  h2hHomeGoals: number;
  h2hAwayGoals: number;
  h2hSummaries: string[];
  markets: MarketAnalysis[];
  bestMarket: MarketAnalysis | null;
  stake: {
    fullKelly: number;
    yourKelly: number;
    flat: number;
    kellyFullPct: number;
    kellyYourPct: number;
  } | null;
}

export const VALUE_BET_DEFAULTS = {
  leagueAvg: 2.7,
  leagueHomeAvg: 1.5,
  leagueAwayAvg: 1.2,
  homeScored: 1.8,
  homeConceded: 0.9,
  homeSample: 15,
  awayScored: 1.1,
  awayConceded: 1.5,
  awaySample: 15,
  h2h: [
    { homeGoals: 2, awayGoals: 1, weight: 0.5 },
    { homeGoals: 1, awayGoals: 1, weight: 0.3 },
    { homeGoals: 3, awayGoals: 0, weight: 0.2 },
  ],
  odds1: 2.1,
  oddsX: 3.4,
  odds2: 3.5,
  ouLine: 2.5,
  oddsOver: 1.85,
  oddsUnder: 1.95,
  oddsBttsYes: 1.75,
  oddsBttsNo: 2.0,
  bankroll: 10000,
  kellyPercent: 25,
};

export const OU_LINE_OPTIONS = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function poissonPMF(lambda: number, k: number): number {
  if (lambda === 0 && k === 0) return 1;
  if (lambda === 0) return 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

function computePoissonProbs(lambdaHome: number, lambdaAway: number, ouLine: number) {
  const maxG = 10;
  const homeProbs: number[] = [];
  const awayProbs: number[] = [];

  for (let i = 0; i <= maxG; i++) {
    homeProbs[i] = poissonPMF(lambdaHome, i);
    awayProbs[i] = poissonPMF(lambdaAway, i);
  }

  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let bttsYes = 0;
  let overProb = 0;
  const threshold = Math.floor(ouLine);

  for (let hg = 0; hg <= maxG; hg++) {
    for (let ag = 0; ag <= maxG; ag++) {
      const p = homeProbs[hg] * awayProbs[ag];
      if (hg > ag) homeWin += p;
      else if (hg === ag) draw += p;
      else awayWin += p;
      if (hg >= 1 && ag >= 1) bttsYes += p;
      if (hg + ag > threshold) overProb += p;
    }
  }

  return {
    homeWin,
    draw,
    awayWin,
    bttsYes,
    bttsNo: 1 - bttsYes,
    overProb,
    underProb: 1 - overProb,
  };
}

function analyzeMarket(name: string, prob: number, odds: number): MarketAnalysis {
  if (!Number.isFinite(odds) || odds <= 1) {
    return { name, prob, odds, implied: 0, edge: 0, ev: -1, valid: false, badge: 'no' };
  }
  const implied = 1 / odds;
  const edge = prob - implied;
  const ev = prob * odds - 1;
  let badge: MarketValueBadge = 'no';
  if (ev > 0.05) badge = 'value';
  else if (ev > 0) badge = 'weak';
  return { name, prob, odds, implied, edge, ev, valid: true, badge };
}

export function validateValueBetInput(input: ValueBetAnalyzeInput): string | null {
  const required = [
    input.leagueAvg,
    input.leagueHomeAvg,
    input.leagueAwayAvg,
    input.homeScored,
    input.homeConceded,
    input.awayScored,
    input.awayConceded,
    input.odds1,
    input.oddsX,
    input.odds2,
    input.bankroll,
  ];
  if (required.some((v) => !Number.isFinite(v) || v <= 0)) {
    return 'Zkontroluj všechny vstupy — musí být kladná čísla.';
  }
  if (input.kellyFraction <= 0 || input.kellyFraction > 1) {
    return 'Kelly frakce musí být mezi 10 % a 100 %.';
  }
  return null;
}

export function analyzeValueBet(input: ValueBetAnalyzeInput): ValueBetAnalyzeResult {
  const {
    leagueHomeAvg,
    leagueAwayAvg,
    homeScored,
    homeConceded,
    awayScored,
    awayConceded,
    h2h,
    ouLine,
    bankroll,
    kellyFraction,
  } = input;

  const homeAttack = homeScored / leagueHomeAvg;
  const homeDefense = homeConceded / leagueAwayAvg;
  const awayAttack = awayScored / leagueAwayAvg;
  const awayDefense = awayConceded / leagueHomeAvg;

  const lambdaHomeBase = homeAttack * awayDefense * leagueHomeAvg;
  const lambdaAwayBase = awayAttack * homeDefense * leagueAwayAvg;

  let h2hHomeGoals = 0;
  let h2hAwayGoals = 0;
  let h2hValid = true;
  const h2hSummaries: string[] = [];

  for (const match of h2h) {
    if (!Number.isFinite(match.homeGoals) || !Number.isFinite(match.awayGoals)) {
      h2hValid = false;
      break;
    }
    h2hHomeGoals += match.homeGoals * match.weight;
    h2hAwayGoals += match.awayGoals * match.weight;
    const result =
      match.homeGoals > match.awayGoals
        ? 'výhra domácích'
        : match.homeGoals === match.awayGoals
          ? 'remíza'
          : 'výhra hostů';
    h2hSummaries.push(`${match.homeGoals}:${match.awayGoals} (${result})`);
  }

  const h2hWeight = 0.2;
  let lambdaHome = h2hValid
    ? lambdaHomeBase * (1 - h2hWeight) + h2hHomeGoals * h2hWeight
    : lambdaHomeBase;
  let lambdaAway = h2hValid
    ? lambdaAwayBase * (1 - h2hWeight) + h2hAwayGoals * h2hWeight
    : lambdaAwayBase;

  lambdaHome = Math.max(lambdaHome, 0.05);
  lambdaAway = Math.max(lambdaAway, 0.05);

  const probs = computePoissonProbs(lambdaHome, lambdaAway, ouLine);

  const markets: MarketAnalysis[] = [
    analyzeMarket('1 (Domácí)', probs.homeWin, input.odds1),
    analyzeMarket('X (Remíza)', probs.draw, input.oddsX),
    analyzeMarket('2 (Hosté)', probs.awayWin, input.odds2),
    analyzeMarket(`Over ${ouLine.toFixed(1)}`, probs.overProb, input.oddsOver),
    analyzeMarket(`Under ${ouLine.toFixed(1)}`, probs.underProb, input.oddsUnder),
    analyzeMarket('BTTS Ano', probs.bttsYes, input.oddsBttsYes),
    analyzeMarket('BTTS Ne', probs.bttsNo, input.oddsBttsNo),
  ];

  let bestMarket: MarketAnalysis | null = null;
  let bestEV = -999;

  for (const market of markets) {
    if (!market.valid) continue;
    if (market.ev > bestEV) {
      bestEV = market.ev;
      bestMarket = market;
    }
  }

  let stake: ValueBetAnalyzeResult['stake'] = null;
  if (bestMarket && bestEV > 0) {
    let kellyFull = (bestMarket.prob * bestMarket.odds - 1) / (bestMarket.odds - 1);
    if (kellyFull < 0) kellyFull = 0;
    const kellyYour = kellyFull * kellyFraction;
    stake = {
      fullKelly: kellyFull * bankroll,
      yourKelly: kellyYour * bankroll,
      flat: 0.02 * bankroll,
      kellyFullPct: kellyFull * 100,
      kellyYourPct: kellyYour * 100,
    };
  }

  return {
    lambdaHome,
    lambdaAway,
    lambdaHomeBase,
    lambdaAwayBase,
    h2hValid,
    h2hHomeGoals,
    h2hAwayGoals,
    h2hSummaries,
    markets: markets.filter((m) => m.valid),
    bestMarket: bestEV > 0 ? bestMarket : null,
    stake,
  };
}

export function formatPercentNum(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)} %`;
}

export function formatPercentSignedNum(value: number, digits = 1): string {
  const pct = (value * 100).toFixed(digits);
  return `${value >= 0 ? '+' : ''}${pct} %`;
}

export function formatCZK(value: number): string {
  if (value <= 0) return '0 Kč';
  return `${Math.round(value).toLocaleString('cs-CZ')} Kč`;
}

export { parseDecimalInput };
