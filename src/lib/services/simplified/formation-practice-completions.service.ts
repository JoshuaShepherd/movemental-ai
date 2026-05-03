import { formationPracticeCompletions } from "@/lib/db/schema";
import {
  FormationPracticeCompletionsSelectSchema,
  FormationPracticeCompletionsInsertSchema,
  FormationPracticeCompletionsUpdateSchema,
  FormationPracticeCompletionsFiltersSchema,
  type FormationPracticeCompletions,
  type FormationPracticeCompletionsCreate,
  type FormationPracticeCompletionsUpdate,
  type FormationPracticeCompletionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FormationPracticeCompletionsService extends SimplifiedService<
  typeof formationPracticeCompletions,
  FormationPracticeCompletions,
  FormationPracticeCompletionsCreate,
  FormationPracticeCompletionsUpdate,
  FormationPracticeCompletionsFilters
> {
  constructor() {
    super(
      formationPracticeCompletions,
      FormationPracticeCompletionsSelectSchema,
      FormationPracticeCompletionsInsertSchema,
      FormationPracticeCompletionsUpdateSchema,
      FormationPracticeCompletionsFiltersSchema,
    );
  }
}

export const formationPracticeCompletionsService = new FormationPracticeCompletionsService();
