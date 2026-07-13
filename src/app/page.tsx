import { Hero } from '@/components/home/Hero';
import { StatsTicker } from '@/components/home/StatsTicker';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsTicker />
      <section className="text-center py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionLabel>Limitovaná nabídka</SectionLabel>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold uppercase mb-3">
            PŘIPRAVEN <span className="text-green">DOMINOVAT?</span>
          </h2>
          <p className="text-gray-400 text-[0.95rem] max-w-[600px] mx-auto mb-10 leading-relaxed">
            Přidej se k tisícům spokojených klientů. 7 dní zdarma, žádná kreditní karta.
          </p>
          <Button href="/registrace" className="text-base !px-12 !py-5">
            Začít nyní →
          </Button>
        </div>
      </section>
    </>
  );
}
