import { analyticsEvents } from "@/lib/db/schema";
import {
  AnalyticsEventsSelectSchema,
  AnalyticsEventsInsertSchema,
  AnalyticsEventsUpdateSchema,
  AnalyticsEventsFiltersSchema,
  type AnalyticsEvents,
  type AnalyticsEventsCreate,
  type AnalyticsEventsUpdate,
  type AnalyticsEventsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AnalyticsEventsService extends SimplifiedService<
  typeof analyticsEvents,
  AnalyticsEvents,
  AnalyticsEventsCreate,
  AnalyticsEventsUpdate,
  AnalyticsEventsFilters
> {
  constructor() {
    super(
      analyticsEvents,
      AnalyticsEventsSelectSchema,
      AnalyticsEventsInsertSchema,
      AnalyticsEventsUpdateSchema,
      AnalyticsEventsFiltersSchema,
    );
  }
}

export const analyticsEventsService = new AnalyticsEventsService();
