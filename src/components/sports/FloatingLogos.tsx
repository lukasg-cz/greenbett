interface FloatingLogosProps {
  logos: string[];
}

const positions = [
  { top: '10%', left: '10%', delay: '0s', size: 'normal' },
  { top: '5%', right: '20%', delay: '1s', size: 'normal' },
  { top: '40%', left: '30%', delay: '2s', size: 'normal' },
  { top: '35%', right: '10%', delay: '0.5s', size: 'normal' },
  { top: '65%', left: '15%', delay: '1.5s', size: 'normal' },
  { top: '70%', right: '25%', delay: '3s', size: 'normal' },
  { top: '20%', left: '55%', delay: '2.5s', size: 'large' },
];

export function FloatingLogos({ logos }: FloatingLogosProps) {
  return (
    <div className="relative h-[400px] hidden lg:block">
      {logos.map((logo, i) => {
        const pos = positions[i] ?? positions[0];
        const isLarge = pos.size === 'large';
        return (
          <div
            key={i}
            className={`absolute bg-white rounded flex items-center justify-center shadow-md animate-float ${
              isLarge ? 'w-20 h-20 text-[2.5rem]' : 'w-[70px] h-[70px] text-[2rem]'
            }`}
            style={{
              top: pos.top,
              left: 'left' in pos ? pos.left : undefined,
              right: 'right' in pos ? pos.right : undefined,
              animationDelay: pos.delay,
            }}
          >
            {logo}
          </div>
        );
      })}
    </div>
  );
}
