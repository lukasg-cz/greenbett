import Link from 'next/link';
import type { SchoolCourse } from '@/lib/school-types';

const DIFFICULTY_LABELS = ['', 'Úroveň 1', 'Úroveň 2', 'Úroveň 3', 'Úroveň 4'];

interface CourseCardProps {
  course: SchoolCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/skola/${course.slug}`}
      className="group block bg-dark-card border border-gray-700 rounded-xl p-6 transition-all hover:border-green hover:bg-dark-card-hover no-underline"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center text-green text-xl shrink-0">
          <i className={`fas ${course.icon}`} />
        </div>
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-gray-500 bg-gray-800 px-2 py-1 rounded">
          {DIFFICULTY_LABELS[course.difficulty]}
        </span>
      </div>

      <h3 className="text-white font-bold text-[1.05rem] mb-1 group-hover:text-green transition-colors">
        {course.title}
      </h3>
      <p className="text-gray-500 text-[0.8rem] mb-3">{course.subtitle}</p>
      <p className="text-gray-400 text-[0.85rem] leading-relaxed mb-5 line-clamp-3">
        {course.description}
      </p>

      <div className="flex flex-wrap gap-3 text-[0.72rem] text-gray-500 mb-4">
        <span>
          <i className="fas fa-clock mr-1 text-green" />
          {course.duration}
        </span>
        <span>
          <i className="fas fa-book-open mr-1 text-green" />
          {course.lessons.length} lekcí
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[2rem]">{course.emoji}</span>
        <span className="text-green text-[0.8rem] font-semibold group-hover:underline">
          Otevřít kurz →
        </span>
      </div>
    </Link>
  );
}
