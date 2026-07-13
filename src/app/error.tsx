'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-xl font-bold text-red">Něco se pokazilo</h2>
      <p className="text-gray-400 text-sm">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="btn-primary"
      >
        Zkusit znovu
      </button>
    </div>
  );
}
