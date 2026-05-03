import { userAssessments } from "@/lib/db/schema";
import {
  UserAssessmentsSelectSchema,
  UserAssessmentsInsertSchema,
  UserAssessmentsUpdateSchema,
  UserAssessmentsFiltersSchema,
  type UserAssessments,
  type UserAssessmentsCreate,
  type UserAssessmentsUpdate,
  type UserAssessmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class UserAssessmentsService extends SimplifiedService<
  typeof userAssessments,
  UserAssessments,
  UserAssessmentsCreate,
  UserAssessmentsUpdate,
  UserAssessmentsFilters
> {
  constructor() {
    super(
      userAssessments,
      UserAssessmentsSelectSchema,
      UserAssessmentsInsertSchema,
      UserAssessmentsUpdateSchema,
      UserAssessmentsFiltersSchema,
    );
  }
}

export const userAssessmentsService = new UserAssessmentsService();
