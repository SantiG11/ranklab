import RankingItemCard from "./RankingItemCard";

type TierRowProps = {
  name: string;
  id: string;
  color: string;
  isTierSelected: boolean;
  onTierSelect: (id: string) => void;
  isItemSelected?: boolean;
  selectedItem?: string;
  onItemSelect: (id: string) => void;
  items: { id: string; title: string }[];
  onSettingsClick: (id: string) => void;
};

const tierColorClasses: Record<string, string> = {
  "tier-s": "bg-tier-s",
  "tier-a": "bg-tier-a",
  "tier-b": "bg-tier-b",
  "tier-c": "bg-tier-c",
  "tier-d": "bg-tier-d",
};

export default function TierRow({
  id,
  name,
  color,
  isTierSelected,
  onTierSelect,
  items,
  isItemSelected,
  selectedItem,
  onItemSelect,
  onSettingsClick,
}: TierRowProps) {
  const tierColorClass = tierColorClasses[color] ?? "bg-app-surface-elevated";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_3.25rem] border-b border-app-border last:border-b-0 sm:grid-cols-[6.5rem_minmax(0,1fr)_3.25rem]">
      <button
        type="button"
        onClick={() => onTierSelect(id)}
        aria-label={`Move selected item to ${name} tier`}
        className={`flex min-h-14 items-center justify-start border-r border-app-border px-4 py-2 text-left transition focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset sm:min-h-24 sm:justify-center sm:px-2 sm:text-center ${tierColorClass} ${
          isTierSelected
            ? "brightness-125 ring-2 ring-inset ring-white/60"
            : "hover:brightness-110"
        }`}
      >
        <span className="app-title break-words text-xl text-white drop-shadow-sm sm:text-2xl">
          {name}
        </span>
      </button>

      <div
        className={`order-3 col-span-2 grid min-h-[5.75rem] min-w-0 grid-cols-[repeat(auto-fill,5.75rem)] bg-app-bg-soft transition sm:order-none sm:col-span-1 sm:min-h-[6.5rem] sm:grid-cols-[repeat(auto-fill,6.5rem)] ${
          isTierSelected
            ? "bg-brand-soft/50 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.5)]"
            : ""
        }`}
      >
        {items.map((item) => (
          <RankingItemCard
            key={`${id}-${item.id}`}
            id={item.id}
            title={item.title}
            isSelected={isItemSelected || selectedItem === item.id}
            onSelect={onItemSelect}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSettingsClick(id)}
        aria-label={`Edit ${name} tier`}
        className="flex min-h-14 items-center justify-center border-l border-app-border bg-app-surface-elevated text-text-muted transition hover:bg-app-surface hover:text-text-main focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset sm:min-h-24"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.25A3.25 3.25 0 1 0 12 8.75a3.25 3.25 0 0 0 0 6.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.1 13.9a7.7 7.7 0 0 0 .05-3.6l1.45-1.12-1.8-3.12-1.7.7a7.8 7.8 0 0 0-3.1-1.8L13.75 3h-3.5L10 4.96a7.8 7.8 0 0 0-3.1 1.8l-1.7-.7-1.8 3.12 1.45 1.12a7.7 7.7 0 0 0 .05 3.6l-1.5 1.16 1.8 3.12 1.76-.72A7.8 7.8 0 0 0 10 19.2l.25 1.8h3.5l.25-1.8a7.8 7.8 0 0 0 3.04-1.74l1.76.72 1.8-3.12-1.5-1.16Z" />
        </svg>
      </button>
    </div>
  );
}
