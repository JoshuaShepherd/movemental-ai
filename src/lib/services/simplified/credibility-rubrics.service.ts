import { credibilityRubrics } from "@/lib/db/schema";
import {
  CredibilityRubricsSelectSchema,
  CredibilityRubricsInsertSchema,
  CredibilityRubricsUpdateSchema,
  CredibilityRubricsFiltersSchema,
  type CredibilityRubrics,
  type CredibilityRubricsCreate,
  type CredibilityRubricsUpdate,
  type CredibilityRubricsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CredibilityRubricsService extends SimplifiedService<
  typeof credibilityRubrics,
  CredibilityRubrics,
  CredibilityRubricsCreate,
  CredibilityRubricsUpdate,
  CredibilityRubricsFilters
> {
  constructor() {
    super(
      credibilityRubrics,
      CredibilityRubricsSelectSchema,
      CredibilityRubricsInsertSchema,
      CredibilityRubricsUpdateSchema,
      CredibilityRubricsFiltersSchema,
    );
  }
}

export const credibilityRubricsService = new CredibilityRubricsService();
