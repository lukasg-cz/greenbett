import type { SchoolCourse, SchoolLevel } from './school-types';
import { BEGINNER_COURSES } from './school-courses-beginner';
import { ADVANCED_COURSES } from './school-courses-advanced';
import { PROFESSIONAL_COURSES } from './school-courses-professional';

export * from './school-types';
export { SCHOOL_LEVELS } from './school-levels';

export const ALL_SCHOOL_COURSES: SchoolCourse[] = [
  ...BEGINNER_COURSES,
  ...ADVANCED_COURSES,
  ...PROFESSIONAL_COURSES,
];

export function getCoursesByLevel(level: SchoolLevel): SchoolCourse[] {
  return ALL_SCHOOL_COURSES.filter((c) => c.level === level).sort(
    (a, b) => a.difficulty - b.difficulty
  );
}

export function getCourseBySlug(slug: string): SchoolCourse | undefined {
  return ALL_SCHOOL_COURSES.find((c) => c.slug === slug);
}

export function getAdjacentCourses(slug: string): {
  prev: SchoolCourse | null;
  next: SchoolCourse | null;
} {
  const index = ALL_SCHOOL_COURSES.findIndex((c) => c.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? ALL_SCHOOL_COURSES[index - 1] : null,
    next: index < ALL_SCHOOL_COURSES.length - 1 ? ALL_SCHOOL_COURSES[index + 1] : null,
  };
}

export function getSchoolStats() {
  const totalLessons = ALL_SCHOOL_COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  return {
    courses: ALL_SCHOOL_COURSES.length,
    lessons: totalLessons,
    levels: 3,
    hours: '14+',
  };
}
