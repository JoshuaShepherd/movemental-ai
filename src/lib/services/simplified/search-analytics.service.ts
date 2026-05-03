import { searchAnalytics } from "@/lib/db/schema";
import {
  SearchAnalyticsSelectSchema,
  SearchAnalyticsInsertSchema,
  SearchAnalyticsUpdateSchema,
  SearchAnalyticsFiltersSchema,
  type SearchAnalytics,
  type SearchAnalyticsCreate,
  type SearchAnalyticsUpdate,
  type SearchAnalyticsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SearchAnalyticsService extends SimplifiedService<
  typeof searchAnalytics,
  SearchAnalytics,
  SearchAnalyticsCreate,
  SearchAnalyticsUpdate,
  SearchAnalyticsFilters
> {
  constructor() {
    super(
      searchAnalytics,
      SearchAnalyticsSelectSchema,
      SearchAnalyticsInsertSchema,
      SearchAnalyticsUpdateSchema,
      SearchAnalyticsFiltersSchema,
    );
  }
}

export const searchAnalyticsService = new SearchAnalyticsService();
