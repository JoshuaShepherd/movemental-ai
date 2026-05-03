import { contentCategories } from "@/lib/db/schema";
import {
  ContentCategoriesSelectSchema,
  ContentCategoriesInsertSchema,
  ContentCategoriesUpdateSchema,
  ContentCategoriesFiltersSchema,
  type ContentCategories,
  type ContentCategoriesCreate,
  type ContentCategoriesUpdate,
  type ContentCategoriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentCategoriesService extends SimplifiedService<
  typeof contentCategories,
  ContentCategories,
  ContentCategoriesCreate,
  ContentCategoriesUpdate,
  ContentCategoriesFilters
> {
  constructor() {
    super(
      contentCategories,
      ContentCategoriesSelectSchema,
      ContentCategoriesInsertSchema,
      ContentCategoriesUpdateSchema,
      ContentCategoriesFiltersSchema,
    );
  }
}

export const contentCategoriesService = new ContentCategoriesService();
