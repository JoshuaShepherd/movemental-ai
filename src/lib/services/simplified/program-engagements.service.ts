import { programEngagements } from "@/lib/db/schema";
import {
  ProgramEngagementsSelectSchema,
  ProgramEngagementsInsertSchema,
  ProgramEngagementsUpdateSchema,
  ProgramEngagementsFiltersSchema,
  type ProgramEngagements,
  type ProgramEngagementsCreate,
  type ProgramEngagementsUpdate,
  type ProgramEngagementsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ProgramEngagementsService extends SimplifiedService<
  typeof programEngagements,
  ProgramEngagements,
  ProgramEngagementsCreate,
  ProgramEngagementsUpdate,
  ProgramEngagementsFilters
> {
  constructor() {
    super(
      programEngagements,
      ProgramEngagementsSelectSchema,
      ProgramEngagementsInsertSchema,
      ProgramEngagementsUpdateSchema,
      ProgramEngagementsFiltersSchema,
    );
  }
}

export const programEngagementsService = new ProgramEngagementsService();
