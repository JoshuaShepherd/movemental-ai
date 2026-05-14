import { cohortMembers } from "@/lib/db/schema";
import {
  CohortMembersSelectSchema,
  CohortMembersInsertSchema,
  CohortMembersUpdateSchema,
  CohortMembersFiltersSchema,
  type CohortMembers,
  type CohortMembersCreate,
  type CohortMembersUpdate,
  type CohortMembersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CohortMembersService extends SimplifiedService<
  typeof cohortMembers,
  CohortMembers,
  CohortMembersCreate,
  CohortMembersUpdate,
  CohortMembersFilters
> {
  constructor() {
    super(
      cohortMembers,
      CohortMembersSelectSchema,
      CohortMembersInsertSchema,
      CohortMembersUpdateSchema,
      CohortMembersFiltersSchema,
    );
  }
}

export const cohortMembersService = new CohortMembersService();
