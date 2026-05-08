import { corpusBindings } from "@/lib/db/schema";
import {
  CorpusBindingsSelectSchema,
  CorpusBindingsInsertSchema,
  CorpusBindingsUpdateSchema,
  CorpusBindingsFiltersSchema,
  type CorpusBindings,
  type CorpusBindingsCreate,
  type CorpusBindingsUpdate,
  type CorpusBindingsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CorpusBindingsService extends SimplifiedService<
  typeof corpusBindings,
  CorpusBindings,
  CorpusBindingsCreate,
  CorpusBindingsUpdate,
  CorpusBindingsFilters
> {
  constructor() {
    super(
      corpusBindings,
      CorpusBindingsSelectSchema,
      CorpusBindingsInsertSchema,
      CorpusBindingsUpdateSchema,
      CorpusBindingsFiltersSchema,
    );
  }
}

export const corpusBindingsService = new CorpusBindingsService();
