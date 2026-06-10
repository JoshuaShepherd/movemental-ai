import { describe, expect, it } from "vitest";

import {
  getVoiceAudienceCredentials,
  listVoiceAudienceCredentialRows,
} from "@/components/sections-mock/home/voice-audience-credentials";
import { MOVEMENT_VOICES } from "@/components/sections-mock/home/voices-graph-data";

describe("voice-audience-credentials", () => {
  it("has one credential row per movement voice slug", () => {
    const rows = listVoiceAudienceCredentialRows();
    const slugs = new Set(rows.map((r) => r.slug));
    for (const v of MOVEMENT_VOICES) {
      expect(slugs.has(v.id), `missing credentials for ${v.id}`).toBe(true);
      const row = getVoiceAudienceCredentials(v.id);
      expect(row).toBeDefined();
      expect(row!.researchPending).not.toBe(true);
      expect(Object.keys(row!.segments).length).toBeGreaterThan(0);
    }
    expect(rows.length).toBe(MOVEMENT_VOICES.length);
  });
});
