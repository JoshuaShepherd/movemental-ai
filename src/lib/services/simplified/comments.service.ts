import { comments } from "@/lib/db/schema";
import {
  CommentsSelectSchema,
  CommentsInsertSchema,
  CommentsUpdateSchema,
  CommentsFiltersSchema,
  type Comments,
  type CommentsCreate,
  type CommentsUpdate,
  type CommentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CommentsService extends SimplifiedService<
  typeof comments,
  Comments,
  CommentsCreate,
  CommentsUpdate,
  CommentsFilters
> {
  constructor() {
    super(
      comments,
      CommentsSelectSchema,
      CommentsInsertSchema,
      CommentsUpdateSchema,
      CommentsFiltersSchema,
    );
  }
}

export const commentsService = new CommentsService();
