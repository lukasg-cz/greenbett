import { CountUp } from '@/components/home/CountUp';

const stats = [
  { target: 1847, suffix: '+', label: 'Aktivních členů', animated: true },
  { value: '92.4%', label: 'Přesnost signálů', animated: false },
  { value: '18.2%', label: 'Průměrný ROI', animated: false },
  { value: '7', label: 'Sportů', animated: false },
  { value: '24/7', label: 'Podpora', animated: false },
];

export function StatsTicker() {
  return (
    <div className="bg-gray-900 border-t border-b border-gray-800 py-10">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-4 ${i < stats.length - 1 ? 'lg:border-r lg:border-gray-800' : ''}`}
          >
            <div className="text-[2.2rem] font-extrabold text-green">
              {stat.animated && stat.target ? (
                <CountUp target={stat.target} suffix={stat.suffix} />
              ) : (
                stat.value
              )}
            </div>
            <div className="text-[0.72rem] text-gray-400 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
