import { safetyGuidebookSignatures } from "@/lib/db/schema";
import {
  SafetyGuidebookSignaturesSelectSchema,
  SafetyGuidebookSignaturesInsertSchema,
  SafetyGuidebookSignaturesUpdateSchema,
  SafetyGuidebookSignaturesFiltersSchema,
  type SafetyGuidebookSignatures,
  type SafetyGuidebookSignaturesCreate,
  type SafetyGuidebookSignaturesUpdate,
  type SafetyGuidebookSignaturesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyGuidebookSignaturesService extends SimplifiedService<
  typeof safetyGuidebookSignatures,
  SafetyGuidebookSignatures,
  SafetyGuidebookSignaturesCreate,
  SafetyGuidebookSignaturesUpdate,
  SafetyGuidebookSignaturesFilters
> {
  constructor() {
    super(
      safetyGuidebookSignatures,
      SafetyGuidebookSignaturesSelectSchema,
      SafetyGuidebookSignaturesInsertSchema,
      SafetyGuidebookSignaturesUpdateSchema,
      SafetyGuidebookSignaturesFiltersSchema,
    );
  }
}

export const safetyGuidebookSignaturesService = new SafetyGuidebookSignaturesService();
