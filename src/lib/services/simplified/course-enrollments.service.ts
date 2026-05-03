import { courseEnrollments } from "@/lib/db/schema";
import {
  CourseEnrollmentsSelectSchema,
  CourseEnrollmentsInsertSchema,
  CourseEnrollmentsUpdateSchema,
  CourseEnrollmentsFiltersSchema,
  type CourseEnrollments,
  type CourseEnrollmentsCreate,
  type CourseEnrollmentsUpdate,
  type CourseEnrollmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseEnrollmentsService extends SimplifiedService<
  typeof courseEnrollments,
  CourseEnrollments,
  CourseEnrollmentsCreate,
  CourseEnrollmentsUpdate,
  CourseEnrollmentsFilters
> {
  constructor() {
    super(
      courseEnrollments,
      CourseEnrollmentsSelectSchema,
      CourseEnrollmentsInsertSchema,
      CourseEnrollmentsUpdateSchema,
      CourseEnrollmentsFiltersSchema,
    );
  }
}

export const courseEnrollmentsService = new CourseEnrollmentsService();
