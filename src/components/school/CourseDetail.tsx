import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { SchoolCourse } from '@/lib/school-types';
import { SCHOOL_LEVELS, getAdjacentCourses } from '@/lib/school-data';

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Začátečník',
  advanced: 'Pokročilý',
  professional: 'Profesionál',
};

interface CourseDetailProps {
  course: SchoolCourse;
}

export function CourseDetail({ course }: CourseDetailProps) {
  const { prev, next } = getAdjacentCourses(course.slug);
  const levelInfo = SCHOOL_LEVELS.find((l) => l.id === course.level);

  return (
    <>
      <section className="page-section">
        <div className="max-w-[900px] mx-auto px-6">
          <Link href="/skola" className="text-green text-[0.85rem] font-semibold no-underline hover:underline mb-6 inline-block">
            ← Zpět na Školu sázení
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-green bg-green/10 px-3 py-1 rounded">
              {LEVEL_LABELS[course.level]}
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 bg-gray-800 px-3 py-1 rounded">
              Úroveň {course.difficulty}/4
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 bg-gray-800 px-3 py-1 rounded">
              {course.duration}
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 bg-gray-800 px-3 py-1 rounded">
              {course.lessons.length} lekcí
            </span>
          </div>

          <SectionLabel>{levelInfo?.tagline ?? 'Kurz'}</SectionLabel>
          <h1 className="section-title text-[clamp(1.6rem,3.5vw,2.4rem)]">
            {course.title}
          </h1>
          <p className="text-gray-400 text-[1rem] leading-relaxed mb-8 max-w-[700px]">
            {course.description}
          </p>

          {course.prerequisites.length > 0 && (
            <div className="bg-dark-card border border-gray-700 rounded-lg p-5 mb-8">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-400 mb-3">
                Doporučené předchozí kurzy
              </h3>
              <ul className="space-y-1">
                {course.prerequisites.map((req) => (
                  <li key={req} className="text-gray-300 text-[0.9rem]">
                    <i className="fas fa-check text-green mr-2 text-[0.7rem]" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.tools.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {course.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="btn-outline text-[0.75rem] py-2.5 px-5"
                >
                  <i className="fas fa-external-link-alt mr-1" />
                  {tool.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-section">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-[1.3rem] font-extrabold uppercase mb-8">
            Obsah <span className="text-green">kurzu</span>
          </h2>

          <div className="space-y-10">
            {course.lessons.map((lesson, index) => (
              <article
                key={lesson.id}
                id={lesson.id}
                className="bg-dark-card border border-gray-700 rounded-xl p-6 md:p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="w-10 h-10 bg-green/15 text-green font-extrabold rounded-lg flex items-center justify-center shrink-0 text-[0.9rem]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-[1.15rem] mb-1">{lesson.title}</h3>
                    <p className="text-gray-500 text-[0.85rem]">{lesson.summary}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {lesson.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-300 text-[0.92rem] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-5">
                  <h4 className="text-[0.72rem] font-bold uppercase tracking-wider text-green mb-3">
                    Klíčové body
                  </h4>
                  <ul className="space-y-2">
                    {lesson.keyPoints.map((point) => (
                      <li key={point} className="text-gray-400 text-[0.88rem] flex gap-2">
                        <span className="text-green shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/skola/${prev.slug}`}
                className="bg-dark-card border border-gray-700 rounded-lg p-5 hover:border-green transition-all no-underline group"
              >
                <span className="text-[0.7rem] text-gray-500 uppercase tracking-wider">Předchozí kurz</span>
                <div className="text-white font-bold mt-1 group-hover:text-green transition-colors">
                  ← {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/skola/${next.slug}`}
                className="bg-dark-card border border-gray-700 rounded-lg p-5 hover:border-green transition-all no-underline group text-right sm:col-start-2"
              >
                <span className="text-[0.7rem] text-gray-500 uppercase tracking-wider">Další kurz</span>
                <div className="text-white font-bold mt-1 group-hover:text-green transition-colors">
                  {next.title} →
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
