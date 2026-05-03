import { sitePages } from "@/lib/db/schema";
import {
  SitePagesSelectSchema,
  SitePagesInsertSchema,
  SitePagesUpdateSchema,
  SitePagesFiltersSchema,
  type SitePages,
  type SitePagesCreate,
  type SitePagesUpdate,
  type SitePagesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SitePagesService extends SimplifiedService<
  typeof sitePages,
  SitePages,
  SitePagesCreate,
  SitePagesUpdate,
  SitePagesFilters
> {
  constructor() {
    super(
      sitePages,
      SitePagesSelectSchema,
      SitePagesInsertSchema,
      SitePagesUpdateSchema,
      SitePagesFiltersSchema,
    );
  }
}

export const sitePagesService = new SitePagesService();
