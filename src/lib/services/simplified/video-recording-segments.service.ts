import { videoRecordingSegments } from "@/lib/db/schema";
import {
  VideoRecordingSegmentsSelectSchema,
  VideoRecordingSegmentsInsertSchema,
  VideoRecordingSegmentsUpdateSchema,
  VideoRecordingSegmentsFiltersSchema,
  type VideoRecordingSegments,
  type VideoRecordingSegmentsCreate,
  type VideoRecordingSegmentsUpdate,
  type VideoRecordingSegmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoRecordingSegmentsService extends SimplifiedService<
  typeof videoRecordingSegments,
  VideoRecordingSegments,
  VideoRecordingSegmentsCreate,
  VideoRecordingSegmentsUpdate,
  VideoRecordingSegmentsFilters
> {
  constructor() {
    super(
      videoRecordingSegments,
      VideoRecordingSegmentsSelectSchema,
      VideoRecordingSegmentsInsertSchema,
      VideoRecordingSegmentsUpdateSchema,
      VideoRecordingSegmentsFiltersSchema,
    );
  }
}

export const videoRecordingSegmentsService = new VideoRecordingSegmentsService();
