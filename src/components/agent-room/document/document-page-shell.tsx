"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useInk } from "@/components/agent-room/agent-room-context";
import type { ComposerChip } from "@/components/agent-room/composer";
import { AgentDock } from "@/components/agent-room/shell/agent-dock";
import { InkOverlay } from "@/components/agent-room/shell/ink-overlay";
import { Mast } from "@/components/agent-room/shell/mast";
import inkStyles from "@/components/agent-room/ink-band.module.css";
import {
  stashHandoffAudience,
  stashHandoffScene,
  type WaysInAudience,
} from "@/lib/agent-room/ways-in-doors";

import styles from "./document-page.module.css";

/** Hand-off URL into the room — carries the question and, when known, the segment. */
function agentHandoffHref(ask: string, audience?: WaysInAudience): string {
  const from = audience ? `&from=${audience}` : "";
  return `/agent?ask=${encodeURIComponent(ask)}${from}`;
}

export type DocumentChip = {
  label: string;
  /** Scroll to a section id, hand off to `/agent` chat, or run a local scene on `/agent`. */
  action: "scroll" | "agent" | "scene";
  target?: string;
  /** When set, hand off to `/agent?ask=…` instead of plain `/agent`. */
  agentAsk?: string;
  /** When `action` is `scene`, run this scene once after `/agent` opening settles. */
  scene?: string;
};

type DocumentPageShellProps = {
  children: ReactNode;
  /** Caveat voice line above the dock chips. */
  voiceLine: string;
  chips: readonly DocumentChip[];
  /** At most one fluorescent highlighter swipe per scene — on ONE chip label. */
  highlightChipLabel?: string | null;
  /** Stable key for dock reset when navigating between document pages. */
  screenKey: string;
  /** Segment this surface speaks to — carried into the room so the concierge opens route-aware. */
  audience?: WaysInAudience;
};

function DocumentDock({
  voiceLine,
  chips,
  highlightChipLabel,
  screenKey,
  audience,
}: Omit<DocumentPageShellProps, "children">) {
  const router = useRouter();
  const { inkLine, clearVoice } = useInk();
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // The provider now persists across `/agent` navigation (Phase 3), so wipe any
    // prior page's voice line and re-arm before writing this page's line.
    clearVoice();
    setVoiceReady(false);
    const write = async () => {
      await inkLine(voiceLine);
      if (!cancelled) setVoiceReady(true);
    };
    void write();
    return () => {
      cancelled = true;
    };
  }, [inkLine, clearVoice, voiceLine, screenKey]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const suggestions = useMemo<ComposerChip[]>(
    () =>
      chips.map((chip) => ({
        label: chip.label,
        onSelect: () => {
          if (chip.action === "scroll" && chip.target) {
            scrollTo(chip.target);
            return;
          }
          if (chip.action === "scene" && chip.scene) {
            stashHandoffScene(chip.scene);
            if (audience) stashHandoffAudience(audience);
            router.push("/agent");
            return;
          }
          if (chip.agentAsk) {
            router.push(agentHandoffHref(chip.agentAsk, audience));
            return;
          }
          router.push("/agent");
        },
      })),
    [chips, router, scrollTo, audience],
  );

  const onSay = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      router.push(agentHandoffHref(trimmed, audience));
    },
    [router, audience],
  );

  return (
    <AgentDock
      voice={{ thinking: false, text: voiceReady ? "" : voiceLine }}
      error={null}
      suggestions={suggestions}
      onSay={onSay}
      screenKey={screenKey}
      highlightChipLabel={highlightChipLabel ?? null}
      placeholder="Type here, or tap a suggestion…"
    />
  );
}

/**
 * Long-form Ink Band document surface with mast + floating agent dock.
 * Collapsed dock OR expanded conversation — never both (AgentDock contract).
 */
export function DocumentPageShell({
  children,
  voiceLine,
  chips,
  highlightChipLabel = null,
  screenKey,
  audience,
}: DocumentPageShellProps) {
  return (
    <div className={`${styles.page} ${inkStyles.roomDock}`}>
      <InkOverlay />
      <Mast homeHref="/agent" />
      <div className={styles.main}>{children}</div>
      <DocumentDock
        voiceLine={voiceLine}
        chips={chips}
        highlightChipLabel={highlightChipLabel}
        screenKey={screenKey}
        audience={audience}
      />
    </div>
  );
}
