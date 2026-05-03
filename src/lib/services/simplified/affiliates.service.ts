import { affiliates } from "@/lib/db/schema";
import {
  AffiliatesSelectSchema,
  AffiliatesInsertSchema,
  AffiliatesUpdateSchema,
  AffiliatesFiltersSchema,
  type Affiliates,
  type AffiliatesCreate,
  type AffiliatesUpdate,
  type AffiliatesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AffiliatesService extends SimplifiedService<
  typeof affiliates,
  Affiliates,
  AffiliatesCreate,
  AffiliatesUpdate,
  AffiliatesFilters
> {
  constructor() {
    super(
      affiliates,
      AffiliatesSelectSchema,
      AffiliatesInsertSchema,
      AffiliatesUpdateSchema,
      AffiliatesFiltersSchema,
    );
  }
}

export const affiliatesService = new AffiliatesService();
