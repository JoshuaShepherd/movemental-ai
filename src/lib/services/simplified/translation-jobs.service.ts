import { translationJobs } from "@/lib/db/schema";
import {
  TranslationJobsSelectSchema,
  TranslationJobsInsertSchema,
  TranslationJobsUpdateSchema,
  TranslationJobsFiltersSchema,
  type TranslationJobs,
  type TranslationJobsCreate,
  type TranslationJobsUpdate,
  type TranslationJobsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class TranslationJobsService extends SimplifiedService<
  typeof translationJobs,
  TranslationJobs,
  TranslationJobsCreate,
  TranslationJobsUpdate,
  TranslationJobsFilters
> {
  constructor() {
    super(
      translationJobs,
      TranslationJobsSelectSchema,
      TranslationJobsInsertSchema,
      TranslationJobsUpdateSchema,
      TranslationJobsFiltersSchema,
    );
  }
}

export const translationJobsService = new TranslationJobsService();
