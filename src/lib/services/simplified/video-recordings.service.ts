import { videoRecordings } from "@/lib/db/schema";
import {
  VideoRecordingsSelectSchema,
  VideoRecordingsInsertSchema,
  VideoRecordingsUpdateSchema,
  VideoRecordingsFiltersSchema,
  type VideoRecordings,
  type VideoRecordingsCreate,
  type VideoRecordingsUpdate,
  type VideoRecordingsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoRecordingsService extends SimplifiedService<
  typeof videoRecordings,
  VideoRecordings,
  VideoRecordingsCreate,
  VideoRecordingsUpdate,
  VideoRecordingsFilters
> {
  constructor() {
    super(
      videoRecordings,
      VideoRecordingsSelectSchema,
      VideoRecordingsInsertSchema,
      VideoRecordingsUpdateSchema,
      VideoRecordingsFiltersSchema,
    );
  }
}

export const videoRecordingsService = new VideoRecordingsService();
