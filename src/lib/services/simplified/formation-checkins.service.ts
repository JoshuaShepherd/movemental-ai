import { formationCheckins } from "@/lib/db/schema";
import {
  FormationCheckinsSelectSchema,
  FormationCheckinsInsertSchema,
  FormationCheckinsUpdateSchema,
  FormationCheckinsFiltersSchema,
  type FormationCheckins,
  type FormationCheckinsCreate,
  type FormationCheckinsUpdate,
  type FormationCheckinsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FormationCheckinsService extends SimplifiedService<
  typeof formationCheckins,
  FormationCheckins,
  FormationCheckinsCreate,
  FormationCheckinsUpdate,
  FormationCheckinsFilters
> {
  constructor() {
    super(
      formationCheckins,
      FormationCheckinsSelectSchema,
      FormationCheckinsInsertSchema,
      FormationCheckinsUpdateSchema,
      FormationCheckinsFiltersSchema,
    );
  }
}

export const formationCheckinsService = new FormationCheckinsService();
