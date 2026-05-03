import { videos } from "@/lib/db/schema";
import {
  VideosSelectSchema,
  VideosInsertSchema,
  VideosUpdateSchema,
  VideosFiltersSchema,
  type Videos,
  type VideosCreate,
  type VideosUpdate,
  type VideosFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideosService extends SimplifiedService<
  typeof videos,
  Videos,
  VideosCreate,
  VideosUpdate,
  VideosFilters
> {
  constructor() {
    super(
      videos,
      VideosSelectSchema,
      VideosInsertSchema,
      VideosUpdateSchema,
      VideosFiltersSchema,
    );
  }
}

export const videosService = new VideosService();
