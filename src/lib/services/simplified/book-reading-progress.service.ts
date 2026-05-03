import { bookReadingProgress } from "@/lib/db/schema";
import {
  BookReadingProgressSelectSchema,
  BookReadingProgressInsertSchema,
  BookReadingProgressUpdateSchema,
  BookReadingProgressFiltersSchema,
  type BookReadingProgress,
  type BookReadingProgressCreate,
  type BookReadingProgressUpdate,
  type BookReadingProgressFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookReadingProgressService extends SimplifiedService<
  typeof bookReadingProgress,
  BookReadingProgress,
  BookReadingProgressCreate,
  BookReadingProgressUpdate,
  BookReadingProgressFilters
> {
  constructor() {
    super(
      bookReadingProgress,
      BookReadingProgressSelectSchema,
      BookReadingProgressInsertSchema,
      BookReadingProgressUpdateSchema,
      BookReadingProgressFiltersSchema,
    );
  }
}

export const bookReadingProgressService = new BookReadingProgressService();
