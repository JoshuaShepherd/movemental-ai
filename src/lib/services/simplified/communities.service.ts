import { communities } from "@/lib/db/schema";
import {
  CommunitiesSelectSchema,
  CommunitiesInsertSchema,
  CommunitiesUpdateSchema,
  CommunitiesFiltersSchema,
  type Communities,
  type CommunitiesCreate,
  type CommunitiesUpdate,
  type CommunitiesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CommunitiesService extends SimplifiedService<
  typeof communities,
  Communities,
  CommunitiesCreate,
  CommunitiesUpdate,
  CommunitiesFilters
> {
  constructor() {
    super(
      communities,
      CommunitiesSelectSchema,
      CommunitiesInsertSchema,
      CommunitiesUpdateSchema,
      CommunitiesFiltersSchema,
    );
  }
}

export const communitiesService = new CommunitiesService();
