import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { MOCK_FORUM_CATEGORIES, MOCK_FORUM_THREADS } from '@/lib/api/mock-data';

interface ForumCategoryPageProps {
  params: { categoryId: string };
}

export default function ForumCategoryPage({ params }: ForumCategoryPageProps) {
  const category = MOCK_FORUM_CATEGORIES.find((c) => c.id === params.categoryId);
  if (!category) notFound();

  const threads = MOCK_FORUM_THREADS.filter((t) => t.categoryId === params.categoryId);

  return (
    <section className="page-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <Link href="/forum" className="text-green text-[0.85rem] no-underline hover:underline mb-4 inline-block">
          ← Zpět na fórum
        </Link>
        <SectionLabel>Komunita</SectionLabel>
        <h2 className="section-title">
          {category.name.toUpperCase()}
        </h2>
        <p className="section-desc mb-10">{category.description}</p>

        <div className="space-y-2">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="bg-dark-card border border-gray-700 rounded p-4 px-6 flex flex-wrap items-center justify-between gap-4 transition-all hover:border-green"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {thread.pinned && (
                  <span className="text-[0.65rem] font-bold uppercase bg-green/15 text-green px-2 py-0.5 rounded">Připnuto</span>
                )}
                <div>
                  <h4 className="text-[0.9rem] font-bold">{thread.title}</h4>
                  <p className="text-[0.75rem] text-gray-400">od {thread.author}</p>
                </div>
              </div>
              <div className="flex gap-6 text-[0.8rem] text-gray-400">
                <span><strong className="text-gray-300">{thread.replies}</strong> odpovědí</span>
                <span><strong className="text-gray-300">{thread.views}</strong> zhlédnutí</span>
                <span>{thread.lastReply}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-dark-card border border-gray-700 rounded text-center">
          <p className="text-gray-400 text-[0.9rem] mb-4">
            Chceš založit nové vlákno? Přihlas se a přidej se do diskuse.
          </p>
          <Link href="/prihlaseni" className="btn-primary inline-flex items-center gap-2 no-underline">
            <i className="fas fa-plus" /> Nové vlákno
          </Link>
        </div>
      </div>
    </section>
  );
}
