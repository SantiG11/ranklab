import RankingItemCard from "./RankingItemCard";

type TierRowProps = {
  name: string;
  id: string;
  isTierSelected: boolean;
  onTierSelect: (id: string) => void;
  isItemSelected?: boolean;
  selectedItem?: string;
  onItemSelect: (id: string) => void;
  items: {
    id: string;
    title: string;
  }[];
};

export default function TierRow({
  id,
  name,
  isTierSelected,
  onTierSelect,
  items,
  isItemSelected,
  selectedItem,
  onItemSelect,
}: TierRowProps) {
  return (
    <div
      key={id}
      className="grid grid-cols-[7rem_minmax(0,1fr)] border-b border-app-border last:border-b-0"
    >
      <div className="flex min-h-20 items-center justify-center border-r-2 border-app-border p-2">
        <span className="app-title text-2xl">{name}</span>
      </div>

      <button
        onClick={() => onTierSelect(id)}
        className={`grid min-w-0 grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 bg-app-bg-soft  ${
          isTierSelected
            ? "border-brand bg-brand-soft shadow-[0_0_0_1px_rgba(124,58,237,0.35)] hover:border-brand-hover hover:bg-brand"
            : "border-app-border bg-app-surface-elevated hover:-translate-y-0.5 hover:border-app-border-soft hover:bg-app-surface hover:shadow-lg hover:shadow-black/20"
        }`}
      >
        {items.map((item: { id: string; title: string }) => (
          <RankingItemCard
            key={`${id}-${item.id}`}
            id={item.id}
            title={item.title}
            isSelected={isItemSelected || selectedItem === item.id}
            onSelect={onItemSelect}
          />
        ))}
      </button>
    </div>
  );
}
