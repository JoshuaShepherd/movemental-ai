import { movementLeaderPublicPages } from "@/lib/db/schema";
import {
  MovementLeaderPublicPagesSelectSchema,
  MovementLeaderPublicPagesInsertSchema,
  MovementLeaderPublicPagesUpdateSchema,
  MovementLeaderPublicPagesFiltersSchema,
  type MovementLeaderPublicPages,
  type MovementLeaderPublicPagesCreate,
  type MovementLeaderPublicPagesUpdate,
  type MovementLeaderPublicPagesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MovementLeaderPublicPagesService extends SimplifiedService<
  typeof movementLeaderPublicPages,
  MovementLeaderPublicPages,
  MovementLeaderPublicPagesCreate,
  MovementLeaderPublicPagesUpdate,
  MovementLeaderPublicPagesFilters
> {
  constructor() {
    super(
      movementLeaderPublicPages,
      MovementLeaderPublicPagesSelectSchema,
      MovementLeaderPublicPagesInsertSchema,
      MovementLeaderPublicPagesUpdateSchema,
      MovementLeaderPublicPagesFiltersSchema,
    );
  }
}

export const movementLeaderPublicPagesService = new MovementLeaderPublicPagesService();
