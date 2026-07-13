interface ConfidenceBarProps {
  value: number;
  max?: number;
}

export function ConfidenceBar({ value, max = 10 }: ConfidenceBarProps) {
  const percent = (value / max) * 100;
  return (
    <div className="h-1.5 bg-gray-700 rounded-sm overflow-hidden mt-4">
      <div
        className="h-full bg-green rounded-sm transition-all duration-[1500ms] ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
