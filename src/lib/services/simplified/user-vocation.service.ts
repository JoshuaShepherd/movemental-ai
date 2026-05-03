import { userVocation } from "@/lib/db/schema";
import {
  UserVocationSelectSchema,
  UserVocationInsertSchema,
  UserVocationUpdateSchema,
  UserVocationFiltersSchema,
  type UserVocation,
  type UserVocationCreate,
  type UserVocationUpdate,
  type UserVocationFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserVocationService extends SimplifiedService<
  typeof userVocation,
  UserVocation,
  UserVocationCreate,
  UserVocationUpdate,
  UserVocationFilters
> {
  constructor() {
    super(
      userVocation,
      UserVocationSelectSchema,
      UserVocationInsertSchema,
      UserVocationUpdateSchema,
      UserVocationFiltersSchema,
    );
  }
}

export const userVocationService = new UserVocationService();
