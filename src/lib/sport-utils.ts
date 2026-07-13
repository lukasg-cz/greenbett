import type { Sport } from '@/types';

export const SPORT_IDS: Sport[] = [
  'football',
  'hockey',
  'basketball',
  'tennis',
  'baseball',
  'amfootball',
  'esports',
];

export function isValidSport(value: string | null): value is Sport {
  return value !== null && SPORT_IDS.includes(value as Sport);
}

export function parseSportParam(value: string | null, fallback: Sport | 'all' = 'football'): Sport | 'all' {
  if (value === 'all' || value === null) return fallback;
  return isValidSport(value) ? value : fallback;
}
