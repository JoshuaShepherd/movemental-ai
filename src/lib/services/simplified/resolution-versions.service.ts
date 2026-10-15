import { resolutionVersions } from "@/lib/db/schema";
import {
  ResolutionVersionsSelectSchema,
  ResolutionVersionsInsertSchema,
  ResolutionVersionsUpdateSchema,
  ResolutionVersionsFiltersSchema,
  type ResolutionVersions,
  type ResolutionVersionsCreate,
  type ResolutionVersionsUpdate,
  type ResolutionVersionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ResolutionVersionsService extends SimplifiedService<
  typeof resolutionVersions,
  ResolutionVersions,
  ResolutionVersionsCreate,
  ResolutionVersionsUpdate,
  ResolutionVersionsFilters
> {
  constructor() {
    super(
      resolutionVersions,
      ResolutionVersionsSelectSchema,
      ResolutionVersionsInsertSchema,
      ResolutionVersionsUpdateSchema,
      ResolutionVersionsFiltersSchema,
    );
  }
}

export const resolutionVersionsService = new ResolutionVersionsService();
