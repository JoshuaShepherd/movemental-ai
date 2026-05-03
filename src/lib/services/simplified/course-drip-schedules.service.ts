import { courseDripSchedules } from "@/lib/db/schema";
import {
  CourseDripSchedulesSelectSchema,
  CourseDripSchedulesInsertSchema,
  CourseDripSchedulesUpdateSchema,
  CourseDripSchedulesFiltersSchema,
  type CourseDripSchedules,
  type CourseDripSchedulesCreate,
  type CourseDripSchedulesUpdate,
  type CourseDripSchedulesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseDripSchedulesService extends SimplifiedService<
  typeof courseDripSchedules,
  CourseDripSchedules,
  CourseDripSchedulesCreate,
  CourseDripSchedulesUpdate,
  CourseDripSchedulesFilters
> {
  constructor() {
    super(
      courseDripSchedules,
      CourseDripSchedulesSelectSchema,
      CourseDripSchedulesInsertSchema,
      CourseDripSchedulesUpdateSchema,
      CourseDripSchedulesFiltersSchema,
    );
  }
}

export const courseDripSchedulesService = new CourseDripSchedulesService();
