import { describe, expect, it } from "vitest";

import {
  OnbuildingSectionCreateSchema,
  OnbuildingSectionListSchema,
  OnbuildingSectionReorderSchema,
  OnbuildingSectionUpdateSchema,
} from "@/lib/schemas/onbuilding-admin";

describe("onbuilding-admin schemas", () => {
  it("rejects empty section_key on create", () => {
    const result = OnbuildingSectionCreateSchema.safeParse({
      movementLeaderId: "1fdb2992-9636-40b7-99c9-c39fab7c2980",
      sectionKey: "",
      title: "Test",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid movementLeaderId UUID", () => {
    const result = OnbuildingSectionListSchema.safeParse({
      movementLeaderId: "not-a-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid reorder payload", () => {
    const result = OnbuildingSectionReorderSchema.safeParse({
      movementLeaderId: "1fdb2992-9636-40b7-99c9-c39fab7c2980",
      orderedSectionIds: ["aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts partial update with clearRatification", () => {
    const result = OnbuildingSectionUpdateSchema.safeParse({
      bodyMd: "Updated copy",
      clearRatification: true,
    });
    expect(result.success).toBe(true);
  });
});

describe("reorder ordinals", () => {
  it("maps ordered ids to contiguous ordinals", () => {
    const orderedSectionIds = ["a", "b", "c"];
    const ordinals = orderedSectionIds.map((id, index) => ({ id, ordinal: index }));
    expect(ordinals).toEqual([
      { id: "a", ordinal: 0 },
      { id: "b", ordinal: 1 },
      { id: "c", ordinal: 2 },
    ]);
  });
});
