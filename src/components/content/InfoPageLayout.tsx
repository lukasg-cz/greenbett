import { SectionLabel } from '@/components/ui/SectionLabel';

interface InfoPageLayoutProps {
  label: string;
  title: string;
  accent: string;
  description: string;
  children: React.ReactNode;
}

export function InfoPageLayout({ label, title, accent, description, children }: InfoPageLayoutProps) {
  return (
    <section className="page-section">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="section-title">
          {title} <span className="accent">{accent}</span>
        </h2>
        <p className="section-desc mb-10">{description}</p>
        <div className="prose-content space-y-6 text-gray-300 text-[0.95rem] leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
