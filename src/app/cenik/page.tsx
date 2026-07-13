'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

const plans = [
  {
    id: 'monthly',
    name: 'Měsíční',
    price: '1 490',
    period: 'Kč / měsíc',
    savings: null,
    featured: false,
    features: ['Všechny signály', 'Live dashboard', 'Value scanner', 'Fórum přístup'],
  },
  {
    id: 'quarterly',
    name: 'Kvartální',
    price: '3 490',
    period: 'Kč / 3 měsíce',
    savings: 'Ušetříš 22%',
    featured: true,
    badge: 'NEJOBLÍBENĚJŠÍ',
    features: ['Vše z měsíčního', 'Prioritní podpora', 'Exkluzivní analýzy', 'Telegram signály'],
  },
  {
    id: 'yearly',
    name: 'Roční',
    price: '9 990',
    period: 'Kč / rok',
    savings: 'Ušetříš 44%',
    featured: false,
    features: ['Vše z kvartálního', 'Osobní konzultace', 'VIP komunita', 'Neomezený přístup'],
  },
];

export default function CenikPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    setLoading(planId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message ?? 'Stripe není nakonfigurován. Nastavte STRIPE_SECRET_KEY v .env');
      }
    } catch {
      alert('Chyba při vytváření checkout session');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>Ceník</SectionLabel>
          <h2 className="section-title">
            VYBER SI <span className="accent">PLÁN</span>
          </h2>
          <p className="section-desc mx-auto text-center">
            7 dní zdarma na všechny plány. Žádná kreditní karta při registraci.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white text-dark rounded-lg p-8 relative transition-all ${
                plan.featured
                  ? 'border-2 border-green scale-105 shadow-green-glow z-10'
                  : 'border border-gray-200'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green text-black px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-bold uppercase tracking-wider mb-2">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
              </div>
              {plan.savings && (
                <p className="text-green-dark text-sm font-semibold mb-6">{plan.savings}</p>
              )}
              {!plan.savings && <div className="mb-6" />}

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-check text-green-dark" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-4 rounded font-bold uppercase tracking-wider text-sm cursor-pointer transition-all ${
                  plan.featured
                    ? 'bg-green text-black hover:bg-green-dark'
                    : 'bg-dark text-white hover:bg-gray-800'
                }`}
              >
                {loading === plan.id ? 'Načítání...' : 'Vybrat plán'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
