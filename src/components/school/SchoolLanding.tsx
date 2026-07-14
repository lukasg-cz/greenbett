'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FilterButton } from '@/components/ui/FilterButton';
import { CourseCard } from '@/components/school/CourseCard';
import {
  SCHOOL_LEVELS,
  getCoursesByLevel,
  getSchoolStats,
  type SchoolLevel,
} from '@/lib/school-data';

const LEVEL_FILTERS: Array<{ id: SchoolLevel | 'all'; label: string }> = [
  { id: 'all', label: 'Všechny kurzy' },
  { id: 'beginner', label: '🌱 Začátečník' },
  { id: 'advanced', label: '📈 Pokročilý' },
  { id: 'professional', label: '🏆 Profesionál' },
];

const FAQ = [
  {
    q: 'V jakém pořadí kurzy studovat?',
    a: 'Začni urovní Začátečník (kurzy 1–4), pak Pokročilý a nakonec Profesionál. V rámci každé úrovně jdi od úrovně 1 k úrovni 4 — každý kurz navazuje na předchozí.',
  },
  {
    q: 'Jsou kurzy zdarma?',
    a: 'Ano, všechny návody na Škole sázení jsou dostupné zdarma. Některé pokročilé nástroje (scanner, signály) mohou vyžadovat předplatné.',
  },
  {
    q: 'Kolik času na jeden kurz?',
    a: 'Každý kurz má 5 lekcí a trvá přibližně 45–90 minut. Doporučujeme jeden kurz týdně a mezitím procvičovat v kalkulačce a na demo zápasech.',
  },
  {
    q: 'Potřebuji matematické znalosti?',
    a: 'Začátečník ne — vše vysvětlujeme od nuly. U Profesionála počítej se základní algebrou a procenty. Kalkulačka ti pomůže s Kelly a EV.',
  },
];

export function SchoolLanding() {
  const [activeLevel, setActiveLevel] = useState<SchoolLevel | 'all'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const stats = getSchoolStats();

  const visibleLevels =
    activeLevel === 'all'
      ? SCHOOL_LEVELS
      : SCHOOL_LEVELS.filter((l) => l.id === activeLevel);

  return (
    <>
      <section className="page-section">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionLabel>Vzdělávání</SectionLabel>
          <h2 className="section-title">
            ŠKOLA <span className="accent">SÁZENÍ</span>
          </h2>
          <p className="section-desc mb-8 max-w-[720px]">
            Kompletní vzdělávací program od úplných základů po profesionální portfolio management.
            12 kurzů, 60 lekcí, 3 úrovně náročnosti.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: String(stats.courses), label: 'Kurzů' },
              { value: String(stats.lessons), label: 'Lekcí' },
              { value: String(stats.levels), label: 'Úrovně' },
              { value: stats.hours, label: 'Hodin obsahu' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-dark-card border border-gray-700 rounded-lg p-5 text-center"
              >
                <div className="text-2xl font-extrabold text-green mb-1">{stat.value}</div>
                <div className="text-[0.75rem] text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap mb-10">
            {LEVEL_FILTERS.map((filter) => (
              <FilterButton
                key={filter.id}
                label={filter.label}
                active={activeLevel === filter.id}
                onClick={() => setActiveLevel(filter.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {visibleLevels.map((level) => {
        const courses = getCoursesByLevel(level.id);
        return (
          <section key={level.id} className="page-section">
            <div className="max-w-[1280px] mx-auto px-6">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <span className="inline-block text-[0.7rem] font-bold uppercase tracking-wider text-green bg-green/10 px-3 py-1 rounded mb-3">
                    {level.badge}
                  </span>
                  <h3 className="text-[1.6rem] font-extrabold uppercase">{level.label}</h3>
                  <p className="text-gray-400 text-[0.9rem] mt-1 max-w-[600px]">{level.tagline}</p>
                </div>
              </div>
              <p className="text-gray-400 text-[0.9rem] leading-relaxed mb-8 max-w-[800px]">
                {level.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="page-section">
        <div className="max-w-[1280px] mx-auto px-6">
          <h3 className="text-[1.4rem] font-extrabold uppercase mb-2">
            Vyzkoušej v <span className="text-green">praxi</span>
          </h3>
          <p className="text-gray-400 text-[0.9rem] mb-8 max-w-[600px]">
            Teorie bez praxe nepomůže. Po každém kurzu si ověř znalosti v našich nástrojích.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/kalkulacka', icon: 'fa-calculator', title: 'Kalkulačka', desc: 'Kelly, flat staking, unit size' },
              { href: '/kurzy', icon: 'fa-balance-scale', title: 'Porovnání kurzů', desc: 'Line shopping v praxi' },
              { href: '/scanner', icon: 'fa-radar', title: 'Value Scanner', desc: 'Detekce EV+ příležitostí' },
              { href: '/glosar', icon: 'fa-book', title: 'Glosář', desc: 'Pojmy ze sázení' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-dark-card border border-gray-700 rounded-lg p-5 hover:border-green transition-all no-underline group"
              >
                <i className={`fas ${tool.icon} text-green text-lg mb-3`} />
                <h4 className="text-white font-bold text-[0.95rem] mb-1 group-hover:text-green transition-colors">
                  {tool.title}
                </h4>
                <p className="text-gray-500 text-[0.8rem]">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="max-w-[900px] mx-auto px-6">
          <h3 className="text-[1.4rem] font-extrabold uppercase mb-8">
            Časté <span className="text-green">otázky</span>
          </h3>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={item.q} className="bg-dark-card border border-gray-700 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 bg-transparent border-none text-white font-semibold text-[0.9rem] cursor-pointer"
                >
                  {item.q}
                  <i className={`fas fa-chevron-down text-green text-sm transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-gray-400 text-[0.88rem] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
