import { fieldExperiments } from "@/lib/db/schema";
import {
  FieldExperimentsSelectSchema,
  FieldExperimentsInsertSchema,
  FieldExperimentsUpdateSchema,
  FieldExperimentsFiltersSchema,
  type FieldExperiments,
  type FieldExperimentsCreate,
  type FieldExperimentsUpdate,
  type FieldExperimentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class FieldExperimentsService extends SimplifiedService<
  typeof fieldExperiments,
  FieldExperiments,
  FieldExperimentsCreate,
  FieldExperimentsUpdate,
  FieldExperimentsFilters
> {
  constructor() {
    super(
      fieldExperiments,
      FieldExperimentsSelectSchema,
      FieldExperimentsInsertSchema,
      FieldExperimentsUpdateSchema,
      FieldExperimentsFiltersSchema,
    );
  }
}

export const fieldExperimentsService = new FieldExperimentsService();
