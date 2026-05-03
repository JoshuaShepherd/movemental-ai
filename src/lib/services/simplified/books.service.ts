import { books } from "@/lib/db/schema";
import {
  BooksSelectSchema,
  BooksInsertSchema,
  BooksUpdateSchema,
  BooksFiltersSchema,
  type Books,
  type BooksCreate,
  type BooksUpdate,
  type BooksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BooksService extends SimplifiedService<
  typeof books,
  Books,
  BooksCreate,
  BooksUpdate,
  BooksFilters
> {
  constructor() {
    super(
      books,
      BooksSelectSchema,
      BooksInsertSchema,
      BooksUpdateSchema,
      BooksFiltersSchema,
    );
  }
}

export const booksService = new BooksService();
