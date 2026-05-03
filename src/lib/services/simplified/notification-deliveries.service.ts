import { notificationDeliveries } from "@/lib/db/schema";
import {
  NotificationDeliveriesSelectSchema,
  NotificationDeliveriesInsertSchema,
  NotificationDeliveriesUpdateSchema,
  NotificationDeliveriesFiltersSchema,
  type NotificationDeliveries,
  type NotificationDeliveriesCreate,
  type NotificationDeliveriesUpdate,
  type NotificationDeliveriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NotificationDeliveriesService extends SimplifiedService<
  typeof notificationDeliveries,
  NotificationDeliveries,
  NotificationDeliveriesCreate,
  NotificationDeliveriesUpdate,
  NotificationDeliveriesFilters
> {
  constructor() {
    super(
      notificationDeliveries,
      NotificationDeliveriesSelectSchema,
      NotificationDeliveriesInsertSchema,
      NotificationDeliveriesUpdateSchema,
      NotificationDeliveriesFiltersSchema,
    );
  }
}

export const notificationDeliveriesService = new NotificationDeliveriesService();
