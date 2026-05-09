import { staffUsers } from "@/lib/db/schema";
import {
  StaffUsersSelectSchema,
  StaffUsersInsertSchema,
  StaffUsersUpdateSchema,
  StaffUsersFiltersSchema,
  type StaffUsers,
  type StaffUsersCreate,
  type StaffUsersUpdate,
  type StaffUsersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class StaffUsersService extends SimplifiedService<
  typeof staffUsers,
  StaffUsers,
  StaffUsersCreate,
  StaffUsersUpdate,
  StaffUsersFilters
> {
  constructor() {
    super(
      staffUsers,
      StaffUsersSelectSchema,
      StaffUsersInsertSchema,
      StaffUsersUpdateSchema,
      StaffUsersFiltersSchema,
    );
  }
}

export const staffUsersService = new StaffUsersService();
