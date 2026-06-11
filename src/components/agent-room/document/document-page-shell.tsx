"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { AgentRoomProvider, useInk } from "@/components/agent-room/agent-room-context";
import type { ComposerChip } from "@/components/agent-room/composer";
import { AgentDock } from "@/components/agent-room/shell/agent-dock";
import { InkOverlay } from "@/components/agent-room/shell/ink-overlay";
import { Mast } from "@/components/agent-room/shell/mast";
import inkStyles from "@/components/agent-room/ink-band.module.css";

import styles from "./document-page.module.css";

type DocumentChip = {
  label: string;
  /** Scroll to a section id on this page, or hand off to `/agent`. */
  action: "scroll" | "agent";
  target?: string;
};

type DocumentPageShellProps = {
  children: ReactNode;
  /** Caveat voice line above the dock chips. */
  voiceLine: string;
  chips: DocumentChip[];
  /** At most one fluorescent highlighter swipe per scene — on ONE chip label. */
  highlightChipLabel?: string | null;
  /** Stable key for dock reset when navigating between document pages. */
  screenKey: string;
};

function DocumentDock({
  voiceLine,
  chips,
  highlightChipLabel,
  screenKey,
}: Omit<DocumentPageShellProps, "children">) {
  const router = useRouter();
  const { inkLine } = useInk();
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const write = async () => {
      await inkLine(voiceLine);
      if (!cancelled) setVoiceReady(true);
    };
    void write();
    return () => {
      cancelled = true;
    };
  }, [inkLine, voiceLine, screenKey]);

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
          router.push("/agent");
        },
      })),
    [chips, router, scrollTo],
  );

  const onSay = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      router.push(`/agent?ask=${encodeURIComponent(trimmed)}`);
    },
    [router],
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
}: DocumentPageShellProps) {
  return (
    <AgentRoomProvider>
      <div className={`${styles.page} ${inkStyles.roomDock}`}>
        <InkOverlay />
        <Mast homeHref="/agent" />
        <div className={styles.main}>{children}</div>
        <DocumentDock
          voiceLine={voiceLine}
          chips={chips}
          highlightChipLabel={highlightChipLabel}
          screenKey={screenKey}
        />
      </div>
    </AgentRoomProvider>
  );
}
