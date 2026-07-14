export interface PoissonInput {
  lambdaHome: number;
  lambdaAway: number;
  maxGoals: number;
}

export interface OutcomeProbabilities {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface OverUnderProbabilities {
  line: number;
  over: number;
  under: number;
}

export interface BTTSProbabilities {
  bothScoreYes: number;
  bothScoreNo: number;
}

export interface MostLikelyScore {
  homeGoals: number;
  awayGoals: number;
  probability: number;
}

export interface PoissonResult {
  matrix: number[][];
  displayMaxGoals: number;
  safeMax: number;
  maxProb: number;
  outcomes: OutcomeProbabilities;
  overUnder: OverUnderProbabilities[];
  btts: BTTSProbabilities;
  mostLikelyScore: MostLikelyScore;
}

export const OVER_UNDER_LINES = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5] as const;

export const POISSON_DEFAULTS = {
  lambdaHome: 1.5,
  lambdaAway: 1.2,
  maxGoals: 4,
};

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function poissonPMF(lambda: number, k: number): number {
  if (lambda < 0 || k < 0) return 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export function parseDecimalInput(value: string): number {
  return parseFloat(value.trim().replace(',', '.'));
}

export function formatDecimalInput(value: number): string {
  return String(value).replace('.', ',');
}

export function validatePoissonInput(input: PoissonInput): string | null {
  if (!Number.isFinite(input.lambdaHome) || !Number.isFinite(input.lambdaAway)) {
    return 'Zadej platné hodnoty λ (kladná čísla).';
  }
  if (input.lambdaHome < 0 || input.lambdaAway < 0) {
    return 'Zadej platné hodnoty λ (kladná čísla).';
  }
  if (input.maxGoals < 3 || input.maxGoals > 8 || !Number.isInteger(input.maxGoals)) {
    return 'Max gólů musí být celé číslo mezi 3 a 8.';
  }
  return null;
}

export function calculatePoisson(input: PoissonInput): PoissonResult {
  const { lambdaHome, lambdaAway, maxGoals } = input;
  const safeMax = Math.max(maxGoals, 10);

  const homeProbs: number[] = [];
  const awayProbs: number[] = [];
  for (let i = 0; i <= safeMax; i++) {
    homeProbs[i] = poissonPMF(lambdaHome, i);
    awayProbs[i] = poissonPMF(lambdaAway, i);
  }

  const matrix: number[][] = [];
  let maxProb = 0;
  for (let h = 0; h <= safeMax; h++) {
    matrix[h] = [];
    for (let a = 0; a <= safeMax; a++) {
      const probability = homeProbs[h] * awayProbs[a];
      matrix[h][a] = probability;
      if (probability > maxProb) maxProb = probability;
    }
  }

  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let mostLikelyScore: MostLikelyScore = { homeGoals: 0, awayGoals: 0, probability: 0 };

  for (let h = 0; h <= safeMax; h++) {
    for (let a = 0; a <= safeMax; a++) {
      const probability = matrix[h][a];
      if (h > a) homeWin += probability;
      else if (h === a) draw += probability;
      else awayWin += probability;

      if (probability > mostLikelyScore.probability) {
        mostLikelyScore = { homeGoals: h, awayGoals: a, probability };
      }
    }
  }

  let bothScoreYes = 0;
  for (let h = 1; h <= safeMax; h++) {
    for (let a = 1; a <= safeMax; a++) {
      bothScoreYes += matrix[h][a];
    }
  }
  const bothScoreNo = 1 - bothScoreYes;

  const overUnder: OverUnderProbabilities[] = OVER_UNDER_LINES.map((line) => {
    const threshold = Math.floor(line);
    let under = 0;
    for (let h = 0; h <= safeMax; h++) {
      for (let a = 0; a <= safeMax; a++) {
        if (h + a <= threshold) under += matrix[h][a];
      }
    }
    return { line, under, over: 1 - under };
  });

  return {
    matrix,
    displayMaxGoals: maxGoals,
    safeMax,
    maxProb,
    outcomes: { homeWin, draw, awayWin },
    overUnder,
    btts: { bothScoreYes, bothScoreNo },
    mostLikelyScore,
  };
}

export function formatPercent(probability: number, digits = 1): string {
  return `${(probability * 100).toFixed(digits)} %`;
}

export function heatColor(probability: number, maxProb: number): string {
  const ratio = maxProb > 0 ? probability / maxProb : 0;
  const boosted = Math.pow(ratio, 0.6);
  const r = Math.round(26 + boosted * (76 - 26));
  const g = Math.round(46 + boosted * (175 - 46));
  const b = Math.round(26 + boosted * (80 - 26));
  return `rgb(${r}, ${g}, ${b})`;
}
