import { pageViews } from "@/lib/db/schema";
import {
  PageViewsSelectSchema,
  PageViewsInsertSchema,
  PageViewsUpdateSchema,
  PageViewsFiltersSchema,
  type PageViews,
  type PageViewsCreate,
  type PageViewsUpdate,
  type PageViewsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PageViewsService extends SimplifiedService<
  typeof pageViews,
  PageViews,
  PageViewsCreate,
  PageViewsUpdate,
  PageViewsFilters
> {
  constructor() {
    super(
      pageViews,
      PageViewsSelectSchema,
      PageViewsInsertSchema,
      PageViewsUpdateSchema,
      PageViewsFiltersSchema,
    );
  }
}

export const pageViewsService = new PageViewsService();
