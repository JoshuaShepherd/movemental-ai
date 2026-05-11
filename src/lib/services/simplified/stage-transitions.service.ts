import { stageTransitions } from "@/lib/db/schema";
import {
  StageTransitionsSelectSchema,
  StageTransitionsInsertSchema,
  StageTransitionsUpdateSchema,
  StageTransitionsFiltersSchema,
  type StageTransitions,
  type StageTransitionsCreate,
  type StageTransitionsUpdate,
  type StageTransitionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class StageTransitionsService extends SimplifiedService<
  typeof stageTransitions,
  StageTransitions,
  StageTransitionsCreate,
  StageTransitionsUpdate,
  StageTransitionsFilters
> {
  constructor() {
    super(
      stageTransitions,
      StageTransitionsSelectSchema,
      StageTransitionsInsertSchema,
      StageTransitionsUpdateSchema,
      StageTransitionsFiltersSchema,
    );
  }
}

export const stageTransitionsService = new StageTransitionsService();
