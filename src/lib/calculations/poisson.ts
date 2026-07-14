export interface PoissonInput {
  lambdaHome: number;
  lambdaAway: number;
  maxGoals: number;
}

export interface ScoreProbability {
  homeGoals: number;
  awayGoals: number;
  probability: number;
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

export interface PoissonResult {
  scores: ScoreProbability[];
  outcomes: OutcomeProbabilities;
  overUnder: OverUnderProbabilities[];
  btts: BTTSProbabilities;
  mostLikelyScore: ScoreProbability;
}

const OVER_UNDER_LINES = [0.5, 1.5, 2.5, 3.5, 4.5] as const;

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function poissonPMF(lambda: number, k: number): number {
  if (lambda < 0 || k < 0) return 0;
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function validatePoissonInput(input: PoissonInput): string | null {
  if (input.lambdaHome < 0 || input.lambdaAway < 0) {
    return 'Očekávané góly (λ) musí být ≥ 0.';
  }
  if (!Number.isFinite(input.lambdaHome) || !Number.isFinite(input.lambdaAway)) {
    return 'Zadej platná čísla pro očekávané góly.';
  }
  if (input.maxGoals < 3 || input.maxGoals > 8 || !Number.isInteger(input.maxGoals)) {
    return 'Max gólů musí být celé číslo mezi 3 a 8.';
  }
  return null;
}

export function calculatePoisson(input: PoissonInput): PoissonResult {
  const { lambdaHome, lambdaAway, maxGoals } = input;
  const scores: ScoreProbability[] = [];
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let mostLikelyScore: ScoreProbability = { homeGoals: 0, awayGoals: 0, probability: 0 };

  for (let h = 0; h <= maxGoals; h++) {
    const pHome = poissonPMF(lambdaHome, h);
    for (let a = 0; a <= maxGoals; a++) {
      const probability = clamp01(pHome * poissonPMF(lambdaAway, a));
      const score: ScoreProbability = { homeGoals: h, awayGoals: a, probability };
      scores.push(score);

      if (h > a) homeWin += probability;
      else if (h === a) draw += probability;
      else awayWin += probability;

      if (probability > mostLikelyScore.probability) {
        mostLikelyScore = score;
      }
    }
  }

  const maxTotalGoals = maxGoals * 2;
  const totalGoalsDist: number[] = [];
  for (let t = 0; t <= maxTotalGoals; t++) {
    let prob = 0;
    for (let h = 0; h <= t; h++) {
      const a = t - h;
      if (a >= 0 && a <= maxGoals && h <= maxGoals) {
        prob += poissonPMF(lambdaHome, h) * poissonPMF(lambdaAway, a);
      }
    }
    totalGoalsDist[t] = clamp01(prob);
  }

  const overUnder: OverUnderProbabilities[] = OVER_UNDER_LINES.map((line) => {
    const upper = Math.floor(line);
    let under = 0;
    for (let t = 0; t <= upper; t++) {
      under += totalGoalsDist[t] ?? 0;
    }
    under = clamp01(under);
    return { line, under, over: clamp01(1 - under) };
  });

  const pHomeZero = poissonPMF(lambdaHome, 0);
  const pAwayZero = poissonPMF(lambdaAway, 0);
  const pBothZero = pHomeZero * pAwayZero;
  const bothScoreNo = clamp01(pHomeZero + pAwayZero - pBothZero);
  const bothScoreYes = clamp01(1 - bothScoreNo);

  return {
    scores,
    outcomes: {
      homeWin: clamp01(homeWin),
      draw: clamp01(draw),
      awayWin: clamp01(awayWin),
    },
    overUnder,
    btts: { bothScoreYes, bothScoreNo },
    mostLikelyScore,
  };
}

export function formatPercent(probability: number, digits = 1): string {
  return `${(probability * 100).toFixed(digits)} %`;
}

export function getScoreMatrix(
  scores: ScoreProbability[],
  maxGoals: number
): number[][] {
  const matrix: number[][] = Array.from({ length: maxGoals + 1 }, () =>
    Array(maxGoals + 1).fill(0)
  );
  for (const score of scores) {
    matrix[score.homeGoals][score.awayGoals] = score.probability;
  }
  return matrix;
}
