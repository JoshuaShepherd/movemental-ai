import { subscriptionPlans } from "@/lib/db/schema";
import {
  SubscriptionPlansSelectSchema,
  SubscriptionPlansInsertSchema,
  SubscriptionPlansUpdateSchema,
  SubscriptionPlansFiltersSchema,
  type SubscriptionPlans,
  type SubscriptionPlansCreate,
  type SubscriptionPlansUpdate,
  type SubscriptionPlansFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SubscriptionPlansService extends SimplifiedService<
  typeof subscriptionPlans,
  SubscriptionPlans,
  SubscriptionPlansCreate,
  SubscriptionPlansUpdate,
  SubscriptionPlansFilters
> {
  constructor() {
    super(
      subscriptionPlans,
      SubscriptionPlansSelectSchema,
      SubscriptionPlansInsertSchema,
      SubscriptionPlansUpdateSchema,
      SubscriptionPlansFiltersSchema,
    );
  }
}

export const subscriptionPlansService = new SubscriptionPlansService();
