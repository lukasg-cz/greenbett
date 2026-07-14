import { parseDecimalInput } from './poisson';

export type ValueBetMode = 'quick' | 'advanced';

export type ValueBetType =
  | '1x2-home'
  | '1x2-draw'
  | '1x2-away'
  | 'over'
  | 'under'
  | 'btts-yes'
  | 'btts-no';

export type ValueBetVerdict = 'value' | 'weak-value' | 'no-value';

export interface ValueBetQuickInput {
  myProbPercent: number;
  odds: number;
}

export interface ValueBetAdvancedInput {
  betType: ValueBetType;
  homeScored: number;
  homeConceded: number;
  awayScored: number;
  awayConceded: number;
  leagueAvg: number;
  odds: number;
  ouLine: number;
}

export interface ValueBetCalculateInput {
  mode: ValueBetMode;
  bankroll: number;
  kellyFraction: number;
  quick: ValueBetQuickInput;
  advanced: ValueBetAdvancedInput;
}

export interface PoissonDerivedProb {
  lambdaHome: number;
  lambdaAway: number;
  myProb: number;
}

export interface ValueBetResult {
  myProb: number;
  odds: number;
  impliedProb: number;
  ev: number;
  edge: number;
  kellyFull: number;
  kellyYour: number;
  stakeFullKelly: number;
  stakeYourKelly: number;
  stakeFlat: number;
  verdict: ValueBetVerdict;
  poisson?: PoissonDerivedProb;
  stakeBarPercent: number;
  stakeBarLevel: 'safe' | 'moderate' | 'risky';
}

export const VALUE_BET_DEFAULTS = {
  quick: { myProbPercent: 55, odds: 2.1 },
  advanced: {
    betType: '1x2-home' as ValueBetType,
    homeScored: 1.8,
    homeConceded: 0.9,
    awayScored: 1.1,
    awayConceded: 1.5,
    leagueAvg: 2.7,
    odds: 2.1,
    ouLine: 2.5,
  },
  bankroll: 10000,
  kellyPercent: 25,
};

