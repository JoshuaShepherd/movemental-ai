import { workflows } from "@/lib/db/schema";
import {
  WorkflowsSelectSchema,
  WorkflowsInsertSchema,
  WorkflowsUpdateSchema,
  WorkflowsFiltersSchema,
  type Workflows,
  type WorkflowsCreate,
  type WorkflowsUpdate,
  type WorkflowsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WorkflowsService extends SimplifiedService<
  typeof workflows,
  Workflows,
  WorkflowsCreate,
  WorkflowsUpdate,
  WorkflowsFilters
> {
  constructor() {
    super(
      workflows,
      WorkflowsSelectSchema,
      WorkflowsInsertSchema,
      WorkflowsUpdateSchema,
      WorkflowsFiltersSchema,
    );
  }
}

export const workflowsService = new WorkflowsService();
