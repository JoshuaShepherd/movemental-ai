import { AgentRoomProvider } from "@/components/agent-room/agent-room-context";
import { InkFilters } from "@/components/agent-room/deck/ink-filters";
import { AboutExperience } from "@/components/agent-room/about/about-experience";

/**
 * Staging view for Movemental About & Founders Hub.
 * Matches design specification in Movemental About Founders.dc.html.
 * Wraps AgentRoomProvider and InkFilters for ink line and concierge dock context.
 */
export function AboutPageView() {
  return (
    <>
      <InkFilters />
      <AgentRoomProvider>
        <AboutExperience />
      </AgentRoomProvider>
    </>
  );
}
