import { notebookConversations } from "@/lib/db/schema";
import {
  NotebookConversationsSelectSchema,
  NotebookConversationsInsertSchema,
  NotebookConversationsUpdateSchema,
  NotebookConversationsFiltersSchema,
  type NotebookConversations,
  type NotebookConversationsCreate,
  type NotebookConversationsUpdate,
  type NotebookConversationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NotebookConversationsService extends SimplifiedService<
  typeof notebookConversations,
  NotebookConversations,
  NotebookConversationsCreate,
  NotebookConversationsUpdate,
  NotebookConversationsFilters
> {
  constructor() {
    super(
      notebookConversations,
      NotebookConversationsSelectSchema,
      NotebookConversationsInsertSchema,
      NotebookConversationsUpdateSchema,
      NotebookConversationsFiltersSchema,
    );
  }
}

export const notebookConversationsService = new NotebookConversationsService();
