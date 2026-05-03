import { coupons } from "@/lib/db/schema";
import {
  CouponsSelectSchema,
  CouponsInsertSchema,
  CouponsUpdateSchema,
  CouponsFiltersSchema,
  type Coupons,
  type CouponsCreate,
  type CouponsUpdate,
  type CouponsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CouponsService extends SimplifiedService<
  typeof coupons,
  Coupons,
  CouponsCreate,
  CouponsUpdate,
  CouponsFilters
> {
  constructor() {
    super(
      coupons,
      CouponsSelectSchema,
      CouponsInsertSchema,
      CouponsUpdateSchema,
      CouponsFiltersSchema,
    );
  }
}

export const couponsService = new CouponsService();
