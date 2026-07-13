interface SectionLabelProps {
  children: React.ReactNode;
  pulse?: boolean;
}

export function SectionLabel({ children, pulse = true }: SectionLabelProps) {
  return (
    <div className="section-label">
      {pulse && (
        <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
      )}
      {children}
    </div>
  );
}
