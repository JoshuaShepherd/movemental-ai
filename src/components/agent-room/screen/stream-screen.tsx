import type { HandoffHumanProps } from "@/lib/agent-room/component-props";
import { submitLead } from "@/lib/agent-room/capture";
import { toScreenId } from "@/lib/agent-room/screen-map";
import type { ScreenState } from "../use-agent-room-stream";

import { LEADERS } from "@/lib/agent-room/data/leaders";
import { NetworkScreen } from "./network";
import { HomeScreen } from "./stub/home-screen";
import { AudienceScreen } from "./audience";
import { HandoffHuman } from "./handoff-human";
import { SCREEN_COMPONENTS } from "./stub/stub-screen";

/**
 * The live-stream screen adapter (INT-02). Replaces the old per-ComponentId
 * `Screen` switch: a validated `ui_render` is routed into the **same** Ink Band
 * registry the stub uses (`SCREEN_COMPONENTS`), via the `screen-map.ts`
 * ComponentId → ScreenId SSOT (INT-01). Props the agent sent are handed to the
 * prop-driven screens (`beat`, `readback`, `capture`) through the registry's
 * `stream` channel; in-screen chips/forks route back as user turns via `onSay`.
 *
 * Engine-extra ids (`network` / `audience` / `handoff_human`) have no Ink Band
 * screen (their `toScreenId` is `null`); per INT-01's disposition they render
 * directly here. Invalid props were already dropped upstream in the hook, so by
 * the time a `component` state exists its `props` are validated.
 */
export function StreamScreen({
  state,
  onSay,
  onReset,
  disabled,
}: {
  state: ScreenState;
  onSay: (text: string) => void;
  onReset: () => void;
  disabled?: boolean;
}) {
  if (state.kind === "opening") {
    return (
      <HomeScreen
        onLeaderSelect={(i) => {
          const leader = LEADERS[i];
          if (leader) onSay(`Tell me about ${leader.name}`);
        }}
        disabled={disabled ?? false}
      />
    );
  }

  const { component, props } = state;

  // Engine-extra: no Ink Band screen — rendered directly (INT-01 disposition).
  if (component === "network") return <NetworkScreen />;
  if (component === "audience") return <AudienceScreen />;
  if (component === "handoff_human") {
    return <HandoffHuman props={props as unknown as HandoffHumanProps} />;
  }

  const screenId = toScreenId(component);
  if (!screenId) return null; // unreachable: the 3 engine-extra ids handled above
  const Component = SCREEN_COMPONENTS[screenId];

  return (
    <Component
      opts={{}}
      mapRead={null}
      onHome={onReset}
      // Stub-only interactions; the stream's prop-driven screens use `stream` below.
      onBeatAnswer={() => {}}
      onLeaderSelect={() => {}}
      // Minimal capture seam (INT-02). The real POST lands in INT-09.
      onCaptureSubmit={(kind, values) => {
        void submitLead(kind, values);
      }}
      onCaptureSkip={onReset}
      disabled={!!disabled}
      stream={{ props: props as Record<string, unknown>, onSay }}
    />
  );
}
