import { bookSeries } from "@/lib/db/schema";
import {
  BookSeriesSelectSchema,
  BookSeriesInsertSchema,
  BookSeriesUpdateSchema,
  BookSeriesFiltersSchema,
  type BookSeries,
  type BookSeriesCreate,
  type BookSeriesUpdate,
  type BookSeriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookSeriesService extends SimplifiedService<
  typeof bookSeries,
  BookSeries,
  BookSeriesCreate,
  BookSeriesUpdate,
  BookSeriesFilters
> {
  constructor() {
    super(
      bookSeries,
      BookSeriesSelectSchema,
      BookSeriesInsertSchema,
      BookSeriesUpdateSchema,
      BookSeriesFiltersSchema,
    );
  }
}

export const bookSeriesService = new BookSeriesService();
