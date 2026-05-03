import { purchases } from "@/lib/db/schema";
import {
  PurchasesSelectSchema,
  PurchasesInsertSchema,
  PurchasesUpdateSchema,
  PurchasesFiltersSchema,
  type Purchases,
  type PurchasesCreate,
  type PurchasesUpdate,
  type PurchasesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PurchasesService extends SimplifiedService<
  typeof purchases,
  Purchases,
  PurchasesCreate,
  PurchasesUpdate,
  PurchasesFilters
> {
  constructor() {
    super(
      purchases,
      PurchasesSelectSchema,
      PurchasesInsertSchema,
      PurchasesUpdateSchema,
      PurchasesFiltersSchema,
    );
  }
}

export const purchasesService = new PurchasesService();
