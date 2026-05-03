import { savedArchiveViews } from "@/lib/db/schema";
import {
  SavedArchiveViewsSelectSchema,
  SavedArchiveViewsInsertSchema,
  SavedArchiveViewsUpdateSchema,
  SavedArchiveViewsFiltersSchema,
  type SavedArchiveViews,
  type SavedArchiveViewsCreate,
  type SavedArchiveViewsUpdate,
  type SavedArchiveViewsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SavedArchiveViewsService extends SimplifiedService<
  typeof savedArchiveViews,
  SavedArchiveViews,
  SavedArchiveViewsCreate,
  SavedArchiveViewsUpdate,
  SavedArchiveViewsFilters
> {
  constructor() {
    super(
      savedArchiveViews,
      SavedArchiveViewsSelectSchema,
      SavedArchiveViewsInsertSchema,
      SavedArchiveViewsUpdateSchema,
      SavedArchiveViewsFiltersSchema,
    );
  }
}

export const savedArchiveViewsService = new SavedArchiveViewsService();
