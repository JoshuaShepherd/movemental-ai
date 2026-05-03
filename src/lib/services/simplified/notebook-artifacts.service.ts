import { notebookArtifacts } from "@/lib/db/schema";
import {
  NotebookArtifactsSelectSchema,
  NotebookArtifactsInsertSchema,
  NotebookArtifactsUpdateSchema,
  NotebookArtifactsFiltersSchema,
  type NotebookArtifacts,
  type NotebookArtifactsCreate,
  type NotebookArtifactsUpdate,
  type NotebookArtifactsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NotebookArtifactsService extends SimplifiedService<
  typeof notebookArtifacts,
  NotebookArtifacts,
  NotebookArtifactsCreate,
  NotebookArtifactsUpdate,
  NotebookArtifactsFilters
> {
  constructor() {
    super(
      notebookArtifacts,
      NotebookArtifactsSelectSchema,
      NotebookArtifactsInsertSchema,
      NotebookArtifactsUpdateSchema,
      NotebookArtifactsFiltersSchema,
    );
  }
}

export const notebookArtifactsService = new NotebookArtifactsService();
