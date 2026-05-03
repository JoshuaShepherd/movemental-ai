import { userStrugglesChallenges } from "@/lib/db/schema";
import {
  UserStrugglesChallengesSelectSchema,
  UserStrugglesChallengesInsertSchema,
  UserStrugglesChallengesUpdateSchema,
  UserStrugglesChallengesFiltersSchema,
  type UserStrugglesChallenges,
  type UserStrugglesChallengesCreate,
  type UserStrugglesChallengesUpdate,
  type UserStrugglesChallengesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserStrugglesChallengesService extends SimplifiedService<
  typeof userStrugglesChallenges,
  UserStrugglesChallenges,
  UserStrugglesChallengesCreate,
  UserStrugglesChallengesUpdate,
  UserStrugglesChallengesFilters
> {
  constructor() {
    super(
      userStrugglesChallenges,
      UserStrugglesChallengesSelectSchema,
      UserStrugglesChallengesInsertSchema,
      UserStrugglesChallengesUpdateSchema,
      UserStrugglesChallengesFiltersSchema,
    );
  }
}

export const userStrugglesChallengesService = new UserStrugglesChallengesService();
