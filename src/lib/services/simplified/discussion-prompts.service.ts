import { discussionPrompts } from "@/lib/db/schema";
import {
  DiscussionPromptsSelectSchema,
  DiscussionPromptsInsertSchema,
  DiscussionPromptsUpdateSchema,
  DiscussionPromptsFiltersSchema,
  type DiscussionPrompts,
  type DiscussionPromptsCreate,
  type DiscussionPromptsUpdate,
  type DiscussionPromptsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class DiscussionPromptsService extends SimplifiedService<
  typeof discussionPrompts,
  DiscussionPrompts,
  DiscussionPromptsCreate,
  DiscussionPromptsUpdate,
  DiscussionPromptsFilters
> {
  constructor() {
    super(
      discussionPrompts,
      DiscussionPromptsSelectSchema,
      DiscussionPromptsInsertSchema,
      DiscussionPromptsUpdateSchema,
      DiscussionPromptsFiltersSchema,
    );
  }
}

export const discussionPromptsService = new DiscussionPromptsService();
