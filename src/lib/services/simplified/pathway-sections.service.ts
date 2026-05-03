import { pathwaySections } from "@/lib/db/schema";
import {
  PathwaySectionsSelectSchema,
  PathwaySectionsInsertSchema,
  PathwaySectionsUpdateSchema,
  PathwaySectionsFiltersSchema,
  type PathwaySections,
  type PathwaySectionsCreate,
  type PathwaySectionsUpdate,
  type PathwaySectionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PathwaySectionsService extends SimplifiedService<
  typeof pathwaySections,
  PathwaySections,
  PathwaySectionsCreate,
  PathwaySectionsUpdate,
  PathwaySectionsFilters
> {
  constructor() {
    super(
      pathwaySections,
      PathwaySectionsSelectSchema,
      PathwaySectionsInsertSchema,
      PathwaySectionsUpdateSchema,
      PathwaySectionsFiltersSchema,
    );
  }
}

export const pathwaySectionsService = new PathwaySectionsService();
