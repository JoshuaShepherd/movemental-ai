import { formationGoals } from "@/lib/db/schema";
import {
  FormationGoalsSelectSchema,
  FormationGoalsInsertSchema,
  FormationGoalsUpdateSchema,
  FormationGoalsFiltersSchema,
  type FormationGoals,
  type FormationGoalsCreate,
  type FormationGoalsUpdate,
  type FormationGoalsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FormationGoalsService extends SimplifiedService<
  typeof formationGoals,
  FormationGoals,
  FormationGoalsCreate,
  FormationGoalsUpdate,
  FormationGoalsFilters
> {
  constructor() {
    super(
      formationGoals,
      FormationGoalsSelectSchema,
      FormationGoalsInsertSchema,
      FormationGoalsUpdateSchema,
      FormationGoalsFiltersSchema,
    );
  }
}

export const formationGoalsService = new FormationGoalsService();
