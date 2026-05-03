import { assignmentGrades } from "@/lib/db/schema";
import {
  AssignmentGradesSelectSchema,
  AssignmentGradesInsertSchema,
  AssignmentGradesUpdateSchema,
  AssignmentGradesFiltersSchema,
  type AssignmentGrades,
  type AssignmentGradesCreate,
  type AssignmentGradesUpdate,
  type AssignmentGradesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssignmentGradesService extends SimplifiedService<
  typeof assignmentGrades,
  AssignmentGrades,
  AssignmentGradesCreate,
  AssignmentGradesUpdate,
  AssignmentGradesFilters
> {
  constructor() {
    super(
      assignmentGrades,
      AssignmentGradesSelectSchema,
      AssignmentGradesInsertSchema,
      AssignmentGradesUpdateSchema,
      AssignmentGradesFiltersSchema,
    );
  }
}

export const assignmentGradesService = new AssignmentGradesService();
