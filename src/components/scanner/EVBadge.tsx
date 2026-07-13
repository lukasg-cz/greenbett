interface EVBadgeProps {
  ev: string;
  evClass: 'ev-high' | 'ev-medium' | 'ev-low';
}

export function EVBadge({ ev, evClass }: EVBadgeProps) {
  return <span className={`ev-badge ${evClass}`}>+{ev}</span>;
}
