export type Sport =
  | 'football'
  | 'hockey'
  | 'basketball'
  | 'tennis'
  | 'baseball'
  | 'amfootball'
  | 'esports';

export type SignalStatus = 'pending' | 'win' | 'loss' | 'void' | 'push';

export type UserRole = 'user' | 'premium' | 'analyst' | 'admin';

export type SubscriptionPlan = 'trial' | 'monthly' | 'quarterly' | 'yearly';

export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'past_due';

export interface Match {
  id?: string;
  apiId?: string;
  league: string;
  home: string;
  away: string;
  homeIcon: string;
  awayIcon: string;
  score: string;
  time: string;
  live: boolean;
  sport: Sport;
  odds: [string, string, string];
}

export interface Odds {
  matchId: string;
  bookmaker: string;
  market: string;
  value: number;
}

export interface Signal {
  id: string;
  analystId?: string;
  sport: Sport;
  league: string;
  matchHome: string;
  matchAway: string;
  market: string;
  odds: number;
  confidence: number;
  unitSize: number;
  status: SignalStatus;
  apiMatchId?: string;
  kickoffAt?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  initials: string;
  tips: number;
  hitRate: string;
  roi: string;
  profit: string;
  streak: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  threadCount: number;
  latestTitle: string;
  latestAuthor: string;
  latestTime: string;
}

export interface ForumThread {
  id: string;
  categoryId: string;
  userId: string;
  title: string;
  isPinned: boolean;
  isLocked: boolean;
  replyCount: number;
  lastReplyAt?: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  threadId: string;
  userId: string;
  content: string;
  isEdited: boolean;
  createdAt: string;
}

export interface LeagueStat {
  name: string;
  sport: Sport;
  league: string;
  stats: Record<string, string>;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  createdAt: string;
}

export interface ValueBet {
  match: string;
  league: string;
  market: string;
  odds: string;
  fair: string;
  ev: string;
  evClass: 'ev-high' | 'ev-medium' | 'ev-low';
  conf: string;
  sport: Sport;
  evPercent: number;
}

export interface SportData {
  id: Sport;
  label: string;
  emoji: string;
  leagues: string;
  signals: string;
  title: string;
  titleAccent: string;
  description: string;
  features?: Array<{ icon: string; title: string; description: string }>;
  logos: string[];
}

export interface CalcResult {
  stake: number;
  stakePercent: number;
  ev: number;
  potentialWin: number;
}

export type KellyStrategy = 'kelly' | 'halfkelly' | 'quarterkelly' | 'flat';
