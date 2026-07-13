import { formatDate } from '@/lib/utils';

interface SubscriptionStatusProps {
  status: 'active' | 'expired' | 'canceled';
  plan: string;
  periodEnd?: string;
}

export function SubscriptionStatus({ status, plan, periodEnd }: SubscriptionStatusProps) {
  const statusColors = {
    active: 'text-green border-green',
    expired: 'text-red border-red',
    canceled: 'text-yellow border-yellow',
  };

  const statusLabels = {
    active: 'Aktivní',
    expired: 'Expirované',
    canceled: 'Zrušené',
  };

  return (
    <div className={`bg-dark-card border rounded-lg p-6 ${statusColors[status]}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Předplatné</h3>
          <p className="text-xl font-extrabold capitalize">{plan}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      {periodEnd && status === 'active' && (
        <p className="text-gray-400 text-sm mt-3">
          Platné do: {formatDate(periodEnd)}
        </p>
      )}
    </div>
  );
}
