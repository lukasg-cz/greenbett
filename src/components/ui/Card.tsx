import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn('dark-card p-6', hover && 'hover:border-green', className)}>
      {children}
    </div>
  );
}
