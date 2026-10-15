"use client";

/** Board: R3-States, "This didn’t load." */
export default function ResolveError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mv-rz mv-rz--text" style={{ gap: 12 }}>
      <h1 className="mv-h3--sm">This didn’t load.</h1>
      <p className="mv-soft" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>
        Your choices are saved. Try again in a moment.
      </p>
      <button
        type="button"
        className="mv-pill"
        style={{ alignSelf: "flex-start", minHeight: 44, padding: "0 20px", fontSize: 15 }}
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
