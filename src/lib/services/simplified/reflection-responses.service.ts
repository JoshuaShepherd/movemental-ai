import { reflectionResponses } from "@/lib/db/schema";
import {
  ReflectionResponsesSelectSchema,
  ReflectionResponsesInsertSchema,
  ReflectionResponsesUpdateSchema,
  ReflectionResponsesFiltersSchema,
  type ReflectionResponses,
  type ReflectionResponsesCreate,
  type ReflectionResponsesUpdate,
  type ReflectionResponsesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ReflectionResponsesService extends SimplifiedService<
  typeof reflectionResponses,
  ReflectionResponses,
  ReflectionResponsesCreate,
  ReflectionResponsesUpdate,
  ReflectionResponsesFilters
> {
  constructor() {
    super(
      reflectionResponses,
      ReflectionResponsesSelectSchema,
      ReflectionResponsesInsertSchema,
      ReflectionResponsesUpdateSchema,
      ReflectionResponsesFiltersSchema,
    );
  }
}

export const reflectionResponsesService = new ReflectionResponsesService();
