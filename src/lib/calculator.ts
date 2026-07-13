import type { CalcResult, KellyStrategy } from '@/types';

export function calculateKelly(
  bankroll: number,
  odds: number,
  probability: number,
  strategy: KellyStrategy
): CalcResult {
  const prob = probability / 100;
  const q = 1 - prob;
  const b = odds - 1;

  let kellyFraction = 0;
  if (b > 0) {
    kellyFraction = (prob * b - q) / b;
  }
  if (kellyFraction < 0) kellyFraction = 0;

  let stakePercent = 0;
  switch (strategy) {
    case 'kelly':
      stakePercent = kellyFraction;
      break;
    case 'halfkelly':
      stakePercent = kellyFraction / 2;
      break;
    case 'quarterkelly':
      stakePercent = kellyFraction / 4;
      break;
    case 'flat':
      stakePercent = 0.02;
      break;
  }

  const stake = Math.round(bankroll * stakePercent);
  const potentialWin = Math.round(stake * odds);
  const ev = Math.round(stake * (prob * b - q));

  return {
    stake,
    stakePercent,
    ev,
    potentialWin,
  };
}
