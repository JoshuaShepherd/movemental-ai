import { contentVersions } from "@/lib/db/schema";
import {
  ContentVersionsSelectSchema,
  ContentVersionsInsertSchema,
  ContentVersionsUpdateSchema,
  ContentVersionsFiltersSchema,
  type ContentVersions,
  type ContentVersionsCreate,
  type ContentVersionsUpdate,
  type ContentVersionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentVersionsService extends SimplifiedService<
  typeof contentVersions,
  ContentVersions,
  ContentVersionsCreate,
  ContentVersionsUpdate,
  ContentVersionsFilters
> {
  constructor() {
    super(
      contentVersions,
      ContentVersionsSelectSchema,
      ContentVersionsInsertSchema,
      ContentVersionsUpdateSchema,
      ContentVersionsFiltersSchema,
    );
  }
}

export const contentVersionsService = new ContentVersionsService();
