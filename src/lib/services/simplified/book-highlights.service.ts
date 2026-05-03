import { bookHighlights } from "@/lib/db/schema";
import {
  BookHighlightsSelectSchema,
  BookHighlightsInsertSchema,
  BookHighlightsUpdateSchema,
  BookHighlightsFiltersSchema,
  type BookHighlights,
  type BookHighlightsCreate,
  type BookHighlightsUpdate,
  type BookHighlightsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookHighlightsService extends SimplifiedService<
  typeof bookHighlights,
  BookHighlights,
  BookHighlightsCreate,
  BookHighlightsUpdate,
  BookHighlightsFilters
> {
  constructor() {
    super(
      bookHighlights,
      BookHighlightsSelectSchema,
      BookHighlightsInsertSchema,
      BookHighlightsUpdateSchema,
      BookHighlightsFiltersSchema,
    );
  }
}

export const bookHighlightsService = new BookHighlightsService();
