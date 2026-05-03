import { contentAnalytics } from "@/lib/db/schema";
import {
  ContentAnalyticsSelectSchema,
  ContentAnalyticsInsertSchema,
  ContentAnalyticsUpdateSchema,
  ContentAnalyticsFiltersSchema,
  type ContentAnalytics,
  type ContentAnalyticsCreate,
  type ContentAnalyticsUpdate,
  type ContentAnalyticsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentAnalyticsService extends SimplifiedService<
  typeof contentAnalytics,
  ContentAnalytics,
  ContentAnalyticsCreate,
  ContentAnalyticsUpdate,
  ContentAnalyticsFilters
> {
  constructor() {
    super(
      contentAnalytics,
      ContentAnalyticsSelectSchema,
      ContentAnalyticsInsertSchema,
      ContentAnalyticsUpdateSchema,
      ContentAnalyticsFiltersSchema,
    );
  }
}

export const contentAnalyticsService = new ContentAnalyticsService();
