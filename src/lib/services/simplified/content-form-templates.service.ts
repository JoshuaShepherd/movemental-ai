import { contentFormTemplates } from "@/lib/db/schema";
import {
  ContentFormTemplatesSelectSchema,
  ContentFormTemplatesInsertSchema,
  ContentFormTemplatesUpdateSchema,
  ContentFormTemplatesFiltersSchema,
  type ContentFormTemplates,
  type ContentFormTemplatesCreate,
  type ContentFormTemplatesUpdate,
  type ContentFormTemplatesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentFormTemplatesService extends SimplifiedService<
  typeof contentFormTemplates,
  ContentFormTemplates,
  ContentFormTemplatesCreate,
  ContentFormTemplatesUpdate,
  ContentFormTemplatesFilters
> {
  constructor() {
    super(
      contentFormTemplates,
      ContentFormTemplatesSelectSchema,
      ContentFormTemplatesInsertSchema,
      ContentFormTemplatesUpdateSchema,
      ContentFormTemplatesFiltersSchema,
    );
  }
}

export const contentFormTemplatesService = new ContentFormTemplatesService();
