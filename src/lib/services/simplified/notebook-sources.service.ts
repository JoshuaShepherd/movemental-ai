import { notebookSources } from "@/lib/db/schema";
import {
  NotebookSourcesSelectSchema,
  NotebookSourcesInsertSchema,
  NotebookSourcesUpdateSchema,
  NotebookSourcesFiltersSchema,
  type NotebookSources,
  type NotebookSourcesCreate,
  type NotebookSourcesUpdate,
  type NotebookSourcesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NotebookSourcesService extends SimplifiedService<
  typeof notebookSources,
  NotebookSources,
  NotebookSourcesCreate,
  NotebookSourcesUpdate,
  NotebookSourcesFilters
> {
  constructor() {
    super(
      notebookSources,
      NotebookSourcesSelectSchema,
      NotebookSourcesInsertSchema,
      NotebookSourcesUpdateSchema,
      NotebookSourcesFiltersSchema,
    );
  }
}

export const notebookSourcesService = new NotebookSourcesService();
