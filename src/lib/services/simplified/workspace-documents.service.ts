import { workspaceDocuments } from "@/lib/db/schema";
import {
  WorkspaceDocumentsSelectSchema,
  WorkspaceDocumentsInsertSchema,
  WorkspaceDocumentsUpdateSchema,
  WorkspaceDocumentsFiltersSchema,
  type WorkspaceDocuments,
  type WorkspaceDocumentsCreate,
  type WorkspaceDocumentsUpdate,
  type WorkspaceDocumentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WorkspaceDocumentsService extends SimplifiedService<
  typeof workspaceDocuments,
  WorkspaceDocuments,
  WorkspaceDocumentsCreate,
  WorkspaceDocumentsUpdate,
  WorkspaceDocumentsFilters
> {
  constructor() {
    super(
      workspaceDocuments,
      WorkspaceDocumentsSelectSchema,
      WorkspaceDocumentsInsertSchema,
      WorkspaceDocumentsUpdateSchema,
      WorkspaceDocumentsFiltersSchema,
    );
  }
}

export const workspaceDocumentsService = new WorkspaceDocumentsService();
