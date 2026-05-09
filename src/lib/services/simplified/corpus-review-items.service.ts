import { corpusReviewItems } from "@/lib/db/schema";
import {
  CorpusReviewItemsSelectSchema,
  CorpusReviewItemsInsertSchema,
  CorpusReviewItemsUpdateSchema,
  CorpusReviewItemsFiltersSchema,
  type CorpusReviewItems,
  type CorpusReviewItemsCreate,
  type CorpusReviewItemsUpdate,
  type CorpusReviewItemsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CorpusReviewItemsService extends SimplifiedService<
  typeof corpusReviewItems,
  CorpusReviewItems,
  CorpusReviewItemsCreate,
  CorpusReviewItemsUpdate,
  CorpusReviewItemsFilters
> {
  constructor() {
    super(
      corpusReviewItems,
      CorpusReviewItemsSelectSchema,
      CorpusReviewItemsInsertSchema,
      CorpusReviewItemsUpdateSchema,
      CorpusReviewItemsFiltersSchema,
    );
  }
}

export const corpusReviewItemsService = new CorpusReviewItemsService();
