import { describe, expect, it } from "vitest";

import {
  TARGET_TOTAL_NODES,
  buildCompleteGraphLinks,
  buildLeadersFromMovementVoices,
  generateGraphData,
  linkHighlightsPortraitHover,
  matchesAudienceFilters,
  mulberry32,
  seedNodePositions,
  topicsForCredentials,
  type SceniusV3GraphLink,
} from "@/components/sections-mock/home/scenius-v3-topology";
import {
  getVoiceAudienceCredentials,
} from "@/components/sections-mock/home/voice-audience-credentials";
import { MOVEMENT_VOICES } from "@/components/sections-mock/home/voices-graph-data";

describe("scenius-v3-topology", () => {
  it("builds one leader per movement voice", () => {
    const leaders = buildLeadersFromMovementVoices();
    expect(leaders.length).toBe(MOVEMENT_VOICES.length);
    expect(leaders.map((l) => l.id).sort()).toEqual(
      [...MOVEMENT_VOICES.map((v) => v.id)].sort(),
    );
  });

  it("generateGraphData yields TARGET_TOTAL_NODES and complete mesh link count", () => {
    const leaders = buildLeadersFromMovementVoices();
    const { nodes, links } = generateGraphData(leaders);
    expect(nodes.length).toBe(TARGET_TOTAL_NODES);
    const n = nodes.length;
    expect(links.length).toBe((n * (n - 1)) / 2);
  });

  it("seedNodePositions assigns x/y to every node", () => {
    const leaders = buildLeadersFromMovementVoices();
    const { nodes } = generateGraphData(leaders);
    seedNodePositions(nodes, 800, 600);
    for (const d of nodes) {
      expect(typeof d.x).toBe("number");
      expect(typeof d.y).toBe("number");
      expect(Number.isFinite(d.x)).toBe(true);
      expect(Number.isFinite(d.y)).toBe(true);
    }
  });

  it("mulberry32 is deterministic for a fixed seed", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    expect(a()).toBe(b());
  });

  it("matchesAudienceFilters respects threshold and empty set", () => {
    const leaders = buildLeadersFromMovementVoices();
    const alan = leaders.find((l) => l.id === "alan-hirsch");
    expect(alan).toBeDefined();
    const churchesOnly = new Set<"churches" | "nonprofits" | "institutions">([
      "churches",
    ]);
    expect(matchesAudienceFilters(alan!, churchesOnly)).toBe(true);
    const empty = new Set<"churches" | "nonprofits" | "institutions">();
    expect(matchesAudienceFilters(alan!, empty)).toBe(true);
  });

  it("linkHighlightsPortraitHover only for portrait–portrait links touching hover id", () => {
    const leaders = buildLeadersFromMovementVoices();
    const { nodes } = generateGraphData(leaders);
    seedNodePositions(nodes, 400, 400);
    const portrait = nodes.find((n) => n.id === "alan-hirsch")!;
    const extra = nodes.find((n) => n.id === "extra-0")!;
    const linkPortraitExtra: SceniusV3GraphLink = {
      source: portrait,
      target: extra,
      value: 1,
    };
    expect(linkHighlightsPortraitHover(linkPortraitExtra, "alan-hirsch")).toBe(
      false,
    );
    const other = nodes.find((n) => n.id === "brad-brisco")!;
    const linkVoices: SceniusV3GraphLink = {
      source: portrait,
      target: other,
      value: 1,
    };
    expect(linkHighlightsPortraitHover(linkVoices, "alan-hirsch")).toBe(true);
    expect(linkHighlightsPortraitHover(linkVoices, null)).toBe(false);
  });

  it("buildCompleteGraphLinks is n choose 2", () => {
    const tiny = buildLeadersFromMovementVoices().slice(0, 4);
    const links = buildCompleteGraphLinks(tiny);
    expect(links.length).toBe(6);
  });

  it("topicsForCredentials returns at least one slug", () => {
    const cred = getVoiceAudienceCredentials("alan-hirsch");
    expect(topicsForCredentials(cred).length).toBeGreaterThanOrEqual(1);
  });
});
