import { bookEndorsements } from "@/lib/db/schema";
import {
  BookEndorsementsSelectSchema,
  BookEndorsementsInsertSchema,
  BookEndorsementsUpdateSchema,
  BookEndorsementsFiltersSchema,
  type BookEndorsements,
  type BookEndorsementsCreate,
  type BookEndorsementsUpdate,
  type BookEndorsementsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookEndorsementsService extends SimplifiedService<
  typeof bookEndorsements,
  BookEndorsements,
  BookEndorsementsCreate,
  BookEndorsementsUpdate,
  BookEndorsementsFilters
> {
  constructor() {
    super(
      bookEndorsements,
      BookEndorsementsSelectSchema,
      BookEndorsementsInsertSchema,
      BookEndorsementsUpdateSchema,
      BookEndorsementsFiltersSchema,
    );
  }
}

export const bookEndorsementsService = new BookEndorsementsService();
