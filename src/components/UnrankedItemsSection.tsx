import type { RankingItem } from "../features/templates/templateTypes";
import RankingItemCard from "./RankingItemCard";

type UnrankedItemsSectionProps = {
  items: RankingItem[];
  selectedItemId: string | null;
  onItemSelect: (id: string) => void;
  onMoveToUnranked: () => void;
};

export default function UnrankedItemsSection({
  items,
  selectedItemId,
  onItemSelect,
  onMoveToUnranked,
}: UnrankedItemsSectionProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-app-border bg-app-bg-soft sm:grid sm:grid-cols-[6.5rem_minmax(0,1fr)]">
      <button
        type="button"
        onClick={onMoveToUnranked}
        className="flex min-h-14 w-full items-center justify-between border-b border-app-border bg-app-surface-elevated px-4 text-sm font-semibold text-text-soft transition hover:bg-app-surface hover:text-text-main focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset sm:min-h-24 sm:justify-center sm:border-r sm:border-b-0 sm:px-2"
      >
        Unranked
      </button>
      <div className="grid min-h-[5.75rem] min-w-0 grid-cols-[repeat(auto-fill,5.75rem)] sm:min-h-[6.5rem] sm:grid-cols-[repeat(auto-fill,6.5rem)]">
        {items.map((item) => (
          <RankingItemCard
            key={`unranked-${item.id}`}
            id={item.id}
            title={item.title}
            isSelected={selectedItemId === item.id}
            onSelect={onItemSelect}
          />
        ))}
      </div>
    </div>
  );
}
