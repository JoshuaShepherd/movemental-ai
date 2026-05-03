import { courseBundles } from "@/lib/db/schema";
import {
  CourseBundlesSelectSchema,
  CourseBundlesInsertSchema,
  CourseBundlesUpdateSchema,
  CourseBundlesFiltersSchema,
  type CourseBundles,
  type CourseBundlesCreate,
  type CourseBundlesUpdate,
  type CourseBundlesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseBundlesService extends SimplifiedService<
  typeof courseBundles,
  CourseBundles,
  CourseBundlesCreate,
  CourseBundlesUpdate,
  CourseBundlesFilters
> {
  constructor() {
    super(
      courseBundles,
      CourseBundlesSelectSchema,
      CourseBundlesInsertSchema,
      CourseBundlesUpdateSchema,
      CourseBundlesFiltersSchema,
    );
  }
}

export const courseBundlesService = new CourseBundlesService();
