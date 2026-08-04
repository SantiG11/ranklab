type RankingItemCardProps = {
  title: string;
};

export default function RankingItemCard({ title }: RankingItemCardProps) {
  return (
    <div className="aspect-square min-w-0 overflow-hidden border border-app-border">
      <div className="flex h-full w-full items-center justify-center bg-app-surface-elevated">
        <p className="text-center text-sm font-semibold text-text-soft">
          {title}
        </p>
      </div>
    </div>
  );
}