export const BET_TYPE_OPTIONS: Array<{ id: ValueBetType; label: string }> = [
  { id: '1x2-home', label: '1 (domácí)' },
  { id: '1x2-draw', label: 'X (remíza)' },
  { id: '1x2-away', label: '2 (hosté)' },
  { id: 'over', label: 'Over 2.5' },
  { id: 'under', label: 'Under 2.5' },
  { id: 'btts-yes', label: 'BTTS Ano' },
  { id: 'btts-no', label: 'BTTS Ne' },
];

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function poissonPMF(lambda: number, k: number): number {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export function calcPoissonBetProbability(
  lambdaHome: number,
  lambdaAway: number,
  betType: ValueBetType,
  ouLine: number
): number {
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

  for (let h = 0; h <= maxG; h++) {
    for (let a = 0; a <= maxG; a++) {
      const p = homeProbs[h] * awayProbs[a];
      if (h > a) homeWin += p;
      else if (h === a) draw += p;
      else awayWin += p;

      if (h >= 1 && a >= 1) bttsYes += p;
      if (h + a > threshold) overProb += p;
    }
  }

  switch (betType) {
    case '1x2-home':
      return homeWin;
    case '1x2-draw':
      return draw;
    case '1x2-away':
      return awayWin;
    case 'over':
      return overProb;
    case 'under':
      return 1 - overProb;
    case 'btts-yes':
      return bttsYes;
    case 'btts-no':
      return 1 - bttsYes;
    default:
      return homeWin;
  }
}

export function computeLambdasFromStats(
  homeScored: number,
  homeConceded: number,
  awayScored: number,
  awayConceded: number,
  leagueAvg: number
): { lambdaHome: number; lambdaAway: number } {
  const avgPerTeam = leagueAvg / 2;
  const homeAttack = homeScored / avgPerTeam;
  const homeDefense = homeConceded / avgPerTeam;
  const awayAttack = awayScored / avgPerTeam;
  const awayDefense = awayConceded / avgPerTeam;

  return {
    lambdaHome: homeAttack * awayDefense * avgPerTeam,
    lambdaAway: awayAttack * homeDefense * avgPerTeam,
  };
}

export function validateValueBetInput(input: ValueBetCalculateInput): string | null {
  const { bankroll, kellyFraction } = input;

  if (!Number.isFinite(bankroll) || bankroll <= 0) {
    return 'Zkontroluj zadané hodnoty. Bankroll musí být > 0.';
  }

  if (kellyFraction <= 0 || kellyFraction > 1) {
    return 'Kelly frakce musí být mezi 10 % a 100 %.';
  }

  if (input.mode === 'quick') {
    const prob = input.quick.myProbPercent;
    const odds = input.quick.odds;
    if (
      !Number.isFinite(prob) ||
      !Number.isFinite(odds) ||
      prob <= 0 ||
      prob > 100 ||
      odds <= 1
    ) {
      return 'Zkontroluj zadané hodnoty. Pravděpodobnost 1–100 %, kurz > 1.';
    }
    return null;
  }

  const adv = input.advanced;
  const values = [
    adv.homeScored,
    adv.homeConceded,
    adv.awayScored,
    adv.awayConceded,
    adv.leagueAvg,
    adv.odds,
    adv.ouLine,
  ];
  if (values.some((v) => !Number.isFinite(v) || v < 0) || adv.odds <= 1) {
    return 'Zkontroluj statistiky týmů a kurz bookmakera.';
  }

  return null;
}

export function calculateValueBet(input: ValueBetCalculateInput): ValueBetResult {
  const { mode, bankroll, kellyFraction } = input;
  let myProb: number;
  let odds: number;
  let poisson: PoissonDerivedProb | undefined;

  if (mode === 'quick') {
    myProb = input.quick.myProbPercent / 100;
    odds = input.quick.odds;
  } else {
    const adv = input.advanced;
    odds = adv.odds;
    const { lambdaHome, lambdaAway } = computeLambdasFromStats(
      adv.homeScored,
      adv.homeConceded,
      adv.awayScored,
      adv.awayConceded,
      adv.leagueAvg
    );
    myProb = calcPoissonBetProbability(lambdaHome, lambdaAway, adv.betType, adv.ouLine);
    poisson = { lambdaHome, lambdaAway, myProb };
  }

  const impliedProb = 1 / odds;
  const ev = myProb * odds - 1;
  const edge = myProb - impliedProb;

  let kellyFull = (myProb * odds - 1) / (odds - 1);
  if (kellyFull < 0) kellyFull = 0;
  const kellyYour = kellyFull * kellyFraction;
  const flat = 0.02;

  let verdict: ValueBetVerdict = 'no-value';
  if (ev > 0.05) verdict = 'value';
  else if (ev > 0) verdict = 'weak-value';

  const kellyYourPercent = kellyYour * 100;
  const stakeBarPercent = Math.min((kellyYourPercent / 25) * 100, 100);
  let stakeBarLevel: 'safe' | 'moderate' | 'risky' = 'risky';
  if (kellyYourPercent < 3) stakeBarLevel = 'safe';
  else if (kellyYourPercent < 8) stakeBarLevel = 'moderate';

  return {
    myProb,
    odds,
    impliedProb,
    ev,
    edge,
    kellyFull,
    kellyYour,
    stakeFullKelly: kellyFull * bankroll,
    stakeYourKelly: kellyYour * bankroll,
    stakeFlat: flat * bankroll,
    verdict,
    poisson,
    stakeBarPercent,
    stakeBarLevel,
  };
}

export function formatPercentSigned(value: number, digits = 1): string {
  const pct = (value * 100).toFixed(digits);
  return `${value >= 0 ? '+' : ''}${pct} %`;
}

export function formatPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)} %`;
}

export function formatCZK(value: number): string {
  if (value < 0) return '0 Kč';
  return `${Math.round(value).toLocaleString('cs-CZ')} Kč`;
}

export { parseDecimalInput };
