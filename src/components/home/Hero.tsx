import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/home/CountUp';
import { SignalCard } from '@/components/home/SignalCard';

export function Hero() {
  return (
    <section className="pt-[100px] pb-20 relative overflow-hidden">
      <div
        className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(57, 255, 20, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-green rounded-full text-[0.72rem] font-semibold tracking-[2px] uppercase mb-5">
            <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
            Greenbett Signal Desk Online
          </div>

          <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-black leading-[1.05] uppercase mb-5">
            DOMINUJ
            <br />
            <span className="text-green" style={{ textShadow: '0 0 60px rgba(57, 255, 20, 0.25)' }}>
              KURZŮM
            </span>
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-[460px]">
            Analytický servis pro sázkaře, kteří chtějí vidět víc než kurz. Kombinujeme data, formu týmů,
            pohyb trhu a zkušenost analytiků do jasných sázkových doporučení.
          </p>

          <div className="flex gap-3.5 mb-9 flex-wrap">
            <Button href="/registrace">Začít zdarma →</Button>
            <Button variant="outline" href="/sporty">Prozkoumat sporty ⚽</Button>
          </div>

          <div className="flex gap-8 flex-wrap">
            {[
              { target: 1847, suffix: '+', label: 'Aktivních členů' },
              { target: 92, suffix: '%', label: 'Přesnost' },
              { target: 4100, suffix: '+', label: 'Analyzovaných zápasů' },
              { target: 7, suffix: '', label: 'Sportů' },
            ].map((counter) => (
              <div key={counter.label} className="text-center">
                <div className="text-[1.8rem] font-extrabold text-green">
                  <CountUp target={counter.target} suffix={counter.suffix} />
                </div>
                <div className="text-[0.72rem] text-gray-400 uppercase tracking-wider">
                  {counter.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[420px] lg:max-w-none mx-auto lg:mx-0">
          <SignalCard />
        </div>
      </div>
    </section>
  );
}
