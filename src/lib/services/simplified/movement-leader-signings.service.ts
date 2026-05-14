import { movementLeaderSignings } from "@/lib/db/schema";
import {
  MovementLeaderSigningsSelectSchema,
  MovementLeaderSigningsInsertSchema,
  MovementLeaderSigningsUpdateSchema,
  MovementLeaderSigningsFiltersSchema,
  type MovementLeaderSignings,
  type MovementLeaderSigningsCreate,
  type MovementLeaderSigningsUpdate,
  type MovementLeaderSigningsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MovementLeaderSigningsService extends SimplifiedService<
  typeof movementLeaderSignings,
  MovementLeaderSignings,
  MovementLeaderSigningsCreate,
  MovementLeaderSigningsUpdate,
  MovementLeaderSigningsFilters
> {
  constructor() {
    super(
      movementLeaderSignings,
      MovementLeaderSigningsSelectSchema,
      MovementLeaderSigningsInsertSchema,
      MovementLeaderSigningsUpdateSchema,
      MovementLeaderSigningsFiltersSchema,
    );
  }
}

export const movementLeaderSigningsService = new MovementLeaderSigningsService();
