import { bookEmailSubscribers } from "@/lib/db/schema";
import {
  BookEmailSubscribersSelectSchema,
  BookEmailSubscribersInsertSchema,
  BookEmailSubscribersUpdateSchema,
  BookEmailSubscribersFiltersSchema,
  type BookEmailSubscribers,
  type BookEmailSubscribersCreate,
  type BookEmailSubscribersUpdate,
  type BookEmailSubscribersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookEmailSubscribersService extends SimplifiedService<
  typeof bookEmailSubscribers,
  BookEmailSubscribers,
  BookEmailSubscribersCreate,
  BookEmailSubscribersUpdate,
  BookEmailSubscribersFilters
> {
  constructor() {
    super(
      bookEmailSubscribers,
      BookEmailSubscribersSelectSchema,
      BookEmailSubscribersInsertSchema,
      BookEmailSubscribersUpdateSchema,
      BookEmailSubscribersFiltersSchema,
    );
  }
}

export const bookEmailSubscribersService = new BookEmailSubscribersService();
