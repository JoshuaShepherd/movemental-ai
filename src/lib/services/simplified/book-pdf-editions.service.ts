import { bookPdfEditions } from "@/lib/db/schema";
import {
  BookPdfEditionsSelectSchema,
  BookPdfEditionsInsertSchema,
  BookPdfEditionsUpdateSchema,
  BookPdfEditionsFiltersSchema,
  type BookPdfEditions,
  type BookPdfEditionsCreate,
  type BookPdfEditionsUpdate,
  type BookPdfEditionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookPdfEditionsService extends SimplifiedService<
  typeof bookPdfEditions,
  BookPdfEditions,
  BookPdfEditionsCreate,
  BookPdfEditionsUpdate,
  BookPdfEditionsFilters
> {
  constructor() {
    super(
      bookPdfEditions,
      BookPdfEditionsSelectSchema,
      BookPdfEditionsInsertSchema,
      BookPdfEditionsUpdateSchema,
      BookPdfEditionsFiltersSchema,
    );
  }
}

export const bookPdfEditionsService = new BookPdfEditionsService();
