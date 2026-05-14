import { recipes } from "@/lib/db/schema";
import {
  RecipesSelectSchema,
  RecipesInsertSchema,
  RecipesUpdateSchema,
  RecipesFiltersSchema,
  type Recipes,
  type RecipesCreate,
  type RecipesUpdate,
  type RecipesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class RecipesService extends SimplifiedService<
  typeof recipes,
  Recipes,
  RecipesCreate,
  RecipesUpdate,
  RecipesFilters
> {
  constructor() {
    super(
      recipes,
      RecipesSelectSchema,
      RecipesInsertSchema,
      RecipesUpdateSchema,
      RecipesFiltersSchema,
    );
  }
}

export const recipesService = new RecipesService();
