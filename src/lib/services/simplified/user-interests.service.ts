import { userInterests } from "@/lib/db/schema";
import {
  UserInterestsSelectSchema,
  UserInterestsInsertSchema,
  UserInterestsUpdateSchema,
  UserInterestsFiltersSchema,
  type UserInterests,
  type UserInterestsCreate,
  type UserInterestsUpdate,
  type UserInterestsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserInterestsService extends SimplifiedService<
  typeof userInterests,
  UserInterests,
  UserInterestsCreate,
  UserInterestsUpdate,
  UserInterestsFilters
> {
  constructor() {
    super(
      userInterests,
      UserInterestsSelectSchema,
      UserInterestsInsertSchema,
      UserInterestsUpdateSchema,
      UserInterestsFiltersSchema,
    );
  }
}

export const userInterestsService = new UserInterestsService();
