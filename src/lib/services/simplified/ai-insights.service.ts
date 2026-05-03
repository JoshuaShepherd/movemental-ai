import { aiInsights } from "@/lib/db/schema";
import {
  AiInsightsSelectSchema,
  AiInsightsInsertSchema,
  AiInsightsUpdateSchema,
  AiInsightsFiltersSchema,
  type AiInsights,
  type AiInsightsCreate,
  type AiInsightsUpdate,
  type AiInsightsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiInsightsService extends SimplifiedService<
  typeof aiInsights,
  AiInsights,
  AiInsightsCreate,
  AiInsightsUpdate,
  AiInsightsFilters
> {
  constructor() {
    super(
      aiInsights,
      AiInsightsSelectSchema,
      AiInsightsInsertSchema,
      AiInsightsUpdateSchema,
      AiInsightsFiltersSchema,
    );
  }
}

export const aiInsightsService = new AiInsightsService();
