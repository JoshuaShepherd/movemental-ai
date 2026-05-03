import { videoRecordingSlides } from "@/lib/db/schema";
import {
  VideoRecordingSlidesSelectSchema,
  VideoRecordingSlidesInsertSchema,
  VideoRecordingSlidesUpdateSchema,
  VideoRecordingSlidesFiltersSchema,
  type VideoRecordingSlides,
  type VideoRecordingSlidesCreate,
  type VideoRecordingSlidesUpdate,
  type VideoRecordingSlidesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoRecordingSlidesService extends SimplifiedService<
  typeof videoRecordingSlides,
  VideoRecordingSlides,
  VideoRecordingSlidesCreate,
  VideoRecordingSlidesUpdate,
  VideoRecordingSlidesFilters
> {
  constructor() {
    super(
      videoRecordingSlides,
      VideoRecordingSlidesSelectSchema,
      VideoRecordingSlidesInsertSchema,
      VideoRecordingSlidesUpdateSchema,
      VideoRecordingSlidesFiltersSchema,
    );
  }
}

export const videoRecordingSlidesService = new VideoRecordingSlidesService();
