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
    <div className="grid min-h-[7rem] w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 overflow-hidden rounded-2xl border border-app-border bg-app-bg-soft">
      <button
        type="button"
        onClick={onMoveToUnranked}
        className="flex min-h-20 items-center justify-center border-r-2 border-app-border p-2"
      >
        Unranked
      </button>
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
  );
}
