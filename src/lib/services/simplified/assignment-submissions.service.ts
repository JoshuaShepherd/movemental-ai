import { assignmentSubmissions } from "@/lib/db/schema";
import {
  AssignmentSubmissionsSelectSchema,
  AssignmentSubmissionsInsertSchema,
  AssignmentSubmissionsUpdateSchema,
  AssignmentSubmissionsFiltersSchema,
  type AssignmentSubmissions,
  type AssignmentSubmissionsCreate,
  type AssignmentSubmissionsUpdate,
  type AssignmentSubmissionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssignmentSubmissionsService extends SimplifiedService<
  typeof assignmentSubmissions,
  AssignmentSubmissions,
  AssignmentSubmissionsCreate,
  AssignmentSubmissionsUpdate,
  AssignmentSubmissionsFilters
> {
  constructor() {
    super(
      assignmentSubmissions,
      AssignmentSubmissionsSelectSchema,
      AssignmentSubmissionsInsertSchema,
      AssignmentSubmissionsUpdateSchema,
      AssignmentSubmissionsFiltersSchema,
    );
  }
}

export const assignmentSubmissionsService = new AssignmentSubmissionsService();
