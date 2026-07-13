import { redirect } from 'next/navigation';
import { isValidSport } from '@/lib/sport-utils';

interface SportyIndexPageProps {
  searchParams: { sport?: string };
}

export default function SportyIndexPage({ searchParams }: SportyIndexPageProps) {
  if (searchParams.sport && isValidSport(searchParams.sport)) {
    redirect(`/sporty/${searchParams.sport}`);
  }
  redirect('/sporty/football');
}
