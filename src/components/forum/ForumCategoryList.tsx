import type { ForumCategory } from '@/types';
import { ForumCategoryCard } from './ForumCategory';

interface ForumCategoryListProps {
  categories: ForumCategory[];
}

export function ForumCategoryList({ categories }: ForumCategoryListProps) {
  return (
    <div className="grid gap-3">
      {categories.map((category) => (
        <ForumCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
