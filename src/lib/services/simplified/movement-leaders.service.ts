import { movementLeaders } from "@/lib/db/schema";
import {
  MovementLeadersSelectSchema,
  MovementLeadersInsertSchema,
  MovementLeadersUpdateSchema,
  MovementLeadersFiltersSchema,
  type MovementLeaders,
  type MovementLeadersCreate,
  type MovementLeadersUpdate,
  type MovementLeadersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MovementLeadersService extends SimplifiedService<
  typeof movementLeaders,
  MovementLeaders,
  MovementLeadersCreate,
  MovementLeadersUpdate,
  MovementLeadersFilters
> {
  constructor() {
    super(
      movementLeaders,
      MovementLeadersSelectSchema,
      MovementLeadersInsertSchema,
      MovementLeadersUpdateSchema,
      MovementLeadersFiltersSchema,
    );
  }
}

export const movementLeadersService = new MovementLeadersService();
