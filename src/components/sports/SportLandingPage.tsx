'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SportPageContent } from '@/lib/sport-pages-data';
import { SportNavTabs } from './SportNavTabs';
import { FloatingLogos } from './FloatingLogos';

interface SportLandingPageProps {
  content: SportPageContent;
}

export function SportLandingPage({ content }: SportLandingPageProps) {
  const [activeTool, setActiveTool] = useState(0);
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredRows = content.markets.rows.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.sub.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SportNavTabs />

      {/* Hero — light XTB style */}
      <section className="bg-[#f5f5f5] text-[#111] py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-4 mb-6">
                <span className="text-[0.85rem] text-gray-500">
                  <strong className="text-[#111]">{content.hero.badge1}</strong>
                </span>
                <span className="text-[0.85rem] text-gray-500">
                  <strong className="text-[#111]">{content.hero.badge2}</strong>
                </span>
              </div>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-5 text-[#111]">
                {content.hero.title}{' '}
                <span className="text-green-dark">{content.hero.titleAccent}</span>
              </h1>
              <p className="text-gray-600 text-[1rem] leading-relaxed mb-8 max-w-[520px]">
                {content.hero.subtitle}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href={content.hero.ctaPrimary.href} className="btn-primary">
                  {content.hero.ctaPrimary.label}
                </Link>
                <Link href={content.hero.ctaSecondary.href} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#111] font-semibold text-[0.85rem] border-2 border-gray-300 rounded no-underline hover:border-green-dark hover:text-green-dark transition-all">
                  {content.hero.ctaSecondary.label}
                </Link>
              </div>
            </div>
            <FloatingLogos logos={content.hero.logos} />
          </div>
        </div>
      </section>

      {/* Features — 3 columns */}
      <section className="bg-white text-[#111] py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded mb-4">
            {content.features.sectionTag}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold mb-10 max-w-[600px]">
            {content.features.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features.items.map((item) => (
              <div key={item.title}>
                <div className="w-10 h-10 bg-green/15 rounded-lg flex items-center justify-center text-green-dark text-lg mb-4">
                  <i className={`fas ${item.icon}`} />
                </div>
                <h3 className="font-bold text-[1rem] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-[0.9rem] leading-relaxed mb-3">{item.description}</p>
                {item.link && (
                  <Link href={item.link.href} className="text-green-dark text-[0.85rem] font-semibold no-underline hover:underline">
                    {item.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento cards */}
      <section className="bg-[#f5f5f5] text-[#111] py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {content.bento.map((card, i) => (
              <div
                key={card.title}
                className={`bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-all ${
                  card.size === 'large' ? 'lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center' : ''
                }`}
              >
                <div>
                  <h3 className="text-[1.2rem] font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-[0.9rem] leading-relaxed mb-4">{card.description}</p>
                  <Link href={card.link.href} className="text-green-dark font-semibold text-[0.85rem] no-underline hover:underline">
                    {card.link.label}
                  </Link>
                </div>
                <div className={`text-[4rem] text-center ${card.size === 'large' ? 'lg:text-right' : 'mt-4'}`}>
                  {card.emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools accordion + preview */}
      <section className="bg-white text-[#111] py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded mb-4">
                {content.tools.sectionTag}
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-6">{content.tools.sectionTitle}</h2>
              <Link href={content.tools.cta.href} className="btn-primary mb-8 inline-flex">
                {content.tools.cta.label}
              </Link>
              <div className="space-y-2">
                {content.tools.items.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveTool(i)}
                    className={`w-full text-left p-5 rounded-lg border transition-all ${
                      activeTool === i
                        ? 'border-green-dark bg-white shadow-sm border-b-2'
                        : 'border-gray-200 bg-gray-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-green/15 rounded flex items-center justify-center text-green-dark">
                        <i className={`fas ${item.icon}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[0.9rem] mb-1">{item.title}</h4>
                        {activeTool === i && (
                          <p className="text-gray-600 text-[0.85rem] leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#111] rounded-2xl p-6 text-white self-start">
              <div className="text-[0.7rem] text-gray-400 uppercase tracking-wider mb-4">{content.tools.preview.title}</div>
              <div className="space-y-3">
                {content.tools.preview.lines.map((line) => (
                  <div key={line} className="bg-dark-card border border-gray-700 rounded p-4 text-[0.85rem]">
                    <span className="text-green mr-2">●</span>{line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets table — XTB instrument list style */}
      <section className="bg-[#f5f5f5] text-[#111] py-16">
        <div className="max-w-[1280px] mx-auto px-6 text-center mb-10">
          <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-white px-3 py-1 rounded mb-4">
            {content.markets.sectionTag}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-4">{content.markets.sectionTitle}</h2>
          <Link href={content.markets.cta.href} className="btn-primary inline-flex mb-2">
            Otevřít účet
          </Link>
          <div>
            <Link href={content.markets.cta.href} className="text-green-dark text-[0.85rem] font-semibold no-underline hover:underline">
              {content.markets.cta.label}
            </Link>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3">
                <i className="fas fa-search text-gray-400" />
                <input
                  type="text"
                  placeholder={content.markets.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-[0.9rem] text-[#111]"
                />
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredRows.map((row) => (
                <div key={row.name} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all">
                  <div>
                    <div className="font-bold text-[0.9rem]">{row.name}</div>
                    <div className="text-[0.75rem] text-gray-500">{row.sub}</div>
                  </div>
                  <div className={`text-[0.85rem] font-semibold w-20 text-right ${row.changePositive ? 'text-green-dark' : 'text-red-500'}`}>
                    {row.change}
                  </div>
                  <div className="text-[0.85rem] font-semibold w-28 text-right">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-white text-[#111] py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-[#f5f5f5] rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-gray-200">
            <div>
              <h3 className="text-[1.4rem] font-extrabold mb-3">{content.promo.title}</h3>
              <p className="text-gray-600 text-[0.95rem] mb-5">{content.promo.description}</p>
              <Link href={content.promo.link.href} className="text-green-dark font-semibold no-underline hover:underline">
                {content.promo.link.label}
              </Link>
            </div>
            <div className="text-[5rem] text-center">{content.promo.emoji}</div>
          </div>
        </div>
      </section>

      {/* Spotlight — 2 column */}
      <section className="bg-[#f5f5f5] text-[#111] py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-white px-3 py-1 rounded mb-4">
                {content.spotlight.tag}
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-4">{content.spotlight.title}</h2>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-5">{content.spotlight.description}</p>
              <Link href={content.spotlight.link.href} className="text-green-dark font-semibold no-underline hover:underline">
                {content.spotlight.link.label}
              </Link>
            </div>
            <div className="text-[6rem] text-center">{content.spotlight.emoji}</div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-white text-[#111] py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded mb-4">
            {content.news.sectionTag}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-3">{content.news.sectionTitle}</h2>
          <Link href={content.news.link.href} className="text-green-dark text-[0.85rem] font-semibold no-underline hover:underline mb-8 inline-block">
            {content.news.link.label}
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.news.items.map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-5 hover:border-green-dark hover:shadow-sm transition-all">
                <div className="text-[0.75rem] text-gray-400 mb-3">{item.emoji} · {item.time}</div>
                <h4 className="font-bold text-[0.9rem] mb-4 leading-snug">{item.title}</h4>
                <span className="text-green-dark text-[0.8rem] font-semibold">Více →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-[#f5f5f5] text-[#111] py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-white px-3 py-1 rounded mb-4">
            {content.education.sectionTag}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-3">{content.education.sectionTitle}</h2>
          <Link href={content.education.link.href} className="text-green-dark text-[0.85rem] font-semibold no-underline hover:underline mb-8 inline-block">
            {content.education.link.label}
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.education.items.map((item) => (
              <Link
                key={item.title}
                href="/skola"
                className="relative rounded-xl overflow-hidden h-48 bg-[#222] flex items-end p-5 no-underline group hover:scale-[1.02] transition-transform"
              >
                <div className="absolute inset-0 flex items-center justify-center text-[4rem] opacity-30 group-hover:opacity-50 transition-opacity">
                  {item.emoji}
                </div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-[0.9rem] mb-1 leading-snug">{item.title}</h4>
                  <p className="text-[0.75rem] text-gray-400">Doba čtení: {item.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA — dark */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-[#111] rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-white">
            <div>
              <span className="inline-block text-[0.7rem] font-semibold text-gray-400 border border-gray-600 px-3 py-1 rounded-full mb-4">
                Specializovaná podpora
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-4">Ano, mluvíme česky!</h2>
              <p className="text-gray-400 text-[0.95rem] mb-8">
                V případě jakýchkoli dotazů nás kontaktuj způsobem, který je pro tebe nejpohodlnější.
              </p>
              <div className="flex gap-8">
                {[
                  { icon: 'fa-phone', label: 'Telefon', href: '/kontakt' },
                  { icon: 'fa-envelope', label: 'E-mail', href: '/kontakt' },
                  { icon: 'fa-comments', label: 'Chat', href: '/kontakt' },
                ].map((c) => (
                  <Link key={c.label} href={c.href} className="text-center no-underline text-white hover:text-green transition-all">
                    <div className="w-12 h-12 bg-green/15 rounded-full flex items-center justify-center text-green mx-auto mb-2">
                      <i className={`fas ${c.icon}`} />
                    </div>
                    <span className="text-[0.8rem] font-semibold">{c.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-center text-[5rem]">💬</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f5f5f5] text-[#111] py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block text-[0.75rem] font-semibold text-gray-500 bg-white px-3 py-1 rounded mb-4">
                Často kladené otázky
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-4">Máš ještě otázky?</h2>
              <p className="text-gray-600 text-[0.95rem] mb-5">
                Připravili jsme odpovědi na nejčastější dotazy o sázení na {content.label.toLowerCase()}.
              </p>
              <Link href="/faq" className="text-green-dark font-semibold no-underline hover:underline">
                Navštívit podporu →
              </Link>
            </div>
            <div className="space-y-2">
              {content.faq.map((item, i) => (
                <div key={item.q} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-[0.9rem] bg-transparent border-none cursor-pointer"
                  >
                    {item.q}
                    <i className={`fas fa-chevron-down text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 text-[0.9rem] leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
