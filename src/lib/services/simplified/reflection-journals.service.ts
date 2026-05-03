import { reflectionJournals } from "@/lib/db/schema";
import {
  ReflectionJournalsSelectSchema,
  ReflectionJournalsInsertSchema,
  ReflectionJournalsUpdateSchema,
  ReflectionJournalsFiltersSchema,
  type ReflectionJournals,
  type ReflectionJournalsCreate,
  type ReflectionJournalsUpdate,
  type ReflectionJournalsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ReflectionJournalsService extends SimplifiedService<
  typeof reflectionJournals,
  ReflectionJournals,
  ReflectionJournalsCreate,
  ReflectionJournalsUpdate,
  ReflectionJournalsFilters
> {
  constructor() {
    super(
      reflectionJournals,
      ReflectionJournalsSelectSchema,
      ReflectionJournalsInsertSchema,
      ReflectionJournalsUpdateSchema,
      ReflectionJournalsFiltersSchema,
    );
  }
}

export const reflectionJournalsService = new ReflectionJournalsService();
