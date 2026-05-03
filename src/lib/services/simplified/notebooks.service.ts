import { notebooks } from "@/lib/db/schema";
import {
  NotebooksSelectSchema,
  NotebooksInsertSchema,
  NotebooksUpdateSchema,
  NotebooksFiltersSchema,
  type Notebooks,
  type NotebooksCreate,
  type NotebooksUpdate,
  type NotebooksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NotebooksService extends SimplifiedService<
  typeof notebooks,
  Notebooks,
  NotebooksCreate,
  NotebooksUpdate,
  NotebooksFilters
> {
  constructor() {
    super(
      notebooks,
      NotebooksSelectSchema,
      NotebooksInsertSchema,
      NotebooksUpdateSchema,
      NotebooksFiltersSchema,
    );
  }
}

export const notebooksService = new NotebooksService();
