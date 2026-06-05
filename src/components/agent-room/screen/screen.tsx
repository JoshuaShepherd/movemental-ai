import type {
  HandoffHumanProps,
  ReadbackProps,
  RealityCheckBeatProps,
} from "@/lib/agent-room/component-props";
import type { ScreenState } from "../use-agent-room-stream";

import { OpeningHero } from "./opening-hero";
import { RealityCheckBeat } from "./reality-check-beat";
import { Readback } from "./readback";
import { PathScreen } from "./path";
import { PricingScreen } from "./pricing";
import { NetworkScreen } from "./network";
import { AudienceScreen } from "./audience";
import { FoundersScreen } from "./founders";
import { HandoffHuman } from "./handoff-human";

/**
 * Maps the current screen state to a render component. The opening hero is the
 * boot/home state; everything else is a `ComponentId` the agent rendered via a
 * validated `ui_render`. `onSay` lets in-screen chips/forks route back through
 * the agent as user turns.
 */
export function Screen({
  state,
  onSay,
  disabled,
}: {
  state: ScreenState;
  onSay: (text: string) => void;
  disabled?: boolean;
}) {
  if (state.kind === "opening") return <OpeningHero />;

  switch (state.component) {
    case "reality_check_beat":
      return (
        <RealityCheckBeat
          props={state.props as RealityCheckBeatProps}
          onSay={onSay}
          disabled={disabled}
        />
      );
    case "readback":
      return (
        <Readback props={state.props as ReadbackProps} onSay={onSay} disabled={disabled} />
      );
    case "path":
      return <PathScreen />;
    case "pricing":
      return <PricingScreen />;
    case "network":
      return <NetworkScreen />;
    case "audience":
      return <AudienceScreen />;
    case "founders":
      return <FoundersScreen />;
    case "handoff_human":
      return <HandoffHuman props={state.props as HandoffHumanProps} />;
    default:
      return null;
  }
}
