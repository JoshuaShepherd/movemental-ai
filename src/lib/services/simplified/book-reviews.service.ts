import { bookReviews } from "@/lib/db/schema";
import {
  BookReviewsSelectSchema,
  BookReviewsInsertSchema,
  BookReviewsUpdateSchema,
  BookReviewsFiltersSchema,
  type BookReviews,
  type BookReviewsCreate,
  type BookReviewsUpdate,
  type BookReviewsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookReviewsService extends SimplifiedService<
  typeof bookReviews,
  BookReviews,
  BookReviewsCreate,
  BookReviewsUpdate,
  BookReviewsFilters
> {
  constructor() {
    super(
      bookReviews,
      BookReviewsSelectSchema,
      BookReviewsInsertSchema,
      BookReviewsUpdateSchema,
      BookReviewsFiltersSchema,
    );
  }
}

export const bookReviewsService = new BookReviewsService();
