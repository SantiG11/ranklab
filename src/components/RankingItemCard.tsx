type RankingItemCardProps = {
  title: string;
  id: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export default function RankingItemCard({
  title,
  id,
  isSelected,
  onSelect,
}: RankingItemCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={isSelected}
      className={`aspect-square min-w-0 overflow-hidden border border-app-border text-left transition duration-150 ease-out focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset active:scale-[0.98] ${
        isSelected
          ? "relative z-10 border-brand bg-brand-soft shadow-[inset_0_0_0_1px_rgba(139,92,246,0.35)] hover:border-brand-hover"
          : "bg-app-surface-elevated hover:relative hover:z-10 hover:border-app-border-soft hover:bg-app-surface"
      }`}
    >
      <div className="flex h-full w-full items-center justify-center p-2">
        <p
          className={`break-words text-center text-xs font-semibold leading-snug transition-colors sm:text-sm ${
            isSelected ? "text-text-main" : "text-text-soft"
          }`}
        >
          {title}
        </p>
      </div>
    </button>
  );
}
