import { cohortSessions } from "@/lib/db/schema";
import {
  CohortSessionsSelectSchema,
  CohortSessionsInsertSchema,
  CohortSessionsUpdateSchema,
  CohortSessionsFiltersSchema,
  type CohortSessions,
  type CohortSessionsCreate,
  type CohortSessionsUpdate,
  type CohortSessionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CohortSessionsService extends SimplifiedService<
  typeof cohortSessions,
  CohortSessions,
  CohortSessionsCreate,
  CohortSessionsUpdate,
  CohortSessionsFilters
> {
  constructor() {
    super(
      cohortSessions,
      CohortSessionsSelectSchema,
      CohortSessionsInsertSchema,
      CohortSessionsUpdateSchema,
      CohortSessionsFiltersSchema,
    );
  }
}

export const cohortSessionsService = new CohortSessionsService();
