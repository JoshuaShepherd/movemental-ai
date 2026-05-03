import { podcastEpisodes } from "@/lib/db/schema";
import {
  PodcastEpisodesSelectSchema,
  PodcastEpisodesInsertSchema,
  PodcastEpisodesUpdateSchema,
  PodcastEpisodesFiltersSchema,
  type PodcastEpisodes,
  type PodcastEpisodesCreate,
  type PodcastEpisodesUpdate,
  type PodcastEpisodesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PodcastEpisodesService extends SimplifiedService<
  typeof podcastEpisodes,
  PodcastEpisodes,
  PodcastEpisodesCreate,
  PodcastEpisodesUpdate,
  PodcastEpisodesFilters
> {
  constructor() {
    super(
      podcastEpisodes,
      PodcastEpisodesSelectSchema,
      PodcastEpisodesInsertSchema,
      PodcastEpisodesUpdateSchema,
      PodcastEpisodesFiltersSchema,
    );
  }
}

export const podcastEpisodesService = new PodcastEpisodesService();
