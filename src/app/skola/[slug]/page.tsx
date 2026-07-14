import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseDetail } from '@/components/school/CourseDetail';
import { ALL_SCHOOL_COURSES, getCourseBySlug } from '@/lib/school-data';

interface CoursePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return ALL_SCHOOL_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: 'Kurz nenalezen' };
  return {
    title: `${course.title} — Škola sázení`,
    description: course.description,
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
