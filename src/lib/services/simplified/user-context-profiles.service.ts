import { userContextProfiles } from "@/lib/db/schema";
import {
  UserContextProfilesSelectSchema,
  UserContextProfilesInsertSchema,
  UserContextProfilesUpdateSchema,
  UserContextProfilesFiltersSchema,
  type UserContextProfiles,
  type UserContextProfilesCreate,
  type UserContextProfilesUpdate,
  type UserContextProfilesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserContextProfilesService extends SimplifiedService<
  typeof userContextProfiles,
  UserContextProfiles,
  UserContextProfilesCreate,
  UserContextProfilesUpdate,
  UserContextProfilesFilters
> {
  constructor() {
    super(
      userContextProfiles,
      UserContextProfilesSelectSchema,
      UserContextProfilesInsertSchema,
      UserContextProfilesUpdateSchema,
      UserContextProfilesFiltersSchema,
    );
  }
}

export const userContextProfilesService = new UserContextProfilesService();
