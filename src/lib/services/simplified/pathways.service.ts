import { pathways } from "@/lib/db/schema";
import {
  PathwaysSelectSchema,
  PathwaysInsertSchema,
  PathwaysUpdateSchema,
  PathwaysFiltersSchema,
  type Pathways,
  type PathwaysCreate,
  type PathwaysUpdate,
  type PathwaysFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PathwaysService extends SimplifiedService<
  typeof pathways,
  Pathways,
  PathwaysCreate,
  PathwaysUpdate,
  PathwaysFilters
> {
  constructor() {
    super(
      pathways,
      PathwaysSelectSchema,
      PathwaysInsertSchema,
      PathwaysUpdateSchema,
      PathwaysFiltersSchema,
    );
  }
}

export const pathwaysService = new PathwaysService();
