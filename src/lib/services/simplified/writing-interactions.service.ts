import { writingInteractions } from "@/lib/db/schema";
import {
  WritingInteractionsSelectSchema,
  WritingInteractionsInsertSchema,
  WritingInteractionsUpdateSchema,
  WritingInteractionsFiltersSchema,
  type WritingInteractions,
  type WritingInteractionsCreate,
  type WritingInteractionsUpdate,
  type WritingInteractionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WritingInteractionsService extends SimplifiedService<
  typeof writingInteractions,
  WritingInteractions,
  WritingInteractionsCreate,
  WritingInteractionsUpdate,
  WritingInteractionsFilters
> {
  constructor() {
    super(
      writingInteractions,
      WritingInteractionsSelectSchema,
      WritingInteractionsInsertSchema,
      WritingInteractionsUpdateSchema,
      WritingInteractionsFiltersSchema,
    );
  }
}

export const writingInteractionsService = new WritingInteractionsService();
