import { userMemory } from "@/lib/db/schema";
import {
  UserMemorySelectSchema,
  UserMemoryInsertSchema,
  UserMemoryUpdateSchema,
  UserMemoryFiltersSchema,
  type UserMemory,
  type UserMemoryCreate,
  type UserMemoryUpdate,
  type UserMemoryFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserMemoryService extends SimplifiedService<
  typeof userMemory,
  UserMemory,
  UserMemoryCreate,
  UserMemoryUpdate,
  UserMemoryFilters
> {
  constructor() {
    super(
      userMemory,
      UserMemorySelectSchema,
      UserMemoryInsertSchema,
      UserMemoryUpdateSchema,
      UserMemoryFiltersSchema,
    );
  }
}

export const userMemoryService = new UserMemoryService();
