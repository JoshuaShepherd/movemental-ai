import { z } from "zod";

export const OnbuildingSectionCreateSchema = z.object({
  movementLeaderId: z.string().uuid(),
  sectionKey: z.string().min(1).max(200),
  title: z.string().min(1).max(500),
  bodyMd: z.string().default(""),
  ordinal: z.number().int().nonnegative().optional(),
  sourceSectionKey: z.string().optional(),
  status: z.enum(["draft", "edited", "ratified"]).default("draft"),
});

export const OnbuildingSectionUpdateSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  bodyMd: z.string().optional(),
  ordinal: z.number().int().nonnegative().optional(),
  sectionKey: z.string().min(1).max(200).optional(),
  status: z.enum(["draft", "edited", "ratified"]).optional(),
  clearRatification: z.boolean().optional(),
});

export const OnbuildingSectionReorderSchema = z.object({
  movementLeaderId: z.string().uuid(),
  orderedSectionIds: z.array(z.string().uuid()).min(1),
});

export const OnbuildingSectionListSchema = z.object({
  movementLeaderId: z.string().uuid(),
});

export const OnbuildingSectionReseedSchema = z.object({
  movementLeaderId: z.string().uuid(),
});

export type OnbuildingSectionCreate = z.input<typeof OnbuildingSectionCreateSchema>;
export type OnbuildingSectionUpdate = z.infer<typeof OnbuildingSectionUpdateSchema>;
export type OnbuildingSectionReorder = z.infer<typeof OnbuildingSectionReorderSchema>;
export type OnbuildingSectionList = z.infer<typeof OnbuildingSectionListSchema>;
export type OnbuildingSectionReseed = z.infer<typeof OnbuildingSectionReseedSchema>;

export type OnbuildingAdminSection = {
  id: string;
  movementLeaderId: string;
  sectionKey: string;
  ordinal: number;
  title: string;
  bodyMd: string;
  sourceSectionKey: string | null;
  status: string;
  lastEditedBy: string | null;
  lastEditedAt: string | null;
  ratifiedBy: string | null;
  ratifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnbuildingAdminLeader = {
  id: string;
  slug: string;
  fullName: string;
  sectionCount: number;
};
