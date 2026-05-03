import { userSubscriptions } from "@/lib/db/schema";
import {
  UserSubscriptionsSelectSchema,
  UserSubscriptionsInsertSchema,
  UserSubscriptionsUpdateSchema,
  UserSubscriptionsFiltersSchema,
  type UserSubscriptions,
  type UserSubscriptionsCreate,
  type UserSubscriptionsUpdate,
  type UserSubscriptionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserSubscriptionsService extends SimplifiedService<
  typeof userSubscriptions,
  UserSubscriptions,
  UserSubscriptionsCreate,
  UserSubscriptionsUpdate,
  UserSubscriptionsFilters
> {
  constructor() {
    super(
      userSubscriptions,
      UserSubscriptionsSelectSchema,
      UserSubscriptionsInsertSchema,
      UserSubscriptionsUpdateSchema,
      UserSubscriptionsFiltersSchema,
    );
  }
}

export const userSubscriptionsService = new UserSubscriptionsService();
