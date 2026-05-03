import { contentWorkflows } from "@/lib/db/schema";
import {
  ContentWorkflowsSelectSchema,
  ContentWorkflowsInsertSchema,
  ContentWorkflowsUpdateSchema,
  ContentWorkflowsFiltersSchema,
  type ContentWorkflows,
  type ContentWorkflowsCreate,
  type ContentWorkflowsUpdate,
  type ContentWorkflowsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContentWorkflowsService extends SimplifiedService<
  typeof contentWorkflows,
  ContentWorkflows,
  ContentWorkflowsCreate,
  ContentWorkflowsUpdate,
  ContentWorkflowsFilters
> {
  constructor() {
    super(
      contentWorkflows,
      ContentWorkflowsSelectSchema,
      ContentWorkflowsInsertSchema,
      ContentWorkflowsUpdateSchema,
      ContentWorkflowsFiltersSchema,
    );
  }
}

export const contentWorkflowsService = new ContentWorkflowsService();
