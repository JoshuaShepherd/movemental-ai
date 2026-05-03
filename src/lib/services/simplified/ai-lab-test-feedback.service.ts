import { aiLabTestFeedback } from "@/lib/db/schema";
import {
  AiLabTestFeedbackSelectSchema,
  AiLabTestFeedbackInsertSchema,
  AiLabTestFeedbackUpdateSchema,
  AiLabTestFeedbackFiltersSchema,
  type AiLabTestFeedback,
  type AiLabTestFeedbackCreate,
  type AiLabTestFeedbackUpdate,
  type AiLabTestFeedbackFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiLabTestFeedbackService extends SimplifiedService<
  typeof aiLabTestFeedback,
  AiLabTestFeedback,
  AiLabTestFeedbackCreate,
  AiLabTestFeedbackUpdate,
  AiLabTestFeedbackFilters
> {
  constructor() {
    super(
      aiLabTestFeedback,
      AiLabTestFeedbackSelectSchema,
      AiLabTestFeedbackInsertSchema,
      AiLabTestFeedbackUpdateSchema,
      AiLabTestFeedbackFiltersSchema,
    );
  }
}

export const aiLabTestFeedbackService = new AiLabTestFeedbackService();
