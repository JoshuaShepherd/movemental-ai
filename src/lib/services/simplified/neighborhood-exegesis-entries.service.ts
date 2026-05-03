import { neighborhoodExegesisEntries } from "@/lib/db/schema";
import {
  NeighborhoodExegesisEntriesSelectSchema,
  NeighborhoodExegesisEntriesInsertSchema,
  NeighborhoodExegesisEntriesUpdateSchema,
  NeighborhoodExegesisEntriesFiltersSchema,
  type NeighborhoodExegesisEntries,
  type NeighborhoodExegesisEntriesCreate,
  type NeighborhoodExegesisEntriesUpdate,
  type NeighborhoodExegesisEntriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NeighborhoodExegesisEntriesService extends SimplifiedService<
  typeof neighborhoodExegesisEntries,
  NeighborhoodExegesisEntries,
  NeighborhoodExegesisEntriesCreate,
  NeighborhoodExegesisEntriesUpdate,
  NeighborhoodExegesisEntriesFilters
> {
  constructor() {
    super(
      neighborhoodExegesisEntries,
      NeighborhoodExegesisEntriesSelectSchema,
      NeighborhoodExegesisEntriesInsertSchema,
      NeighborhoodExegesisEntriesUpdateSchema,
      NeighborhoodExegesisEntriesFiltersSchema,
    );
  }
}

export const neighborhoodExegesisEntriesService = new NeighborhoodExegesisEntriesService();
