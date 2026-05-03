import { videoAnnotations } from "@/lib/db/schema";
import {
  VideoAnnotationsSelectSchema,
  VideoAnnotationsInsertSchema,
  VideoAnnotationsUpdateSchema,
  VideoAnnotationsFiltersSchema,
  type VideoAnnotations,
  type VideoAnnotationsCreate,
  type VideoAnnotationsUpdate,
  type VideoAnnotationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class VideoAnnotationsService extends SimplifiedService<
  typeof videoAnnotations,
  VideoAnnotations,
  VideoAnnotationsCreate,
  VideoAnnotationsUpdate,
  VideoAnnotationsFilters
> {
  constructor() {
    super(
      videoAnnotations,
      VideoAnnotationsSelectSchema,
      VideoAnnotationsInsertSchema,
      VideoAnnotationsUpdateSchema,
      VideoAnnotationsFiltersSchema,
    );
  }
}

export const videoAnnotationsService = new VideoAnnotationsService();
