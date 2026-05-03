import { userProfiles } from "@/lib/db/schema";
import {
  UserProfilesSelectSchema,
  UserProfilesInsertSchema,
  UserProfilesUpdateSchema,
  UserProfilesFiltersSchema,
  type UserProfiles,
  type UserProfilesCreate,
  type UserProfilesUpdate,
  type UserProfilesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserProfilesService extends SimplifiedService<
  typeof userProfiles,
  UserProfiles,
  UserProfilesCreate,
  UserProfilesUpdate,
  UserProfilesFilters
> {
  constructor() {
    super(
      userProfiles,
      UserProfilesSelectSchema,
      UserProfilesInsertSchema,
      UserProfilesUpdateSchema,
      UserProfilesFiltersSchema,
    );
  }
}

export const userProfilesService = new UserProfilesService();
