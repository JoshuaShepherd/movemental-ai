import { contentTemplatePlacement } from "@/lib/db/schema";
import {
  ContentTemplatePlacementSelectSchema,
  ContentTemplatePlacementInsertSchema,
  ContentTemplatePlacementUpdateSchema,
  ContentTemplatePlacementFiltersSchema,
  type ContentTemplatePlacement,
  type ContentTemplatePlacementCreate,
  type ContentTemplatePlacementUpdate,
  type ContentTemplatePlacementFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentTemplatePlacementService extends SimplifiedService<
  typeof contentTemplatePlacement,
  ContentTemplatePlacement,
  ContentTemplatePlacementCreate,
  ContentTemplatePlacementUpdate,
  ContentTemplatePlacementFilters
> {
  constructor() {
    super(
      contentTemplatePlacement,
      ContentTemplatePlacementSelectSchema,
      ContentTemplatePlacementInsertSchema,
      ContentTemplatePlacementUpdateSchema,
      ContentTemplatePlacementFiltersSchema,
    );
  }
}

export const contentTemplatePlacementService = new ContentTemplatePlacementService();
