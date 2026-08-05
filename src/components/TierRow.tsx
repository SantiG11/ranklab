import RankingItemCard from "./RankingItemCard";

type TierRowProps = {
  name: string;
  id: string;
  isSelected?: boolean;
  selectedItem?: string;
  onSelect: (id: string) => void;
  items: {
    id: string;
    title: string;
  }[];
};

export default function TierRow({
  id,
  name,
  items,
  isSelected,
  selectedItem,
  onSelect,
}: TierRowProps) {
  return (
    <div
      key={id}
      className="grid grid-cols-[7rem_minmax(0,1fr)] border-b border-app-border last:border-b-0"
    >
      <div className="flex min-h-20 items-center justify-center border-r-2 border-app-border p-2">
        <span className="app-title text-2xl">{name}</span>
      </div>

      <div className="grid min-w-0 grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 bg-app-bg-soft">
        {items.map((item: { id: string; title: string }) => (
          <RankingItemCard
            key={`${id}-${item.id}`}
            id={item.id}
            title={item.title}
            isSelected={isSelected || selectedItem === item.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
