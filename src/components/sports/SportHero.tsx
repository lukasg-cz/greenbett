import { Button } from '@/components/ui/Button';
import { FloatingLogos } from './FloatingLogos';

interface SportHeroProps {
  leagues: string;
  signals: string;
  title: string;
  titleAccent: string;
  titleSuffix?: string;
  description: string;
  logos: string[];
}

export function SportHero({
  leagues,
  signals,
  title,
  titleAccent,
  titleSuffix = '',
  description,
  logos,
}: SportHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center mb-[60px]">
      <div>
        <div className="flex gap-6 mb-5">
          <span className="px-3.5 py-1 bg-gray-800 rounded-full text-[0.75rem] text-gray-300">
            <strong className="text-green">{leagues}</strong>
          </span>
          <span className="px-3.5 py-1 bg-gray-800 rounded-full text-[0.75rem] text-gray-300">
            <strong className="text-green">{signals}</strong>
          </span>
        </div>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight mb-4">
          {title} <span className="text-green">{titleAccent}</span>
          {titleSuffix ? ` ${titleSuffix}` : ''}
        </h2>
        <p className="text-gray-400 text-[0.95rem] leading-relaxed mb-6">{description}</p>
        <Button href="/vysledky">Zobrazit signály →</Button>
      </div>
      <FloatingLogos logos={logos} />
    </div>
  );
}
