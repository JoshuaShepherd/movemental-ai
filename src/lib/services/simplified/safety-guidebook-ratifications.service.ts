import { safetyGuidebookRatifications } from "@/lib/db/schema";
import {
  SafetyGuidebookRatificationsSelectSchema,
  SafetyGuidebookRatificationsInsertSchema,
  SafetyGuidebookRatificationsUpdateSchema,
  SafetyGuidebookRatificationsFiltersSchema,
  type SafetyGuidebookRatifications,
  type SafetyGuidebookRatificationsCreate,
  type SafetyGuidebookRatificationsUpdate,
  type SafetyGuidebookRatificationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyGuidebookRatificationsService extends SimplifiedService<
  typeof safetyGuidebookRatifications,
  SafetyGuidebookRatifications,
  SafetyGuidebookRatificationsCreate,
  SafetyGuidebookRatificationsUpdate,
  SafetyGuidebookRatificationsFilters
> {
  constructor() {
    super(
      safetyGuidebookRatifications,
      SafetyGuidebookRatificationsSelectSchema,
      SafetyGuidebookRatificationsInsertSchema,
      SafetyGuidebookRatificationsUpdateSchema,
      SafetyGuidebookRatificationsFiltersSchema,
    );
  }
}

export const safetyGuidebookRatificationsService = new SafetyGuidebookRatificationsService();
