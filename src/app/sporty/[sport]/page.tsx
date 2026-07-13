import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SportLandingPage } from '@/components/sports/SportLandingPage';
import { getSportPage } from '@/lib/sport-pages-data';
import { isValidSport } from '@/lib/sport-utils';
import type { Sport } from '@/types';

interface SportPageProps {
  params: { sport: string };
}

export async function generateMetadata({ params }: SportPageProps): Promise<Metadata> {
  if (!isValidSport(params.sport)) return { title: 'Sport nenalezen' };
  const content = getSportPage(params.sport as Sport);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export function generateStaticParams() {
  return [
    { sport: 'football' },
    { sport: 'hockey' },
    { sport: 'basketball' },
    { sport: 'tennis' },
    { sport: 'baseball' },
    { sport: 'amfootball' },
    { sport: 'esports' },
  ];
}

export default function SportPage({ params }: SportPageProps) {
  if (!isValidSport(params.sport)) notFound();
  const content = getSportPage(params.sport);
  return <SportLandingPage content={content} />;
}
