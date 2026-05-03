import { formationPracticeAssignments } from "@/lib/db/schema";
import {
  FormationPracticeAssignmentsSelectSchema,
  FormationPracticeAssignmentsInsertSchema,
  FormationPracticeAssignmentsUpdateSchema,
  FormationPracticeAssignmentsFiltersSchema,
  type FormationPracticeAssignments,
  type FormationPracticeAssignmentsCreate,
  type FormationPracticeAssignmentsUpdate,
  type FormationPracticeAssignmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FormationPracticeAssignmentsService extends SimplifiedService<
  typeof formationPracticeAssignments,
  FormationPracticeAssignments,
  FormationPracticeAssignmentsCreate,
  FormationPracticeAssignmentsUpdate,
  FormationPracticeAssignmentsFilters
> {
  constructor() {
    super(
      formationPracticeAssignments,
      FormationPracticeAssignmentsSelectSchema,
      FormationPracticeAssignmentsInsertSchema,
      FormationPracticeAssignmentsUpdateSchema,
      FormationPracticeAssignmentsFiltersSchema,
    );
  }
}

export const formationPracticeAssignmentsService = new FormationPracticeAssignmentsService();
