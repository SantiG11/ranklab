import { useParams } from "react-router";
import { templates } from "../features/templates/templateData";
import { NotFoundPage } from "./NotFoundPage";
import TierRow from "../components/TierRow";
import { Fragment, useState } from "react";
import UnrankedItemsSection from "../components/UnrankedItemsSection";
import TierSettings from "../components/TierSettings";
import ResetConfirmation from "../components/ResetConfirmation";

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

  // Editing states
  const [editingTierId, setEditingTierId] = useState<string | null>(null);
  const currentEditingTier = editingTierId
    ? tiers.find((tier) => tier.id === editingTierId)
    : undefined;

  // Reset confirm button state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Explanation state
  const [rankingExplanation, setRankingExplanation] = useState("");

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

  // Add tier function
  function addTier() {
    const newTier = {
      id: `tier-${crypto.randomUUID()}`,
      name: "New Tier",
      color: "tier-d",
      items: [],
    };
    setTiers((prevTiers) => [...prevTiers, newTier]);
  }

  // Reseting functions
  function resetTemplate() {
    setTiers(template.tiers);
    setUnrankedItems(template.unrankedItems);
    setSelectedItemId(null);
    setSelectedTierId(null);
    setEditingTierId(null);
    setRankingExplanation("");
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

  function handleTierSettingsClick(tierId: string) {
    setEditingTierId((currentTierId) =>
      currentTierId === tierId ? null : tierId,
    );
  }

  function closeTierSettings() {
    setEditingTierId(null);
  }

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
                  name={tier.name}
                  id={tier.id}
                  color={tier.color}
                  items={tier.items}
                  selectedItem={selectedItemId ? selectedItemId : ""}
                  onItemSelect={setSelectedItemId}
                  isTierSelected={selectedTierId === tier.id}
                  onTierSelect={moveSelectedItemToTier}
                  isEditing={editingTierId === tier.id}
                  onSettingsClick={handleTierSettingsClick}
                />
              </Fragment>
            ))}
            {/* Add Row */}
            <button
              type="button"
              onClick={addTier}
              className="flex min-h-12 w-full items-center justify-center border border-app-border bg-app-surface-elevated transition hover:border-app-border-soft hover:bg-app-surface hover:shadow-lg hover:shadow-black/20"
            >
              Add row
            </button>
          </div>
          {/* Edit row */}
          {currentEditingTier && (
            <TierSettings
              tier={currentEditingTier}
              closeSettings={closeTierSettings}
              setName={updateTierName}
              setColor={updateTierColor}
            />
          )}

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
            <ResetConfirmation
              onConfirm={confirmResetRanking}
              onCancel={closeResetConfirmation}
            />
          )}

          {/* Unranked items */}
          <UnrankedItemsSection
            items={unrankedItems}
            selectedItemId={selectedItemId}
            onItemSelect={setSelectedItemId}
            onMoveToUnranked={moveSelectedItemToUnranked}
          />
        </section>

        <section className="app-section flex w-full flex-col gap-4 p-5">
          <div>
            <h2 className="app-title text-2xl">Ranking explanation</h2>

            <p className="app-subtitle mt-2">
              Optional: explain the criteria or thoughts behind your ranking.
            </p>
          </div>

          <textarea
            name="explanation"
            id="ranking-explanation"
            className="min-h-36 w-full resize-y rounded-xl border border-app-border bg-app-bg-soft p-4 text-text-main outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40"
            placeholder="Example: I ranked these based on personal enjoyment, nostalgia, and rewatch value."
            onChange={(event) => setRankingExplanation(event.target.value)}
            value={rankingExplanation}
          />
        </section>
      </div>
    </main>
  );
}
