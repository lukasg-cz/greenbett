import { Metadata } from 'next';
import { Suspense } from 'react';
import { SportInstruments } from './SportInstruments';

export const metadata: Metadata = {
  title: 'Sporty',
  description: 'Analytické sázení na fotbal, hokej, basketbal, tenis, baseball, am. fotbal a esporty.',
};

export default function SportyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Načítání...</div>}>
      <SportInstruments />
    </Suspense>
  );
}
