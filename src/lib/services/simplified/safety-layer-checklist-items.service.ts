import { safetyLayerChecklistItems } from "@/lib/db/schema";
import {
  SafetyLayerChecklistItemsSelectSchema,
  SafetyLayerChecklistItemsInsertSchema,
  SafetyLayerChecklistItemsUpdateSchema,
  SafetyLayerChecklistItemsFiltersSchema,
  type SafetyLayerChecklistItems,
  type SafetyLayerChecklistItemsCreate,
  type SafetyLayerChecklistItemsUpdate,
  type SafetyLayerChecklistItemsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyLayerChecklistItemsService extends SimplifiedService<
  typeof safetyLayerChecklistItems,
  SafetyLayerChecklistItems,
  SafetyLayerChecklistItemsCreate,
  SafetyLayerChecklistItemsUpdate,
  SafetyLayerChecklistItemsFilters
> {
  constructor() {
    super(
      safetyLayerChecklistItems,
      SafetyLayerChecklistItemsSelectSchema,
      SafetyLayerChecklistItemsInsertSchema,
      SafetyLayerChecklistItemsUpdateSchema,
      SafetyLayerChecklistItemsFiltersSchema,
    );
  }
}

export const safetyLayerChecklistItemsService = new SafetyLayerChecklistItemsService();
