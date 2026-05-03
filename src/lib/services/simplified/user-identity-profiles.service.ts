import { userIdentityProfiles } from "@/lib/db/schema";
import {
  UserIdentityProfilesSelectSchema,
  UserIdentityProfilesInsertSchema,
  UserIdentityProfilesUpdateSchema,
  UserIdentityProfilesFiltersSchema,
  type UserIdentityProfiles,
  type UserIdentityProfilesCreate,
  type UserIdentityProfilesUpdate,
  type UserIdentityProfilesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserIdentityProfilesService extends SimplifiedService<
  typeof userIdentityProfiles,
  UserIdentityProfiles,
  UserIdentityProfilesCreate,
  UserIdentityProfilesUpdate,
  UserIdentityProfilesFilters
> {
  constructor() {
    super(
      userIdentityProfiles,
      UserIdentityProfilesSelectSchema,
      UserIdentityProfilesInsertSchema,
      UserIdentityProfilesUpdateSchema,
      UserIdentityProfilesFiltersSchema,
    );
  }
}

export const userIdentityProfilesService = new UserIdentityProfilesService();
