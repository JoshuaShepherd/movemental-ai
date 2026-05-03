import { writingSessionFeedback } from "@/lib/db/schema";
import {
  WritingSessionFeedbackSelectSchema,
  WritingSessionFeedbackInsertSchema,
  WritingSessionFeedbackUpdateSchema,
  WritingSessionFeedbackFiltersSchema,
  type WritingSessionFeedback,
  type WritingSessionFeedbackCreate,
  type WritingSessionFeedbackUpdate,
  type WritingSessionFeedbackFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WritingSessionFeedbackService extends SimplifiedService<
  typeof writingSessionFeedback,
  WritingSessionFeedback,
  WritingSessionFeedbackCreate,
  WritingSessionFeedbackUpdate,
  WritingSessionFeedbackFilters
> {
  constructor() {
    super(
      writingSessionFeedback,
      WritingSessionFeedbackSelectSchema,
      WritingSessionFeedbackInsertSchema,
      WritingSessionFeedbackUpdateSchema,
      WritingSessionFeedbackFiltersSchema,
    );
  }
}

export const writingSessionFeedbackService = new WritingSessionFeedbackService();
