import { writingExamples } from "@/lib/db/schema";
import {
  WritingExamplesSelectSchema,
  WritingExamplesInsertSchema,
  WritingExamplesUpdateSchema,
  WritingExamplesFiltersSchema,
  type WritingExamples,
  type WritingExamplesCreate,
  type WritingExamplesUpdate,
  type WritingExamplesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WritingExamplesService extends SimplifiedService<
  typeof writingExamples,
  WritingExamples,
  WritingExamplesCreate,
  WritingExamplesUpdate,
  WritingExamplesFilters
> {
  constructor() {
    super(
      writingExamples,
      WritingExamplesSelectSchema,
      WritingExamplesInsertSchema,
      WritingExamplesUpdateSchema,
      WritingExamplesFiltersSchema,
    );
  }
}

export const writingExamplesService = new WritingExamplesService();
