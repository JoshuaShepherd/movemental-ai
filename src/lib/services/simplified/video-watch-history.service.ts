import { videoWatchHistory } from "@/lib/db/schema";
import {
  VideoWatchHistorySelectSchema,
  VideoWatchHistoryInsertSchema,
  VideoWatchHistoryUpdateSchema,
  VideoWatchHistoryFiltersSchema,
  type VideoWatchHistory,
  type VideoWatchHistoryCreate,
  type VideoWatchHistoryUpdate,
  type VideoWatchHistoryFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoWatchHistoryService extends SimplifiedService<
  typeof videoWatchHistory,
  VideoWatchHistory,
  VideoWatchHistoryCreate,
  VideoWatchHistoryUpdate,
  VideoWatchHistoryFilters
> {
  constructor() {
    super(
      videoWatchHistory,
      VideoWatchHistorySelectSchema,
      VideoWatchHistoryInsertSchema,
      VideoWatchHistoryUpdateSchema,
      VideoWatchHistoryFiltersSchema,
    );
  }
}

export const videoWatchHistoryService = new VideoWatchHistoryService();
