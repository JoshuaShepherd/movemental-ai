import { promptPackLayers } from "@/lib/db/schema";
import {
  PromptPackLayersSelectSchema,
  PromptPackLayersInsertSchema,
  PromptPackLayersUpdateSchema,
  PromptPackLayersFiltersSchema,
  type PromptPackLayers,
  type PromptPackLayersCreate,
  type PromptPackLayersUpdate,
  type PromptPackLayersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PromptPackLayersService extends SimplifiedService<
  typeof promptPackLayers,
  PromptPackLayers,
  PromptPackLayersCreate,
  PromptPackLayersUpdate,
  PromptPackLayersFilters
> {
  constructor() {
    super(
      promptPackLayers,
      PromptPackLayersSelectSchema,
      PromptPackLayersInsertSchema,
      PromptPackLayersUpdateSchema,
      PromptPackLayersFiltersSchema,
    );
  }
}

export const promptPackLayersService = new PromptPackLayersService();
