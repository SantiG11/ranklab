import { useState } from "react";
import type { Tier } from "../features/templates/templateTypes";

type TierSettingsProps = {
  tier: Tier;
  setName: (id: string, value: string) => void;
  setColor: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  closeSettings: () => void;
};

export default function TierSettings({
  tier,
  setName,
  setColor,
  onDelete,
  closeSettings,
}: TierSettingsProps) {
  const [newName, setNewName] = useState(tier.name);
  const [newColor, setNewColor] = useState(tier.color);

  function handleConfirm() {
    setName(tier.id, newName);
    setColor(tier.id, newColor);
    closeSettings();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier-settings-title"
      onClick={closeSettings}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-app-border bg-app-surface p-6 shadow-2xl shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 text-center">
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
              className="rounded-xl border border-app-border bg-app-bg-soft px-4 py-3 text-text-main outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40"
              onChange={(event) => setNewName(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-soft">
              Tier color
            </span>

            <select
              value={newColor}
              className="rounded-xl border border-app-border bg-app-bg-soft px-4 py-3 text-text-main outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/40"
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

        <button
          type="button"
          className="app-button-primary my-4 mx-auto"
          onClick={() => onDelete(tier.id)}
        >
          Delete Tier
        </button>

        <div className="mt-8 flex justify-end gap-3">
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
      </div>
    </div>
  );
}
