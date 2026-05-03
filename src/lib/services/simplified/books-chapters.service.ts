import { booksChapters } from "@/lib/db/schema";
import {
  BooksChaptersSelectSchema,
  BooksChaptersInsertSchema,
  BooksChaptersUpdateSchema,
  BooksChaptersFiltersSchema,
  type BooksChapters,
  type BooksChaptersCreate,
  type BooksChaptersUpdate,
  type BooksChaptersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BooksChaptersService extends SimplifiedService<
  typeof booksChapters,
  BooksChapters,
  BooksChaptersCreate,
  BooksChaptersUpdate,
  BooksChaptersFilters
> {
  constructor() {
    super(
      booksChapters,
      BooksChaptersSelectSchema,
      BooksChaptersInsertSchema,
      BooksChaptersUpdateSchema,
      BooksChaptersFiltersSchema,
    );
  }
}

export const booksChaptersService = new BooksChaptersService();
