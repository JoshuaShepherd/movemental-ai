import { futurePlans } from "@/lib/db/schema";
import {
  FuturePlansSelectSchema,
  FuturePlansInsertSchema,
  FuturePlansUpdateSchema,
  FuturePlansFiltersSchema,
  type FuturePlans,
  type FuturePlansCreate,
  type FuturePlansUpdate,
  type FuturePlansFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FuturePlansService extends SimplifiedService<
  typeof futurePlans,
  FuturePlans,
  FuturePlansCreate,
  FuturePlansUpdate,
  FuturePlansFilters
> {
  constructor() {
    super(
      futurePlans,
      FuturePlansSelectSchema,
      FuturePlansInsertSchema,
      FuturePlansUpdateSchema,
      FuturePlansFiltersSchema,
    );
  }
}

export const futurePlansService = new FuturePlansService();
