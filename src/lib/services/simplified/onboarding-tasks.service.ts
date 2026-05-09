import { onboardingTasks } from "@/lib/db/schema";
import {
  OnboardingTasksSelectSchema,
  OnboardingTasksInsertSchema,
  OnboardingTasksUpdateSchema,
  OnboardingTasksFiltersSchema,
  type OnboardingTasks,
  type OnboardingTasksCreate,
  type OnboardingTasksUpdate,
  type OnboardingTasksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OnboardingTasksService extends SimplifiedService<
  typeof onboardingTasks,
  OnboardingTasks,
  OnboardingTasksCreate,
  OnboardingTasksUpdate,
  OnboardingTasksFilters
> {
  constructor() {
    super(
      onboardingTasks,
      OnboardingTasksSelectSchema,
      OnboardingTasksInsertSchema,
      OnboardingTasksUpdateSchema,
      OnboardingTasksFiltersSchema,
    );
  }
}

export const onboardingTasksService = new OnboardingTasksService();
