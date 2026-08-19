import { useParams } from "react-router";
import { templates } from "../features/templates/templateData";
import { NotFoundPage } from "./NotFoundPage";
import RankingItemCard from "../components/RankingItemCard";
import TierRow from "../components/TierRow";
import { useState } from "react";
import type { RankingItem } from "../features/templates/templateTypes";

type Template = (typeof templates)[number];

export function TemplateRankingPage() {
  const { id } = useParams();
  const template = templates.find((template) => template.id === id);

  if (!template) return <NotFoundPage />;

  return <TemplateRankingEditor template={template} />;
}

function TemplateRankingEditor({ template }: { template: Template }) {
  const [tiers, setTiers] = useState(template.tiers);
  const [unrankedItems, setUnrankedItems] = useState(template.unrankedItems);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

  function moveSelectedItemToTier(targetTierId: string) {
    if (!selectedItemId) return;

    const selectedItem =
      unrankedItems.find((item) => item.id === selectedItemId) ??
      tiers
        .flatMap((tier) => tier.items)
        .find((item) => item.id === selectedItemId);

    if (!selectedItem) return;

    setUnrankedItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedItemId),
    );

    setTiers((prevTiers) =>
      prevTiers.map((tier) => {
        const itemsWithoutSelectedItem = tier.items.filter(
          (item) => item.id !== selectedItemId,
        );

        if (tier.id !== targetTierId) {
          return {
            ...tier,
            items: itemsWithoutSelectedItem,
          };
        }

        return {
          ...tier,
          items: [...itemsWithoutSelectedItem, selectedItem],
        };
      }),
    );
  }

  return (
    <main className="app-page">
      <div className="app-container flex flex-col gap-5 py-10">
        <section className="app-section flex flex-col gap-2 p-4">
          <h1 className="app-title mt-3 text-center text-5xl">
            {template.title}
          </h1>

          <p className="app-subtitle text-center mt-3">
            {template.description}
          </p>

          <p className=" text-text-soft text-right">
            Category: <span className="font-bold">{template.category}</span>
          </p>
        </section>

        <section className="app-section flex w-full flex-col items-center gap-5 p-5">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-app-border">
            {tiers.map((tier) => (
              <TierRow
                key={tier.id}
                name={tier.name}
                id={tier.id}
                items={tier.items}
                selectedItem={selectedItemId ? selectedItemId : ""}
                onItemSelect={setSelectedItemId}
                isTierSelected={selectedTierId === tier.id}
                onTierSelect={moveSelectedItemToTier}
              />
            ))}
          </div>

          {selectedItemId ? (
            <p>Selected item: {selectedItemId}</p>
          ) : (
            <p>No item selected</p>
          )}

          <div className="grid min-h-[7rem] w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 overflow-hidden rounded-2xl border border-app-border bg-app-bg-soft">
            {unrankedItems.map((item) => (
              <RankingItemCard
                key={`unranked-${item.id}`}
                id={item.id}
                title={item.title}
                isSelected={selectedItemId === item.id}
                onSelect={setSelectedItemId}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
