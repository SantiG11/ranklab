type ResetConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ResetConfirmation({
  onConfirm,
  onCancel,
}: ResetConfirmationProps) {
  return (
    <div className="app-container bg-app-bg-soft border rounded-xl border-app-border flex flex-col items-center gap-5 py-10">
      <p className="app-title text-center text-xl">Reset ranking?</p>
      <p className="app-subtitle text-center">
        This will move all items back to the unranked area.
      </p>
      <div className="flex gap-5">
        <button
          type="button"
          className="app-button-secondary"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          type="button"
          className="app-button-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
