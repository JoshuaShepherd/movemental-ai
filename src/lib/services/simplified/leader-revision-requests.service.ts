import { leaderRevisionRequests } from "@/lib/db/schema";
import {
  LeaderRevisionRequestsSelectSchema,
  LeaderRevisionRequestsInsertSchema,
  LeaderRevisionRequestsUpdateSchema,
  LeaderRevisionRequestsFiltersSchema,
  type LeaderRevisionRequests,
  type LeaderRevisionRequestsCreate,
  type LeaderRevisionRequestsUpdate,
  type LeaderRevisionRequestsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class LeaderRevisionRequestsService extends SimplifiedService<
  typeof leaderRevisionRequests,
  LeaderRevisionRequests,
  LeaderRevisionRequestsCreate,
  LeaderRevisionRequestsUpdate,
  LeaderRevisionRequestsFilters
> {
  constructor() {
    super(
      leaderRevisionRequests,
      LeaderRevisionRequestsSelectSchema,
      LeaderRevisionRequestsInsertSchema,
      LeaderRevisionRequestsUpdateSchema,
      LeaderRevisionRequestsFiltersSchema,
    );
  }
}

export const leaderRevisionRequestsService = new LeaderRevisionRequestsService();
