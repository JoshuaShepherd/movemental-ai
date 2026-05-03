import { bookRevisions } from "@/lib/db/schema";
import {
  BookRevisionsSelectSchema,
  BookRevisionsInsertSchema,
  BookRevisionsUpdateSchema,
  BookRevisionsFiltersSchema,
  type BookRevisions,
  type BookRevisionsCreate,
  type BookRevisionsUpdate,
  type BookRevisionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookRevisionsService extends SimplifiedService<
  typeof bookRevisions,
  BookRevisions,
  BookRevisionsCreate,
  BookRevisionsUpdate,
  BookRevisionsFilters
> {
  constructor() {
    super(
      bookRevisions,
      BookRevisionsSelectSchema,
      BookRevisionsInsertSchema,
      BookRevisionsUpdateSchema,
      BookRevisionsFiltersSchema,
    );
  }
}

export const bookRevisionsService = new BookRevisionsService();
