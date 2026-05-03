import { residencyProjects } from "@/lib/db/schema";
import {
  ResidencyProjectsSelectSchema,
  ResidencyProjectsInsertSchema,
  ResidencyProjectsUpdateSchema,
  ResidencyProjectsFiltersSchema,
  type ResidencyProjects,
  type ResidencyProjectsCreate,
  type ResidencyProjectsUpdate,
  type ResidencyProjectsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ResidencyProjectsService extends SimplifiedService<
  typeof residencyProjects,
  ResidencyProjects,
  ResidencyProjectsCreate,
  ResidencyProjectsUpdate,
  ResidencyProjectsFilters
> {
  constructor() {
    super(
      residencyProjects,
      ResidencyProjectsSelectSchema,
      ResidencyProjectsInsertSchema,
      ResidencyProjectsUpdateSchema,
      ResidencyProjectsFiltersSchema,
    );
  }
}

export const residencyProjectsService = new ResidencyProjectsService();
