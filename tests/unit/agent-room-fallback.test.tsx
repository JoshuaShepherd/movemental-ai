import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { AgentRoomFallback } from "../../src/components/agent-room/agent-room-fallback";
import {
  AGENT_ROOM_NOSCRIPT,
  HOME_SCREEN_COPY,
} from "../../src/lib/agent-room/data/home-copy";
import { PATH_STAGE_LABELS } from "../../src/lib/agent-room/naming";

describe("AgentRoomFallback SSR (AU-08)", () => {
  it("includes home headline, path order, concierge greeting, and noscript", () => {
    const html = renderToStaticMarkup(<AgentRoomFallback />);
    expect(html).toContain(HOME_SCREEN_COPY.headline);
    expect(html).toContain("Movemental Concierge");
    expect(html).toContain(PATH_STAGE_LABELS.safety);
    expect(html).toContain(PATH_STAGE_LABELS.sandbox);
    expect(html).toContain(AGENT_ROOM_NOSCRIPT);
    expect(html).toMatch(/<noscript>/);
    expect(html.match(/<h1/g)?.length).toBe(1);
  });
});
