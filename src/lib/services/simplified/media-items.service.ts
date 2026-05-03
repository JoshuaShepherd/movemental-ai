import { mediaItems } from "@/lib/db/schema";
import {
  MediaItemsSelectSchema,
  MediaItemsInsertSchema,
  MediaItemsUpdateSchema,
  MediaItemsFiltersSchema,
  type MediaItems,
  type MediaItemsCreate,
  type MediaItemsUpdate,
  type MediaItemsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MediaItemsService extends SimplifiedService<
  typeof mediaItems,
  MediaItems,
  MediaItemsCreate,
  MediaItemsUpdate,
  MediaItemsFilters
> {
  constructor() {
    super(
      mediaItems,
      MediaItemsSelectSchema,
      MediaItemsInsertSchema,
      MediaItemsUpdateSchema,
      MediaItemsFiltersSchema,
    );
  }
}

export const mediaItemsService = new MediaItemsService();
