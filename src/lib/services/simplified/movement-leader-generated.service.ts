import { movementLeaderGenerated } from "@/lib/db/schema";
import {
  MovementLeaderGeneratedSelectSchema,
  MovementLeaderGeneratedInsertSchema,
  MovementLeaderGeneratedUpdateSchema,
  MovementLeaderGeneratedFiltersSchema,
  type MovementLeaderGenerated,
  type MovementLeaderGeneratedCreate,
  type MovementLeaderGeneratedUpdate,
  type MovementLeaderGeneratedFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MovementLeaderGeneratedService extends SimplifiedService<
  typeof movementLeaderGenerated,
  MovementLeaderGenerated,
  MovementLeaderGeneratedCreate,
  MovementLeaderGeneratedUpdate,
  MovementLeaderGeneratedFilters
> {
  constructor() {
    super(
      movementLeaderGenerated,
      MovementLeaderGeneratedSelectSchema,
      MovementLeaderGeneratedInsertSchema,
      MovementLeaderGeneratedUpdateSchema,
      MovementLeaderGeneratedFiltersSchema,
    );
  }
}

export const movementLeaderGeneratedService = new MovementLeaderGeneratedService();
