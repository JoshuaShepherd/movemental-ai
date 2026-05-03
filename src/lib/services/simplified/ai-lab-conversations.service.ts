import { aiLabConversations } from "@/lib/db/schema";
import {
  AiLabConversationsSelectSchema,
  AiLabConversationsInsertSchema,
  AiLabConversationsUpdateSchema,
  AiLabConversationsFiltersSchema,
  type AiLabConversations,
  type AiLabConversationsCreate,
  type AiLabConversationsUpdate,
  type AiLabConversationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiLabConversationsService extends SimplifiedService<
  typeof aiLabConversations,
  AiLabConversations,
  AiLabConversationsCreate,
  AiLabConversationsUpdate,
  AiLabConversationsFilters
> {
  constructor() {
    super(
      aiLabConversations,
      AiLabConversationsSelectSchema,
      AiLabConversationsInsertSchema,
      AiLabConversationsUpdateSchema,
      AiLabConversationsFiltersSchema,
    );
  }
}

export const aiLabConversationsService = new AiLabConversationsService();
