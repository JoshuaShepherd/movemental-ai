import { resolutionStatements } from "@/lib/db/schema";
import {
  ResolutionStatementsSelectSchema,
  ResolutionStatementsInsertSchema,
  ResolutionStatementsUpdateSchema,
  ResolutionStatementsFiltersSchema,
  type ResolutionStatements,
  type ResolutionStatementsCreate,
  type ResolutionStatementsUpdate,
  type ResolutionStatementsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ResolutionStatementsService extends SimplifiedService<
  typeof resolutionStatements,
  ResolutionStatements,
  ResolutionStatementsCreate,
  ResolutionStatementsUpdate,
  ResolutionStatementsFilters
> {
  constructor() {
    super(
      resolutionStatements,
      ResolutionStatementsSelectSchema,
      ResolutionStatementsInsertSchema,
      ResolutionStatementsUpdateSchema,
      ResolutionStatementsFiltersSchema,
    );
  }
}

export const resolutionStatementsService = new ResolutionStatementsService();
