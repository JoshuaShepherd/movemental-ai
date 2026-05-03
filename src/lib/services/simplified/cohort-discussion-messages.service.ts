import { cohortDiscussionMessages } from "@/lib/db/schema";
import {
  CohortDiscussionMessagesSelectSchema,
  CohortDiscussionMessagesInsertSchema,
  CohortDiscussionMessagesUpdateSchema,
  CohortDiscussionMessagesFiltersSchema,
  type CohortDiscussionMessages,
  type CohortDiscussionMessagesCreate,
  type CohortDiscussionMessagesUpdate,
  type CohortDiscussionMessagesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CohortDiscussionMessagesService extends SimplifiedService<
  typeof cohortDiscussionMessages,
  CohortDiscussionMessages,
  CohortDiscussionMessagesCreate,
  CohortDiscussionMessagesUpdate,
  CohortDiscussionMessagesFilters
> {
  constructor() {
    super(
      cohortDiscussionMessages,
      CohortDiscussionMessagesSelectSchema,
      CohortDiscussionMessagesInsertSchema,
      CohortDiscussionMessagesUpdateSchema,
      CohortDiscussionMessagesFiltersSchema,
    );
  }
}

export const cohortDiscussionMessagesService = new CohortDiscussionMessagesService();
