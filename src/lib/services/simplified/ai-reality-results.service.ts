import { aiRealityResults } from "@/lib/db/schema";
import {
  AiRealityResultsSelectSchema,
  AiRealityResultsInsertSchema,
  AiRealityResultsUpdateSchema,
  AiRealityResultsFiltersSchema,
  type AiRealityResults,
  type AiRealityResultsCreate,
  type AiRealityResultsUpdate,
  type AiRealityResultsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiRealityResultsService extends SimplifiedService<
  typeof aiRealityResults,
  AiRealityResults,
  AiRealityResultsCreate,
  AiRealityResultsUpdate,
  AiRealityResultsFilters
> {
  constructor() {
    super(
      aiRealityResults,
      AiRealityResultsSelectSchema,
      AiRealityResultsInsertSchema,
      AiRealityResultsUpdateSchema,
      AiRealityResultsFiltersSchema,
    );
  }
}

export const aiRealityResultsService = new AiRealityResultsService();
