import { ceCredits } from "@/lib/db/schema";
import {
  CeCreditsSelectSchema,
  CeCreditsInsertSchema,
  CeCreditsUpdateSchema,
  CeCreditsFiltersSchema,
  type CeCredits,
  type CeCreditsCreate,
  type CeCreditsUpdate,
  type CeCreditsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CeCreditsService extends SimplifiedService<
  typeof ceCredits,
  CeCredits,
  CeCreditsCreate,
  CeCreditsUpdate,
  CeCreditsFilters
> {
  constructor() {
    super(
      ceCredits,
      CeCreditsSelectSchema,
      CeCreditsInsertSchema,
      CeCreditsUpdateSchema,
      CeCreditsFiltersSchema,
    );
  }
}

export const ceCreditsService = new CeCreditsService();
