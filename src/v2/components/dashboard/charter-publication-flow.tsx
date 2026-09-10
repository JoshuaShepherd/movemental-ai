"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CharterPublicationFlowProps {
  organizationId: string;
  slug: string;
  currentStatus: string;
}

/**
 * Staging component for charter publication actions.
 * Matches D4 (Artifact publication flow) in Movemental Dashboard.dc.html.
 */
export function CharterPublicationFlow({
  organizationId,
  slug,
  currentStatus,
}: CharterPublicationFlowProps) {
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(currentStatus === "published");

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid var(--color-ink-band-border)",
        borderRadius: "8px",
        background: "var(--color-ink-band-surface)",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-ink-band-ink-muted)",
          margin: "0 0 0.5rem",
        }}
      >
        Publication Status
      </p>
      <p
        style={{
          fontWeight: 600,
          color: "var(--color-ink-band-ink)",
          margin: "0 0 1rem",
        }}
      >
        {published ? "Published & Ratified" : "Draft (Pending Ratification)"}
      </p>
      {!published ? (
        <Button
          size="sm"
          disabled={publishing}
          onClick={async () => {
            setPublishing(true);
            try {
              const res = await fetch("/api/charter/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ organizationId, slug }),
              });
              if (res.ok) setPublished(true);
            } catch {
              // ignore or handle
            } finally {
              setPublishing(false);
            }
          }}
        >
          {publishing ? "Publishing..." : "Publish Layer"}
        </Button>
      ) : (
        <span
          style={{
            display: "inline-block",
            fontSize: "0.85rem",
            color: "var(--color-ink-band-blue)",
            fontWeight: 500,
          }}
        >
          Public shareable link active
        </span>
      )}
    </div>
  );
}
