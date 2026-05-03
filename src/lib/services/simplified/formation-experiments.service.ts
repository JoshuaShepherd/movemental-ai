import { formationExperiments } from "@/lib/db/schema";
import {
  FormationExperimentsSelectSchema,
  FormationExperimentsInsertSchema,
  FormationExperimentsUpdateSchema,
  FormationExperimentsFiltersSchema,
  type FormationExperiments,
  type FormationExperimentsCreate,
  type FormationExperimentsUpdate,
  type FormationExperimentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FormationExperimentsService extends SimplifiedService<
  typeof formationExperiments,
  FormationExperiments,
  FormationExperimentsCreate,
  FormationExperimentsUpdate,
  FormationExperimentsFilters
> {
  constructor() {
    super(
      formationExperiments,
      FormationExperimentsSelectSchema,
      FormationExperimentsInsertSchema,
      FormationExperimentsUpdateSchema,
      FormationExperimentsFiltersSchema,
    );
  }
}

export const formationExperimentsService = new FormationExperimentsService();
