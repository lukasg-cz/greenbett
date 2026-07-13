export function LiveIndicator() {
  return (
    <div className="flex items-center gap-2 text-[0.8rem] font-semibold text-green">
      <div className="w-2.5 h-2.5 bg-green rounded-full animate-pulse" />
      LIVE · Aktualizováno právě teď
    </div>
  );
}
