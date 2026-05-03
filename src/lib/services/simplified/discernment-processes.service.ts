import { discernmentProcesses } from "@/lib/db/schema";
import {
  DiscernmentProcessesSelectSchema,
  DiscernmentProcessesInsertSchema,
  DiscernmentProcessesUpdateSchema,
  DiscernmentProcessesFiltersSchema,
  type DiscernmentProcesses,
  type DiscernmentProcessesCreate,
  type DiscernmentProcessesUpdate,
  type DiscernmentProcessesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class DiscernmentProcessesService extends SimplifiedService<
  typeof discernmentProcesses,
  DiscernmentProcesses,
  DiscernmentProcessesCreate,
  DiscernmentProcessesUpdate,
  DiscernmentProcessesFilters
> {
  constructor() {
    super(
      discernmentProcesses,
      DiscernmentProcessesSelectSchema,
      DiscernmentProcessesInsertSchema,
      DiscernmentProcessesUpdateSchema,
      DiscernmentProcessesFiltersSchema,
    );
  }
}

export const discernmentProcessesService = new DiscernmentProcessesService();
