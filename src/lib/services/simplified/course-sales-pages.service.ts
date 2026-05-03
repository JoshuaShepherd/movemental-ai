import { courseSalesPages } from "@/lib/db/schema";
import {
  CourseSalesPagesSelectSchema,
  CourseSalesPagesInsertSchema,
  CourseSalesPagesUpdateSchema,
  CourseSalesPagesFiltersSchema,
  type CourseSalesPages,
  type CourseSalesPagesCreate,
  type CourseSalesPagesUpdate,
  type CourseSalesPagesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseSalesPagesService extends SimplifiedService<
  typeof courseSalesPages,
  CourseSalesPages,
  CourseSalesPagesCreate,
  CourseSalesPagesUpdate,
  CourseSalesPagesFilters
> {
  constructor() {
    super(
      courseSalesPages,
      CourseSalesPagesSelectSchema,
      CourseSalesPagesInsertSchema,
      CourseSalesPagesUpdateSchema,
      CourseSalesPagesFiltersSchema,
    );
  }
}

export const courseSalesPagesService = new CourseSalesPagesService();
