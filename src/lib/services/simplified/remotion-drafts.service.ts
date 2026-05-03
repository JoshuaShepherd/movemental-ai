import { remotionDrafts } from "@/lib/db/schema";
import {
  RemotionDraftsSelectSchema,
  RemotionDraftsInsertSchema,
  RemotionDraftsUpdateSchema,
  RemotionDraftsFiltersSchema,
  type RemotionDrafts,
  type RemotionDraftsCreate,
  type RemotionDraftsUpdate,
  type RemotionDraftsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class RemotionDraftsService extends SimplifiedService<
  typeof remotionDrafts,
  RemotionDrafts,
  RemotionDraftsCreate,
  RemotionDraftsUpdate,
  RemotionDraftsFilters
> {
  constructor() {
    super(
      remotionDrafts,
      RemotionDraftsSelectSchema,
      RemotionDraftsInsertSchema,
      RemotionDraftsUpdateSchema,
      RemotionDraftsFiltersSchema,
    );
  }
}

export const remotionDraftsService = new RemotionDraftsService();
