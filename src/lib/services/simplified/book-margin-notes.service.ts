import { bookMarginNotes } from "@/lib/db/schema";
import {
  BookMarginNotesSelectSchema,
  BookMarginNotesInsertSchema,
  BookMarginNotesUpdateSchema,
  BookMarginNotesFiltersSchema,
  type BookMarginNotes,
  type BookMarginNotesCreate,
  type BookMarginNotesUpdate,
  type BookMarginNotesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookMarginNotesService extends SimplifiedService<
  typeof bookMarginNotes,
  BookMarginNotes,
  BookMarginNotesCreate,
  BookMarginNotesUpdate,
  BookMarginNotesFilters
> {
  constructor() {
    super(
      bookMarginNotes,
      BookMarginNotesSelectSchema,
      BookMarginNotesInsertSchema,
      BookMarginNotesUpdateSchema,
      BookMarginNotesFiltersSchema,
    );
  }
}

export const bookMarginNotesService = new BookMarginNotesService();
