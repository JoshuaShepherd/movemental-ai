import { bookmarks } from "@/lib/db/schema";
import {
  BookmarksSelectSchema,
  BookmarksInsertSchema,
  BookmarksUpdateSchema,
  BookmarksFiltersSchema,
  type Bookmarks,
  type BookmarksCreate,
  type BookmarksUpdate,
  type BookmarksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookmarksService extends SimplifiedService<
  typeof bookmarks,
  Bookmarks,
  BookmarksCreate,
  BookmarksUpdate,
  BookmarksFilters
> {
  constructor() {
    super(
      bookmarks,
      BookmarksSelectSchema,
      BookmarksInsertSchema,
      BookmarksUpdateSchema,
      BookmarksFiltersSchema,
    );
  }
}

export const bookmarksService = new BookmarksService();
