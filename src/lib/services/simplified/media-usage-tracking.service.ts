import { mediaUsageTracking } from "@/lib/db/schema";
import {
  MediaUsageTrackingSelectSchema,
  MediaUsageTrackingInsertSchema,
  MediaUsageTrackingUpdateSchema,
  MediaUsageTrackingFiltersSchema,
  type MediaUsageTracking,
  type MediaUsageTrackingCreate,
  type MediaUsageTrackingUpdate,
  type MediaUsageTrackingFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class MediaUsageTrackingService extends SimplifiedService<
  typeof mediaUsageTracking,
  MediaUsageTracking,
  MediaUsageTrackingCreate,
  MediaUsageTrackingUpdate,
  MediaUsageTrackingFilters
> {
  constructor() {
    super(
      mediaUsageTracking,
      MediaUsageTrackingSelectSchema,
      MediaUsageTrackingInsertSchema,
      MediaUsageTrackingUpdateSchema,
      MediaUsageTrackingFiltersSchema,
    );
  }
}

export const mediaUsageTrackingService = new MediaUsageTrackingService();
