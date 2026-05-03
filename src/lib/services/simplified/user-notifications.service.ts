import { userNotifications } from "@/lib/db/schema";
import {
  UserNotificationsSelectSchema,
  UserNotificationsInsertSchema,
  UserNotificationsUpdateSchema,
  UserNotificationsFiltersSchema,
  type UserNotifications,
  type UserNotificationsCreate,
  type UserNotificationsUpdate,
  type UserNotificationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserNotificationsService extends SimplifiedService<
  typeof userNotifications,
  UserNotifications,
  UserNotificationsCreate,
  UserNotificationsUpdate,
  UserNotificationsFilters
> {
  constructor() {
    super(
      userNotifications,
      UserNotificationsSelectSchema,
      UserNotificationsInsertSchema,
      UserNotificationsUpdateSchema,
      UserNotificationsFiltersSchema,
    );
  }
}

export const userNotificationsService = new UserNotificationsService();
