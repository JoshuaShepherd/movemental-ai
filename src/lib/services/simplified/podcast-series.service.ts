import { podcastSeries } from "@/lib/db/schema";
import {
  PodcastSeriesSelectSchema,
  PodcastSeriesInsertSchema,
  PodcastSeriesUpdateSchema,
  PodcastSeriesFiltersSchema,
  type PodcastSeries,
  type PodcastSeriesCreate,
  type PodcastSeriesUpdate,
  type PodcastSeriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PodcastSeriesService extends SimplifiedService<
  typeof podcastSeries,
  PodcastSeries,
  PodcastSeriesCreate,
  PodcastSeriesUpdate,
  PodcastSeriesFilters
> {
  constructor() {
    super(
      podcastSeries,
      PodcastSeriesSelectSchema,
      PodcastSeriesInsertSchema,
      PodcastSeriesUpdateSchema,
      PodcastSeriesFiltersSchema,
    );
  }
}

export const podcastSeriesService = new PodcastSeriesService();
