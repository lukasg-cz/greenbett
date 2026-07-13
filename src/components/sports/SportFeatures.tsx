interface SportFeaturesProps {
  features: Array<{ icon: string; title: string; description: string }>;
}

export function SportFeatures({ features }: SportFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-dark-card border border-gray-700 rounded p-6 transition-all hover:border-green hover:-translate-y-0.5"
        >
          <div className="w-11 h-11 bg-green rounded-sm flex items-center justify-center text-black text-lg mb-3.5">
            <i className={`fas fa-${feature.icon}`} />
          </div>
          <h4 className="text-[0.92rem] font-bold mb-1.5">{feature.title}</h4>
          <p className="text-[0.8rem] text-gray-400 leading-snug">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
