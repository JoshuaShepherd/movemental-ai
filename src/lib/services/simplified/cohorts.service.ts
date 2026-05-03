import { cohorts } from "@/lib/db/schema";
import {
  CohortsSelectSchema,
  CohortsInsertSchema,
  CohortsUpdateSchema,
  CohortsFiltersSchema,
  type Cohorts,
  type CohortsCreate,
  type CohortsUpdate,
  type CohortsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CohortsService extends SimplifiedService<
  typeof cohorts,
  Cohorts,
  CohortsCreate,
  CohortsUpdate,
  CohortsFilters
> {
  constructor() {
    super(
      cohorts,
      CohortsSelectSchema,
      CohortsInsertSchema,
      CohortsUpdateSchema,
      CohortsFiltersSchema,
    );
  }
}

export const cohortsService = new CohortsService();
