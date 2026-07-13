import { SectionLabel } from '@/components/ui/SectionLabel';
import { ForumCategoryList } from '@/components/forum/ForumCategoryList';
import { MOCK_FORUM_CATEGORIES } from '@/lib/api/mock-data';

export default function ForumPage() {
  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Komunita</SectionLabel>
        <h2 className="section-title">
          FÓRUM & <span className="accent">DISKUZE</span>
        </h2>
        <p className="section-desc mb-10">
          Diskutuj o zápasech, strategiích a sdílej vlastní analýzy s komunitou.
        </p>

        <ForumCategoryList categories={MOCK_FORUM_CATEGORIES} />
      </div>
    </section>
  );
}
