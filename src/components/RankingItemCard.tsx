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
      className={`aspect-square min-w-0 overflow-hidden border text-left transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-app-bg active:scale-[0.97] ${
        isSelected
          ? "border-brand bg-brand-soft shadow-[0_0_0_1px_rgba(124,58,237,0.35)] hover:border-brand-hover hover:bg-brand"
          : "border-app-border bg-app-surface-elevated hover:-translate-y-0.5 hover:border-app-border-soft hover:bg-app-surface hover:shadow-lg hover:shadow-black/20"
      }`}
    >
      <div className="flex h-full w-full items-center justify-center p-2">
        <p
          className={`text-center text-sm font-semibold transition-colors duration-200 ${
            isSelected ? "text-text-main" : "text-text-soft"
          }`}
        >
          {title}
        </p>
      </div>
    </button>
  );
}
