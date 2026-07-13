export function formatNumber(value: number, locale = 'cs-CZ'): string {
  return value.toLocaleString(locale);
}

export function formatCurrency(value: number, locale = 'cs-CZ'): string {
  return `${formatNumber(value, locale)} Kč`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: string | Date, locale = 'cs-CZ'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | Date, locale = 'cs-CZ'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getSportEmoji(sport: string): string {
  const emojis: Record<string, string> = {
    football: '⚽',
    hockey: '🏒',
    basketball: '🏀',
    tennis: '🎾',
    baseball: '⚾',
    amfootball: '🏈',
    esports: '🎮',
  };
  return emojis[sport] ?? '🏆';
}

export function getInitials(name: string): string {
  return name
    .split(/[_\s]+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
