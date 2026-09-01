import { useParams } from "react-router";
import { templates } from "../features/templates/templateData";
import { NotFoundPage } from "./NotFoundPage";
import RankingItemCard from "../components/RankingItemCard";
import TierRow from "../components/TierRow";
import { Fragment, useState } from "react";

type Template = (typeof templates)[number];

export function TemplateRankingPage() {
  const { id } = useParams();
  const template = templates.find((template) => template.id === id);

  if (!template) return <NotFoundPage />;

  return <TemplateRankingEditor template={template} />;
}

function TemplateRankingEditor({ template }: { template: Template }) {
  // Tiers states
  const [tiers, setTiers] = useState(template.tiers);
  const [unrankedItems, setUnrankedItems] = useState(template.unrankedItems);

  // Selected item and tier states
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

  // Reset confirm button state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Moving items functions
  function moveSelectedItemToTier(targetTierId: string) {
    if (!selectedItemId) {
      setSelectedTierId(targetTierId);
      return;
    }
    // Finds the selected item on the unranked items or on any tier and save it
    const selectedItem =
      unrankedItems.find((item) => item.id === selectedItemId) ??
      tiers
        .flatMap((tier) => tier.items)
        .find((item) => item.id === selectedItemId);

    if (!selectedItem) return;

    // Remove the moved item from unranked items
    setUnrankedItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedItemId),
    );

    // Add the selected item to the selected tier
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

    setSelectedTierId(null);
    setSelectedItemId(null);
  }

  function moveSelectedItemToUnranked() {
    if (!selectedItemId) return;

    // Finds the selected item on any tier
    const selectedItem = tiers
      .flatMap((tier) => tier.items)
      .find((item) => item.id === selectedItemId);

    if (!selectedItem) return;

    // Remove selected item from the tier
    setTiers((prevTiers) =>
      prevTiers.map((tier) => {
        const itemsWithoutSelectedItem = tier.items.filter(
          (item) => item.id !== selectedItem.id,
        );

        return {
          ...tier,
          items: itemsWithoutSelectedItem,
        };
      }),
    );

    // Add the selected item to unranked items
    setUnrankedItems((prevItems) => {
      const alreadyUnranked = prevItems.some(
        (item) => item.id === selectedItem.id,
      );

      if (alreadyUnranked) return prevItems;

      return [...prevItems, selectedItem];
    });

    setSelectedTierId(null);
  }

  // Reseting functions
  function resetTemplate() {
    setTiers(template.tiers);
    setUnrankedItems(template.unrankedItems);
    setSelectedItemId(null);
    setSelectedTierId(null);
  }

  function openResetConfirmation() {
    setIsResetConfirmOpen(true);
  }

  function closeResetConfirmation() {
    setIsResetConfirmOpen(false);
  }

  function confirmResetRanking() {
    resetTemplate();
    setIsResetConfirmOpen(false);
  }

  // Tier editing functions
  function updateTierName(tierId: string, newName: string) {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.id === tierId ? { ...tier, name: newName } : tier,
      ),
    );
  }

  function updateTierColor(tierId: string, newColor: string) {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.id === tierId ? { ...tier, color: newColor } : tier,
      ),
    );
  }
  return (
    <main className="app-page" onClick={() => setSelectedTierId(null)}>
      <div className="app-container flex flex-col gap-5 py-10">
        {/* Title section */}
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

        {/* Ranking section */}
        <section className="app-section flex w-full flex-col items-center gap-5 p-5">
          {/* Tiers */}
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-app-border"
            onClick={(event) => event.stopPropagation()}
          >
            {tiers.map((tier) => (
              <Fragment key={tier.id}>
                <TierRow
                  key={tier.id}
                  name={tier.name}
                  id={tier.id}
                  color={tier.color}
                  items={tier.items}
                  selectedItem={selectedItemId ? selectedItemId : ""}
                  onItemSelect={setSelectedItemId}
                  isTierSelected={selectedTierId === tier.id}
                  onTierSelect={moveSelectedItemToTier}
                />
                {selectedTierId === tier.id && !selectedItemId && (
                  <input
                    type="text"
                    className="bg-white text-black"
                    onChange={(event) =>
                      updateTierName(tier.id, event.target.value)
                    }
                  />
                )}
                {selectedTierId === tier.id && !selectedItemId && (
                  <select
                    className="bg-white text-black"
                    value={tier.color}
                    onChange={(event) =>
                      updateTierColor(tier.id, event.target.value)
                    }
                  >
                    <option value="tier-s">Red</option>
                    <option value="tier-a">Orange</option>
                    <option value="tier-b">Yellow</option>
                    <option value="tier-c">Green</option>
                    <option value="tier-d">Blue</option>
                  </select>
                )}
              </Fragment>
            ))}
          </div>

          {/* Reset template */}
          {!isResetConfirmOpen && (
            <button
              type="button"
              onClick={openResetConfirmation}
              className="app-button-secondary"
            >
              Reset Ranking
            </button>
          )}

          {isResetConfirmOpen && (
            <div className="app-container bg-app-bg-soft border rounded-xl border-app-border flex flex-col items-center gap-5 py-10">
              <p className="app-title text-center text-xl">Reset ranking?</p>
              <p className="app-subtitle text-center">
                This will move all items back to the unranked area.
              </p>
              <div className="flex gap-5">
                <button
                  type="button"
                  className="app-button-secondary"
                  onClick={confirmResetRanking}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="app-button-secondary"
                  onClick={closeResetConfirmation}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {selectedItemId ? (
            <p>Selected item: {selectedItemId}</p>
          ) : (
            <p>No item selected</p>
          )}

          {selectedTierId ? (
            <p>Selected item: {selectedTierId}</p>
          ) : (
            <p>No tier selected</p>
          )}

          {/* Unranked items */}
          <div className="grid min-h-[7rem] w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 overflow-hidden rounded-2xl border border-app-border bg-app-bg-soft">
            <button
              type="button"
              onClick={() => moveSelectedItemToUnranked()}
              className="flex min-h-20 items-center justify-center border-r-2 border-app-border p-2"
            >
              Unranked
            </button>
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
