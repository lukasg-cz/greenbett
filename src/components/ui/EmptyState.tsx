interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
}

export function EmptyState({ icon = 'fa-inbox', title, description }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 bg-dark-card border border-gray-700 rounded text-center">
      <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl text-gray-500 mb-4">
        <i className={`fas ${icon}`} />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-[0.9rem] max-w-md">{description}</p>
    </div>
  );
}
