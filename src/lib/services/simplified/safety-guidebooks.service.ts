import { safetyGuidebooks } from "@/lib/db/schema";
import {
  SafetyGuidebooksSelectSchema,
  SafetyGuidebooksInsertSchema,
  SafetyGuidebooksUpdateSchema,
  SafetyGuidebooksFiltersSchema,
  type SafetyGuidebooks,
  type SafetyGuidebooksCreate,
  type SafetyGuidebooksUpdate,
  type SafetyGuidebooksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyGuidebooksService extends SimplifiedService<
  typeof safetyGuidebooks,
  SafetyGuidebooks,
  SafetyGuidebooksCreate,
  SafetyGuidebooksUpdate,
  SafetyGuidebooksFilters
> {
  constructor() {
    super(
      safetyGuidebooks,
      SafetyGuidebooksSelectSchema,
      SafetyGuidebooksInsertSchema,
      SafetyGuidebooksUpdateSchema,
      SafetyGuidebooksFiltersSchema,
    );
  }
}

export const safetyGuidebooksService = new SafetyGuidebooksService();
