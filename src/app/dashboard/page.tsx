'use client';

import Link from 'next/link';
import { SubscriptionStatus } from '@/components/dashboard/SubscriptionStatus';
import { RecentSignals } from '@/components/dashboard/RecentSignals';
import { BankrollTracker } from '@/components/dashboard/BankrollTracker';
import { MOCK_SIGNALS } from '@/lib/api/mock-data';

export default function DashboardPage() {
  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-2xl font-extrabold uppercase mb-8">Klientská zóna</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SubscriptionStatus
            status="active"
            plan="Kvartální"
            periodEnd={new Date(Date.now() + 90 * 86400000).toISOString()}
          />
          <div className="lg:col-span-2">
            <RecentSignals signals={MOCK_SIGNALS} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BankrollTracker />
          <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Rychlé odkazy</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/live', label: 'Live Dashboard', icon: 'fa-tv' },
                { href: '/scanner', label: 'Value Scanner', icon: 'fa-search-dollar' },
                { href: '/kalkulacka', label: 'Kalkulačka', icon: 'fa-calculator' },
                { href: '/vysledky', label: 'Výsledky', icon: 'fa-chart-line' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 p-3 bg-gray-800 rounded-sm text-sm font-semibold no-underline text-gray-300 hover:text-green hover:border-green border border-transparent transition-all"
                >
                  <i className={`fas ${link.icon} text-green`} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
