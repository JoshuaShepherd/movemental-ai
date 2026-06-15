import { aiRealityShareTokens } from "@/lib/db/schema";
import {
  AiRealityShareTokensSelectSchema,
  AiRealityShareTokensInsertSchema,
  AiRealityShareTokensUpdateSchema,
  AiRealityShareTokensFiltersSchema,
  type AiRealityShareTokens,
  type AiRealityShareTokensCreate,
  type AiRealityShareTokensUpdate,
  type AiRealityShareTokensFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiRealityShareTokensService extends SimplifiedService<
  typeof aiRealityShareTokens,
  AiRealityShareTokens,
  AiRealityShareTokensCreate,
  AiRealityShareTokensUpdate,
  AiRealityShareTokensFilters
> {
  constructor() {
    super(
      aiRealityShareTokens,
      AiRealityShareTokensSelectSchema,
      AiRealityShareTokensInsertSchema,
      AiRealityShareTokensUpdateSchema,
      AiRealityShareTokensFiltersSchema,
    );
  }
}

export const aiRealityShareTokensService = new AiRealityShareTokensService();
