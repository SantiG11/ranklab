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

  // Delete tier function
  function deleteTier(tierId: string) {
    if (tiers.length <= 2) return;

    // Find the tier
    const tierToRemove = tiers.find((tier) => tier.id === tierId);

    if (!tierToRemove) return;

    // Move the items of the tier to unranked
    setUnrankedItems((prevItems) => [...prevItems, ...tierToRemove.items]);

    // Remove the tier
    setTiers((prevTiers) => prevTiers.filter((tier) => tier.id !== tierId));

    // If an item was selected is reset
    const selectedItemWasDeleted = tierToRemove.items.some(
      (item) => item.id === selectedItemId,
    );

    if (selectedItemWasDeleted) {
      setSelectedItemId(null);
    }

    if (selectedTierId === tierId) {
      setSelectedTierId(null);
    }

    if (editingTierId === tierId) {
      setEditingTierId(null);
    }
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
      <div className="app-container flex flex-col gap-6 py-8 sm:py-10">
        {/* Title section */}
        <section className="py-2 sm:py-4">
          <p className="app-label">{template.category}</p>
          <h1 className="app-title mt-2 text-3xl sm:text-4xl">
            {template.title}
          </h1>

          <p className="app-subtitle mt-3 max-w-2xl leading-6">
            {template.description}
          </p>
        </section>

        {/* Ranking section */}
        <section className="app-section flex w-full flex-col gap-6 p-3 sm:p-5">
          <div>
            <h2 className="app-title text-xl">Your ranking</h2>
            <p className="app-subtitle mt-1 text-sm">
              Select an item, then choose a tier to place it.
            </p>
          </div>

          {/* Tiers */}
          <div
            className="w-full overflow-hidden rounded-xl border border-app-border"
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
                  onSettingsClick={handleTierSettingsClick}
                />
              </Fragment>
            ))}
            {/* Add Row */}
            <button
              type="button"
              onClick={addTier}
              className="flex min-h-12 w-full items-center justify-center gap-2 border-t border-app-border bg-app-surface-elevated px-4 text-sm font-semibold text-text-muted transition hover:bg-app-surface hover:text-text-main focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset"
            >
              <span aria-hidden="true" className="text-lg">+</span> Add tier
            </button>
          </div>
          {/* Edit row */}
          {currentEditingTier && (
            <TierSettings
              tier={currentEditingTier}
              closeSettings={closeTierSettings}
              setName={updateTierName}
              setColor={updateTierColor}
              onDelete={() => deleteTier(currentEditingTier.id)}
              canDelete={tiers.length > 2}
            />
          )}

          {/* Unranked items */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="app-title text-lg">Unranked items</h2>
              <p className="app-subtitle mt-1 text-sm">
                Items waiting to be placed, or moved back from a tier.
              </p>
            </div>
            <UnrankedItemsSection
              items={unrankedItems}
              selectedItemId={selectedItemId}
              onItemSelect={setSelectedItemId}
              onMoveToUnranked={moveSelectedItemToUnranked}
            />
          </div>
        </section>

        <section className="app-section flex w-full flex-col gap-4 p-4 sm:p-5">
          <div>
            <h2 id="ranking-explanation-title" className="app-title text-2xl">
              Ranking explanation
            </h2>

            <p id="ranking-explanation-help" className="app-subtitle mt-2">
              Optional: explain the criteria or thoughts behind your ranking.
            </p>
          </div>

          <textarea
            name="explanation"
            id="ranking-explanation"
            aria-labelledby="ranking-explanation-title"
            aria-describedby="ranking-explanation-help"
            className="app-field min-h-36 w-full resize-y"
            placeholder="Example: I ranked these based on personal enjoyment, nostalgia, and rewatch value."
            onChange={(event) => setRankingExplanation(event.target.value)}
            value={rankingExplanation}
          />
        </section>

        <div className="flex justify-end border-t border-app-border pt-6">
          <button
            type="button"
            onClick={openResetConfirmation}
            className="app-button-secondary"
          >
            Reset ranking
          </button>
        </div>

        {isResetConfirmOpen && (
          <ResetConfirmation
            onConfirm={confirmResetRanking}
            onCancel={closeResetConfirmation}
          />
        )}
      </div>
    </main>
  );
}
