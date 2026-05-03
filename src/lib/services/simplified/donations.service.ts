import { donations } from "@/lib/db/schema";
import {
  DonationsSelectSchema,
  DonationsInsertSchema,
  DonationsUpdateSchema,
  DonationsFiltersSchema,
  type Donations,
  type DonationsCreate,
  type DonationsUpdate,
  type DonationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class DonationsService extends SimplifiedService<
  typeof donations,
  Donations,
  DonationsCreate,
  DonationsUpdate,
  DonationsFilters
> {
  constructor() {
    super(
      donations,
      DonationsSelectSchema,
      DonationsInsertSchema,
      DonationsUpdateSchema,
      DonationsFiltersSchema,
    );
  }
}

export const donationsService = new DonationsService();
