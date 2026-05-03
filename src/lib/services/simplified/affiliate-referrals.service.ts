import { affiliateReferrals } from "@/lib/db/schema";
import {
  AffiliateReferralsSelectSchema,
  AffiliateReferralsInsertSchema,
  AffiliateReferralsUpdateSchema,
  AffiliateReferralsFiltersSchema,
  type AffiliateReferrals,
  type AffiliateReferralsCreate,
  type AffiliateReferralsUpdate,
  type AffiliateReferralsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AffiliateReferralsService extends SimplifiedService<
  typeof affiliateReferrals,
  AffiliateReferrals,
  AffiliateReferralsCreate,
  AffiliateReferralsUpdate,
  AffiliateReferralsFilters
> {
  constructor() {
    super(
      affiliateReferrals,
      AffiliateReferralsSelectSchema,
      AffiliateReferralsInsertSchema,
      AffiliateReferralsUpdateSchema,
      AffiliateReferralsFiltersSchema,
    );
  }
}

export const affiliateReferralsService = new AffiliateReferralsService();
