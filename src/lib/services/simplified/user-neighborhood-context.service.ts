import { userNeighborhoodContext } from "@/lib/db/schema";
import {
  UserNeighborhoodContextSelectSchema,
  UserNeighborhoodContextInsertSchema,
  UserNeighborhoodContextUpdateSchema,
  UserNeighborhoodContextFiltersSchema,
  type UserNeighborhoodContext,
  type UserNeighborhoodContextCreate,
  type UserNeighborhoodContextUpdate,
  type UserNeighborhoodContextFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserNeighborhoodContextService extends SimplifiedService<
  typeof userNeighborhoodContext,
  UserNeighborhoodContext,
  UserNeighborhoodContextCreate,
  UserNeighborhoodContextUpdate,
  UserNeighborhoodContextFilters
> {
  constructor() {
    super(
      userNeighborhoodContext,
      UserNeighborhoodContextSelectSchema,
      UserNeighborhoodContextInsertSchema,
      UserNeighborhoodContextUpdateSchema,
      UserNeighborhoodContextFiltersSchema,
    );
  }
}

export const userNeighborhoodContextService = new UserNeighborhoodContextService();
