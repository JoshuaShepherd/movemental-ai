import { notebookSourceChunks } from "@/lib/db/schema";
import {
  NotebookSourceChunksSelectSchema,
  NotebookSourceChunksInsertSchema,
  NotebookSourceChunksUpdateSchema,
  NotebookSourceChunksFiltersSchema,
  type NotebookSourceChunks,
  type NotebookSourceChunksCreate,
  type NotebookSourceChunksUpdate,
  type NotebookSourceChunksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NotebookSourceChunksService extends SimplifiedService<
  typeof notebookSourceChunks,
  NotebookSourceChunks,
  NotebookSourceChunksCreate,
  NotebookSourceChunksUpdate,
  NotebookSourceChunksFilters
> {
  constructor() {
    super(
      notebookSourceChunks,
      NotebookSourceChunksSelectSchema,
      NotebookSourceChunksInsertSchema,
      NotebookSourceChunksUpdateSchema,
      NotebookSourceChunksFiltersSchema,
    );
  }
}

export const notebookSourceChunksService = new NotebookSourceChunksService();
