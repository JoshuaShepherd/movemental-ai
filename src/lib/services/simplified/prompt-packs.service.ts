import { promptPacks } from "@/lib/db/schema";
import {
  PromptPacksSelectSchema,
  PromptPacksInsertSchema,
  PromptPacksUpdateSchema,
  PromptPacksFiltersSchema,
  type PromptPacks,
  type PromptPacksCreate,
  type PromptPacksUpdate,
  type PromptPacksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PromptPacksService extends SimplifiedService<
  typeof promptPacks,
  PromptPacks,
  PromptPacksCreate,
  PromptPacksUpdate,
  PromptPacksFilters
> {
  constructor() {
    super(
      promptPacks,
      PromptPacksSelectSchema,
      PromptPacksInsertSchema,
      PromptPacksUpdateSchema,
      PromptPacksFiltersSchema,
    );
  }
}

export const promptPacksService = new PromptPacksService();
