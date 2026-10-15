import { resolutions } from "@/lib/db/schema";
import {
  ResolutionsSelectSchema,
  ResolutionsInsertSchema,
  ResolutionsUpdateSchema,
  ResolutionsFiltersSchema,
  type Resolutions,
  type ResolutionsCreate,
  type ResolutionsUpdate,
  type ResolutionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ResolutionsService extends SimplifiedService<
  typeof resolutions,
  Resolutions,
  ResolutionsCreate,
  ResolutionsUpdate,
  ResolutionsFilters
> {
  constructor() {
    super(
      resolutions,
      ResolutionsSelectSchema,
      ResolutionsInsertSchema,
      ResolutionsUpdateSchema,
      ResolutionsFiltersSchema,
    );
  }
}

export const resolutionsService = new ResolutionsService();
