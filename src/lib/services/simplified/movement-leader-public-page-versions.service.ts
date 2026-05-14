import { movementLeaderPublicPageVersions } from "@/lib/db/schema";
import {
  MovementLeaderPublicPageVersionsSelectSchema,
  MovementLeaderPublicPageVersionsInsertSchema,
  MovementLeaderPublicPageVersionsUpdateSchema,
  MovementLeaderPublicPageVersionsFiltersSchema,
  type MovementLeaderPublicPageVersions,
  type MovementLeaderPublicPageVersionsCreate,
  type MovementLeaderPublicPageVersionsUpdate,
  type MovementLeaderPublicPageVersionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MovementLeaderPublicPageVersionsService extends SimplifiedService<
  typeof movementLeaderPublicPageVersions,
  MovementLeaderPublicPageVersions,
  MovementLeaderPublicPageVersionsCreate,
  MovementLeaderPublicPageVersionsUpdate,
  MovementLeaderPublicPageVersionsFilters
> {
  constructor() {
    super(
      movementLeaderPublicPageVersions,
      MovementLeaderPublicPageVersionsSelectSchema,
      MovementLeaderPublicPageVersionsInsertSchema,
      MovementLeaderPublicPageVersionsUpdateSchema,
      MovementLeaderPublicPageVersionsFiltersSchema,
    );
  }
}

export const movementLeaderPublicPageVersionsService = new MovementLeaderPublicPageVersionsService();
