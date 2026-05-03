import { bookPurchases } from "@/lib/db/schema";
import {
  BookPurchasesSelectSchema,
  BookPurchasesInsertSchema,
  BookPurchasesUpdateSchema,
  BookPurchasesFiltersSchema,
  type BookPurchases,
  type BookPurchasesCreate,
  type BookPurchasesUpdate,
  type BookPurchasesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class BookPurchasesService extends SimplifiedService<
  typeof bookPurchases,
  BookPurchases,
  BookPurchasesCreate,
  BookPurchasesUpdate,
  BookPurchasesFilters
> {
  constructor() {
    super(
      bookPurchases,
      BookPurchasesSelectSchema,
      BookPurchasesInsertSchema,
      BookPurchasesUpdateSchema,
      BookPurchasesFiltersSchema,
    );
  }
}

export const bookPurchasesService = new BookPurchasesService();
