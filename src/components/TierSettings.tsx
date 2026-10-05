import { useState } from "react";
import type { Tier } from "../features/templates/templateTypes";

type TierSettingsProps = {
  tier: Tier;
  setName: (id: string, value: string) => void;
  setColor: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
  closeSettings: () => void;
};

export default function TierSettings({
  tier,
  setName,
  setColor,
  onDelete,
  canDelete,
  closeSettings,
}: TierSettingsProps) {
  const [newName, setNewName] = useState(tier.name);
  const [newColor, setNewColor] = useState(tier.color);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  function handleConfirm() {
    setName(tier.id, newName);
    setColor(tier.id, newColor);
    closeSettings();
  }

  function handleDelete() {
    onDelete(tier.id);
    closeSettings();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier-settings-title"
      onClick={closeSettings}
    >
      <div
        className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl border border-app-border bg-app-surface p-5 shadow-2xl shadow-black/50 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        {!isDeleteConfirmOpen ? (
          <>
            <div className="mb-6">
              <p className="app-label">Tier settings</p>

              <h2 id="tier-settings-title" className="app-title mt-2 text-2xl">
                Edit "{tier.name}"
              </h2>

              <p className="app-subtitle mt-2 text-sm">
                Changes will only be applied after confirmation.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-text-soft">
                  Tier name
                </span>

                <input
                  type="text"
                  value={newName}
                  className="app-field"
                  onChange={(event) => setNewName(event.target.value)}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-text-soft">
                  Tier color
                </span>

                <select
                  value={newColor}
                  className="app-field"
                  onChange={(event) => setNewColor(event.target.value)}
                >
                  <option value="tier-s">Red</option>
                  <option value="tier-a">Orange</option>
                  <option value="tier-b">Yellow</option>
                  <option value="tier-c">Green</option>
                  <option value="tier-d">Blue</option>
                </select>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="app-button-secondary"
                  onClick={closeSettings}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="app-button-primary"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>

              <div className="border-t border-app-border pt-4">
                <button
                  type="button"
                  disabled={!canDelete}
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="app-button-danger w-full"
                >
                  Delete tier
                </button>

                {!canDelete && (
                  <p className="app-subtitle mt-2 text-center text-xs">
                    A ranking must have at least two tiers.
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-medium text-red-400">Delete tier</p>

              <h2 id="tier-settings-title" className="app-title mt-2 text-2xl">
                Delete "{tier.name}"?
              </h2>

              <p className="app-subtitle mt-3">
                Items currently in this tier will be moved back to Unranked.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="app-button-secondary"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="app-button-danger border-red-600 bg-red-600 text-white hover:bg-red-500"
              >
                Delete tier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
