import { courseProgressionRules } from "@/lib/db/schema";
import {
  CourseProgressionRulesSelectSchema,
  CourseProgressionRulesInsertSchema,
  CourseProgressionRulesUpdateSchema,
  CourseProgressionRulesFiltersSchema,
  type CourseProgressionRules,
  type CourseProgressionRulesCreate,
  type CourseProgressionRulesUpdate,
  type CourseProgressionRulesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseProgressionRulesService extends SimplifiedService<
  typeof courseProgressionRules,
  CourseProgressionRules,
  CourseProgressionRulesCreate,
  CourseProgressionRulesUpdate,
  CourseProgressionRulesFilters
> {
  constructor() {
    super(
      courseProgressionRules,
      CourseProgressionRulesSelectSchema,
      CourseProgressionRulesInsertSchema,
      CourseProgressionRulesUpdateSchema,
      CourseProgressionRulesFiltersSchema,
    );
  }
}

export const courseProgressionRulesService = new CourseProgressionRulesService();
