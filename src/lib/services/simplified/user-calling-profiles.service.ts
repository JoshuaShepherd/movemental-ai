import { userCallingProfiles } from "@/lib/db/schema";
import {
  UserCallingProfilesSelectSchema,
  UserCallingProfilesInsertSchema,
  UserCallingProfilesUpdateSchema,
  UserCallingProfilesFiltersSchema,
  type UserCallingProfiles,
  type UserCallingProfilesCreate,
  type UserCallingProfilesUpdate,
  type UserCallingProfilesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserCallingProfilesService extends SimplifiedService<
  typeof userCallingProfiles,
  UserCallingProfiles,
  UserCallingProfilesCreate,
  UserCallingProfilesUpdate,
  UserCallingProfilesFilters
> {
  constructor() {
    super(
      userCallingProfiles,
      UserCallingProfilesSelectSchema,
      UserCallingProfilesInsertSchema,
      UserCallingProfilesUpdateSchema,
      UserCallingProfilesFiltersSchema,
    );
  }
}

export const userCallingProfilesService = new UserCallingProfilesService();
