import { ConfidenceBar } from '@/components/ui/ConfidenceBar';

export function SignalCard() {
  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-8 shadow-green-glow">
      <div className="flex justify-between items-center mb-5">
        <span className="text-[0.8rem] font-bold tracking-[2px]">LIVE SIGNAL</span>
        <span className="bg-green text-black px-3 py-1 rounded-full text-[0.65rem] font-bold">
          PŘED VÝKOPEM
        </span>
      </div>

      <div className="flex items-center justify-center gap-5 my-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
            ⚽
          </div>
          <div className="text-[0.8rem] font-semibold">Sparta</div>
        </div>
        <div className="text-[0.75rem] text-gray-400 font-bold">VS</div>
        <div className="text-center">
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
            ⚽
          </div>
          <div className="text-[0.8rem] font-semibold">Slavia</div>
        </div>
      </div>

      <div className="text-center p-4 bg-gray-800 rounded mb-4">
        <div className="text-[0.65rem] text-gray-400 tracking-[2px] mb-1">PICK</div>
        <div className="text-[1.3rem] font-extrabold text-green">OVER 2.5 GÓLŮ</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Kurz', value: '1.82' },
          { label: 'Confidence', value: '7.8/10' },
          { label: 'Unit size', value: '2U' },
          { label: 'Liga', value: 'Chance Liga', small: true },
        ].map((item) => (
          <div key={item.label} className="p-3 bg-gray-800 rounded-sm text-center">
            <div className="text-[0.6rem] text-gray-400 tracking-wider uppercase">{item.label}</div>
            <div className={`font-bold mt-0.5 ${item.small ? 'text-[0.8rem]' : 'text-lg'}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <ConfidenceBar value={7.8} />
    </div>
  );
}
