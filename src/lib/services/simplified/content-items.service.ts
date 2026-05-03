import { contentItems } from "@/lib/db/schema";
import {
  ContentItemsSelectSchema,
  ContentItemsInsertSchema,
  ContentItemsUpdateSchema,
  ContentItemsFiltersSchema,
  type ContentItems,
  type ContentItemsCreate,
  type ContentItemsUpdate,
  type ContentItemsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentItemsService extends SimplifiedService<
  typeof contentItems,
  ContentItems,
  ContentItemsCreate,
  ContentItemsUpdate,
  ContentItemsFilters
> {
  constructor() {
    super(
      contentItems,
      ContentItemsSelectSchema,
      ContentItemsInsertSchema,
      ContentItemsUpdateSchema,
      ContentItemsFiltersSchema,
    );
  }
}

export const contentItemsService = new ContentItemsService();
