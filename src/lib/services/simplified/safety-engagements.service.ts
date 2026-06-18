import { safetyEngagements } from "@/lib/db/schema";
import {
  SafetyEngagementsSelectSchema,
  SafetyEngagementsInsertSchema,
  SafetyEngagementsUpdateSchema,
  SafetyEngagementsFiltersSchema,
  type SafetyEngagements,
  type SafetyEngagementsCreate,
  type SafetyEngagementsUpdate,
  type SafetyEngagementsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyEngagementsService extends SimplifiedService<
  typeof safetyEngagements,
  SafetyEngagements,
  SafetyEngagementsCreate,
  SafetyEngagementsUpdate,
  SafetyEngagementsFilters
> {
  constructor() {
    super(
      safetyEngagements,
      SafetyEngagementsSelectSchema,
      SafetyEngagementsInsertSchema,
      SafetyEngagementsUpdateSchema,
      SafetyEngagementsFiltersSchema,
    );
  }
}

export const safetyEngagementsService = new SafetyEngagementsService();
