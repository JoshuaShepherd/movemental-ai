import { safetyEnrollments } from "@/lib/db/schema";
import {
  SafetyEnrollmentsSelectSchema,
  SafetyEnrollmentsInsertSchema,
  SafetyEnrollmentsUpdateSchema,
  SafetyEnrollmentsFiltersSchema,
  type SafetyEnrollments,
  type SafetyEnrollmentsCreate,
  type SafetyEnrollmentsUpdate,
  type SafetyEnrollmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyEnrollmentsService extends SimplifiedService<
  typeof safetyEnrollments,
  SafetyEnrollments,
  SafetyEnrollmentsCreate,
  SafetyEnrollmentsUpdate,
  SafetyEnrollmentsFilters
> {
  constructor() {
    super(
      safetyEnrollments,
      SafetyEnrollmentsSelectSchema,
      SafetyEnrollmentsInsertSchema,
      SafetyEnrollmentsUpdateSchema,
      SafetyEnrollmentsFiltersSchema,
    );
  }
}

export const safetyEnrollmentsService = new SafetyEnrollmentsService();
