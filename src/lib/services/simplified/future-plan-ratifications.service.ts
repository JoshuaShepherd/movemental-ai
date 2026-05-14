import { futurePlanRatifications } from "@/lib/db/schema";
import {
  FuturePlanRatificationsSelectSchema,
  FuturePlanRatificationsInsertSchema,
  FuturePlanRatificationsUpdateSchema,
  FuturePlanRatificationsFiltersSchema,
  type FuturePlanRatifications,
  type FuturePlanRatificationsCreate,
  type FuturePlanRatificationsUpdate,
  type FuturePlanRatificationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FuturePlanRatificationsService extends SimplifiedService<
  typeof futurePlanRatifications,
  FuturePlanRatifications,
  FuturePlanRatificationsCreate,
  FuturePlanRatificationsUpdate,
  FuturePlanRatificationsFilters
> {
  constructor() {
    super(
      futurePlanRatifications,
      FuturePlanRatificationsSelectSchema,
      FuturePlanRatificationsInsertSchema,
      FuturePlanRatificationsUpdateSchema,
      FuturePlanRatificationsFiltersSchema,
    );
  }
}

export const futurePlanRatificationsService = new FuturePlanRatificationsService();
