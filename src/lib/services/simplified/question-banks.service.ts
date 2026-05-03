import { questionBanks } from "@/lib/db/schema";
import {
  QuestionBanksSelectSchema,
  QuestionBanksInsertSchema,
  QuestionBanksUpdateSchema,
  QuestionBanksFiltersSchema,
  type QuestionBanks,
  type QuestionBanksCreate,
  type QuestionBanksUpdate,
  type QuestionBanksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class QuestionBanksService extends SimplifiedService<
  typeof questionBanks,
  QuestionBanks,
  QuestionBanksCreate,
  QuestionBanksUpdate,
  QuestionBanksFilters
> {
  constructor() {
    super(
      questionBanks,
      QuestionBanksSelectSchema,
      QuestionBanksInsertSchema,
      QuestionBanksUpdateSchema,
      QuestionBanksFiltersSchema,
    );
  }
}

export const questionBanksService = new QuestionBanksService();
