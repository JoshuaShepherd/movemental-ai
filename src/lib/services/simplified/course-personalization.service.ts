import { coursePersonalization } from "@/lib/db/schema";
import {
  CoursePersonalizationSelectSchema,
  CoursePersonalizationInsertSchema,
  CoursePersonalizationUpdateSchema,
  CoursePersonalizationFiltersSchema,
  type CoursePersonalization,
  type CoursePersonalizationCreate,
  type CoursePersonalizationUpdate,
  type CoursePersonalizationFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CoursePersonalizationService extends SimplifiedService<
  typeof coursePersonalization,
  CoursePersonalization,
  CoursePersonalizationCreate,
  CoursePersonalizationUpdate,
  CoursePersonalizationFilters
> {
  constructor() {
    super(
      coursePersonalization,
      CoursePersonalizationSelectSchema,
      CoursePersonalizationInsertSchema,
      CoursePersonalizationUpdateSchema,
      CoursePersonalizationFiltersSchema,
    );
  }
}

export const coursePersonalizationService = new CoursePersonalizationService();
