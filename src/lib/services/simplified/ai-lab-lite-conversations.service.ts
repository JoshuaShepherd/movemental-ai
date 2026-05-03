import { aiLabLiteConversations } from "@/lib/db/schema";
import {
  AiLabLiteConversationsSelectSchema,
  AiLabLiteConversationsInsertSchema,
  AiLabLiteConversationsUpdateSchema,
  AiLabLiteConversationsFiltersSchema,
  type AiLabLiteConversations,
  type AiLabLiteConversationsCreate,
  type AiLabLiteConversationsUpdate,
  type AiLabLiteConversationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiLabLiteConversationsService extends SimplifiedService<
  typeof aiLabLiteConversations,
  AiLabLiteConversations,
  AiLabLiteConversationsCreate,
  AiLabLiteConversationsUpdate,
  AiLabLiteConversationsFilters
> {
  constructor() {
    super(
      aiLabLiteConversations,
      AiLabLiteConversationsSelectSchema,
      AiLabLiteConversationsInsertSchema,
      AiLabLiteConversationsUpdateSchema,
      AiLabLiteConversationsFiltersSchema,
    );
  }
}

export const aiLabLiteConversationsService = new AiLabLiteConversationsService();
