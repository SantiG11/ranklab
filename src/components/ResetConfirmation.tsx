type ResetConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ResetConfirmation({
  onConfirm,
  onCancel,
}: ResetConfirmationProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-ranking-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-app-border bg-app-surface p-5 shadow-2xl shadow-black/50 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="app-label">Reset ranking</p>
        <h2 id="reset-ranking-title" className="app-title mt-2 text-2xl">
          Start over?
        </h2>
        <p className="app-subtitle mt-3 leading-6">
          This will move all items back to the unranked area and clear your
          explanation.
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" className="app-button-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="app-button-danger" onClick={onConfirm}>
            Reset ranking
          </button>
        </div>
      </div>
    </div>
  );
}
