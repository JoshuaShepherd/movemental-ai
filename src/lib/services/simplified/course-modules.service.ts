import { courseModules } from "@/lib/db/schema";
import {
  CourseModulesSelectSchema,
  CourseModulesInsertSchema,
  CourseModulesUpdateSchema,
  CourseModulesFiltersSchema,
  type CourseModules,
  type CourseModulesCreate,
  type CourseModulesUpdate,
  type CourseModulesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseModulesService extends SimplifiedService<
  typeof courseModules,
  CourseModules,
  CourseModulesCreate,
  CourseModulesUpdate,
  CourseModulesFilters
> {
  constructor() {
    super(
      courseModules,
      CourseModulesSelectSchema,
      CourseModulesInsertSchema,
      CourseModulesUpdateSchema,
      CourseModulesFiltersSchema,
    );
  }
}

export const courseModulesService = new CourseModulesService();
