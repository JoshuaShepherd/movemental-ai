import { bookChapters } from "@/lib/db/schema";
import {
  BookChaptersSelectSchema,
  BookChaptersInsertSchema,
  BookChaptersUpdateSchema,
  BookChaptersFiltersSchema,
  type BookChapters,
  type BookChaptersCreate,
  type BookChaptersUpdate,
  type BookChaptersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookChaptersService extends SimplifiedService<
  typeof bookChapters,
  BookChapters,
  BookChaptersCreate,
  BookChaptersUpdate,
  BookChaptersFilters
> {
  constructor() {
    super(
      bookChapters,
      BookChaptersSelectSchema,
      BookChaptersInsertSchema,
      BookChaptersUpdateSchema,
      BookChaptersFiltersSchema,
    );
  }
}

export const bookChaptersService = new BookChaptersService();
