import { futurePlanVersions } from "@/lib/db/schema";
import {
  FuturePlanVersionsSelectSchema,
  FuturePlanVersionsInsertSchema,
  FuturePlanVersionsUpdateSchema,
  FuturePlanVersionsFiltersSchema,
  type FuturePlanVersions,
  type FuturePlanVersionsCreate,
  type FuturePlanVersionsUpdate,
  type FuturePlanVersionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FuturePlanVersionsService extends SimplifiedService<
  typeof futurePlanVersions,
  FuturePlanVersions,
  FuturePlanVersionsCreate,
  FuturePlanVersionsUpdate,
  FuturePlanVersionsFilters
> {
  constructor() {
    super(
      futurePlanVersions,
      FuturePlanVersionsSelectSchema,
      FuturePlanVersionsInsertSchema,
      FuturePlanVersionsUpdateSchema,
      FuturePlanVersionsFiltersSchema,
    );
  }
}

export const futurePlanVersionsService = new FuturePlanVersionsService();
