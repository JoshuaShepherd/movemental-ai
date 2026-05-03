import { videoSeries } from "@/lib/db/schema";
import {
  VideoSeriesSelectSchema,
  VideoSeriesInsertSchema,
  VideoSeriesUpdateSchema,
  VideoSeriesFiltersSchema,
  type VideoSeries,
  type VideoSeriesCreate,
  type VideoSeriesUpdate,
  type VideoSeriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoSeriesService extends SimplifiedService<
  typeof videoSeries,
  VideoSeries,
  VideoSeriesCreate,
  VideoSeriesUpdate,
  VideoSeriesFilters
> {
  constructor() {
    super(
      videoSeries,
      VideoSeriesSelectSchema,
      VideoSeriesInsertSchema,
      VideoSeriesUpdateSchema,
      VideoSeriesFiltersSchema,
    );
  }
}

export const videoSeriesService = new VideoSeriesService();
