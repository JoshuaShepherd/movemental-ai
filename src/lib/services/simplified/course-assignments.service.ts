import { courseAssignments } from "@/lib/db/schema";
import {
  CourseAssignmentsSelectSchema,
  CourseAssignmentsInsertSchema,
  CourseAssignmentsUpdateSchema,
  CourseAssignmentsFiltersSchema,
  type CourseAssignments,
  type CourseAssignmentsCreate,
  type CourseAssignmentsUpdate,
  type CourseAssignmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseAssignmentsService extends SimplifiedService<
  typeof courseAssignments,
  CourseAssignments,
  CourseAssignmentsCreate,
  CourseAssignmentsUpdate,
  CourseAssignmentsFilters
> {
  constructor() {
    super(
      courseAssignments,
      CourseAssignmentsSelectSchema,
      CourseAssignmentsInsertSchema,
      CourseAssignmentsUpdateSchema,
      CourseAssignmentsFiltersSchema,
    );
  }
}

export const courseAssignmentsService = new CourseAssignmentsService();
