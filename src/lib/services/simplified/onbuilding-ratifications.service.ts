import { onbuildingRatifications } from "@/lib/db/schema";
import {
  OnbuildingRatificationsSelectSchema,
  OnbuildingRatificationsInsertSchema,
  OnbuildingRatificationsUpdateSchema,
  OnbuildingRatificationsFiltersSchema,
  type OnbuildingRatifications,
  type OnbuildingRatificationsCreate,
  type OnbuildingRatificationsUpdate,
  type OnbuildingRatificationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OnbuildingRatificationsService extends SimplifiedService<
  typeof onbuildingRatifications,
  OnbuildingRatifications,
  OnbuildingRatificationsCreate,
  OnbuildingRatificationsUpdate,
  OnbuildingRatificationsFilters
> {
  constructor() {
    super(
      onbuildingRatifications,
      OnbuildingRatificationsSelectSchema,
      OnbuildingRatificationsInsertSchema,
      OnbuildingRatificationsUpdateSchema,
      OnbuildingRatificationsFiltersSchema,
    );
  }
}

export const onbuildingRatificationsService = new OnbuildingRatificationsService();
