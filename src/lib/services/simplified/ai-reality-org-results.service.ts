import { aiRealityOrgResults } from "@/lib/db/schema";
import {
  AiRealityOrgResultsSelectSchema,
  AiRealityOrgResultsInsertSchema,
  AiRealityOrgResultsUpdateSchema,
  AiRealityOrgResultsFiltersSchema,
  type AiRealityOrgResults,
  type AiRealityOrgResultsCreate,
  type AiRealityOrgResultsUpdate,
  type AiRealityOrgResultsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiRealityOrgResultsService extends SimplifiedService<
  typeof aiRealityOrgResults,
  AiRealityOrgResults,
  AiRealityOrgResultsCreate,
  AiRealityOrgResultsUpdate,
  AiRealityOrgResultsFilters
> {
  constructor() {
    super(
      aiRealityOrgResults,
      AiRealityOrgResultsSelectSchema,
      AiRealityOrgResultsInsertSchema,
      AiRealityOrgResultsUpdateSchema,
      AiRealityOrgResultsFiltersSchema,
    );
  }
}

export const aiRealityOrgResultsService = new AiRealityOrgResultsService();
