import { userPersonality } from "@/lib/db/schema";
import {
  UserPersonalitySelectSchema,
  UserPersonalityInsertSchema,
  UserPersonalityUpdateSchema,
  UserPersonalityFiltersSchema,
  type UserPersonality,
  type UserPersonalityCreate,
  type UserPersonalityUpdate,
  type UserPersonalityFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserPersonalityService extends SimplifiedService<
  typeof userPersonality,
  UserPersonality,
  UserPersonalityCreate,
  UserPersonalityUpdate,
  UserPersonalityFilters
> {
  constructor() {
    super(
      userPersonality,
      UserPersonalitySelectSchema,
      UserPersonalityInsertSchema,
      UserPersonalityUpdateSchema,
      UserPersonalityFiltersSchema,
    );
  }
}

export const userPersonalityService = new UserPersonalityService();
