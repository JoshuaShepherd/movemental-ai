import { movementLeaderApplications } from "@/lib/db/schema";
import {
  MovementLeaderApplicationsSelectSchema,
  MovementLeaderApplicationsInsertSchema,
  MovementLeaderApplicationsUpdateSchema,
  MovementLeaderApplicationsFiltersSchema,
  type MovementLeaderApplications,
  type MovementLeaderApplicationsCreate,
  type MovementLeaderApplicationsUpdate,
  type MovementLeaderApplicationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MovementLeaderApplicationsService extends SimplifiedService<
  typeof movementLeaderApplications,
  MovementLeaderApplications,
  MovementLeaderApplicationsCreate,
  MovementLeaderApplicationsUpdate,
  MovementLeaderApplicationsFilters
> {
  constructor() {
    super(
      movementLeaderApplications,
      MovementLeaderApplicationsSelectSchema,
      MovementLeaderApplicationsInsertSchema,
      MovementLeaderApplicationsUpdateSchema,
      MovementLeaderApplicationsFiltersSchema,
    );
  }
}

export const movementLeaderApplicationsService = new MovementLeaderApplicationsService();
