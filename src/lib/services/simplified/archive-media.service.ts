import { archiveMedia } from "@/lib/db/schema";
import {
  ArchiveMediaSelectSchema,
  ArchiveMediaInsertSchema,
  ArchiveMediaUpdateSchema,
  ArchiveMediaFiltersSchema,
  type ArchiveMedia,
  type ArchiveMediaCreate,
  type ArchiveMediaUpdate,
  type ArchiveMediaFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ArchiveMediaService extends SimplifiedService<
  typeof archiveMedia,
  ArchiveMedia,
  ArchiveMediaCreate,
  ArchiveMediaUpdate,
  ArchiveMediaFilters
> {
  constructor() {
    super(
      archiveMedia,
      ArchiveMediaSelectSchema,
      ArchiveMediaInsertSchema,
      ArchiveMediaUpdateSchema,
      ArchiveMediaFiltersSchema,
    );
  }
}

export const archiveMediaService = new ArchiveMediaService();
