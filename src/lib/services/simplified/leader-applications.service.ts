import { leaderApplications } from "@/lib/db/schema";
import {
  LeaderApplicationsSelectSchema,
  LeaderApplicationsInsertSchema,
  LeaderApplicationsUpdateSchema,
  LeaderApplicationsFiltersSchema,
  type LeaderApplications,
  type LeaderApplicationsCreate,
  type LeaderApplicationsUpdate,
  type LeaderApplicationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class LeaderApplicationsService extends SimplifiedService<
  typeof leaderApplications,
  LeaderApplications,
  LeaderApplicationsCreate,
  LeaderApplicationsUpdate,
  LeaderApplicationsFilters
> {
  constructor() {
    super(
      leaderApplications,
      LeaderApplicationsSelectSchema,
      LeaderApplicationsInsertSchema,
      LeaderApplicationsUpdateSchema,
      LeaderApplicationsFiltersSchema,
    );
  }
}

export const leaderApplicationsService = new LeaderApplicationsService();
