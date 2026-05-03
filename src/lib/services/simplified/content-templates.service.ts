import { contentTemplates } from "@/lib/db/schema";
import {
  ContentTemplatesSelectSchema,
  ContentTemplatesInsertSchema,
  ContentTemplatesUpdateSchema,
  ContentTemplatesFiltersSchema,
  type ContentTemplates,
  type ContentTemplatesCreate,
  type ContentTemplatesUpdate,
  type ContentTemplatesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentTemplatesService extends SimplifiedService<
  typeof contentTemplates,
  ContentTemplates,
  ContentTemplatesCreate,
  ContentTemplatesUpdate,
  ContentTemplatesFilters
> {
  constructor() {
    super(
      contentTemplates,
      ContentTemplatesSelectSchema,
      ContentTemplatesInsertSchema,
      ContentTemplatesUpdateSchema,
      ContentTemplatesFiltersSchema,
    );
  }
}

export const contentTemplatesService = new ContentTemplatesService();
