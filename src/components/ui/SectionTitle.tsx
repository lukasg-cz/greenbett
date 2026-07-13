interface SectionTitleProps {
  children: React.ReactNode;
  accent?: string;
}

export function SectionTitle({ children, accent }: SectionTitleProps) {
  if (accent) {
    const parts = String(children).split(accent);
    return (
      <h2 className="section-title">
        {parts[0]}
        <span className="accent">{accent}</span>
        {parts[1]}
      </h2>
    );
  }
  return <h2 className="section-title">{children}</h2>;
}
