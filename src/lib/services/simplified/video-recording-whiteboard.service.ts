import { videoRecordingWhiteboard } from "@/lib/db/schema";
import {
  VideoRecordingWhiteboardSelectSchema,
  VideoRecordingWhiteboardInsertSchema,
  VideoRecordingWhiteboardUpdateSchema,
  VideoRecordingWhiteboardFiltersSchema,
  type VideoRecordingWhiteboard,
  type VideoRecordingWhiteboardCreate,
  type VideoRecordingWhiteboardUpdate,
  type VideoRecordingWhiteboardFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoRecordingWhiteboardService extends SimplifiedService<
  typeof videoRecordingWhiteboard,
  VideoRecordingWhiteboard,
  VideoRecordingWhiteboardCreate,
  VideoRecordingWhiteboardUpdate,
  VideoRecordingWhiteboardFilters
> {
  constructor() {
    super(
      videoRecordingWhiteboard,
      VideoRecordingWhiteboardSelectSchema,
      VideoRecordingWhiteboardInsertSchema,
      VideoRecordingWhiteboardUpdateSchema,
      VideoRecordingWhiteboardFiltersSchema,
    );
  }
}

export const videoRecordingWhiteboardService = new VideoRecordingWhiteboardService();
