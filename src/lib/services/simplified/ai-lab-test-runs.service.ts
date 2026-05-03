import { aiLabTestRuns } from "@/lib/db/schema";
import {
  AiLabTestRunsSelectSchema,
  AiLabTestRunsInsertSchema,
  AiLabTestRunsUpdateSchema,
  AiLabTestRunsFiltersSchema,
  type AiLabTestRuns,
  type AiLabTestRunsCreate,
  type AiLabTestRunsUpdate,
  type AiLabTestRunsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiLabTestRunsService extends SimplifiedService<
  typeof aiLabTestRuns,
  AiLabTestRuns,
  AiLabTestRunsCreate,
  AiLabTestRunsUpdate,
  AiLabTestRunsFilters
> {
  constructor() {
    super(
      aiLabTestRuns,
      AiLabTestRunsSelectSchema,
      AiLabTestRunsInsertSchema,
      AiLabTestRunsUpdateSchema,
      AiLabTestRunsFiltersSchema,
    );
  }
}

export const aiLabTestRunsService = new AiLabTestRunsService();
