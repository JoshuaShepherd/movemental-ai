import { userStrengths } from "@/lib/db/schema";
import {
  UserStrengthsSelectSchema,
  UserStrengthsInsertSchema,
  UserStrengthsUpdateSchema,
  UserStrengthsFiltersSchema,
  type UserStrengths,
  type UserStrengthsCreate,
  type UserStrengthsUpdate,
  type UserStrengthsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserStrengthsService extends SimplifiedService<
  typeof userStrengths,
  UserStrengths,
  UserStrengthsCreate,
  UserStrengthsUpdate,
  UserStrengthsFilters
> {
  constructor() {
    super(
      userStrengths,
      UserStrengthsSelectSchema,
      UserStrengthsInsertSchema,
      UserStrengthsUpdateSchema,
      UserStrengthsFiltersSchema,
    );
  }
}

export const userStrengthsService = new UserStrengthsService();
