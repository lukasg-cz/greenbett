export type SchoolLevel = 'beginner' | 'advanced' | 'professional';

export interface SchoolLesson {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  keyPoints: string[];
}

export interface SchoolCourse {
  slug: string;
  level: SchoolLevel;
  difficulty: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: string;
  emoji: string;
  prerequisites: string[];
  tools: Array<{ label: string; href: string }>;
  lessons: SchoolLesson[];
}

export interface SchoolLevelInfo {
  id: SchoolLevel;
  label: string;
  tagline: string;
  description: string;
  badge: string;
}
