import { aiLabTestFlags } from "@/lib/db/schema";
import {
  AiLabTestFlagsSelectSchema,
  AiLabTestFlagsInsertSchema,
  AiLabTestFlagsUpdateSchema,
  AiLabTestFlagsFiltersSchema,
  type AiLabTestFlags,
  type AiLabTestFlagsCreate,
  type AiLabTestFlagsUpdate,
  type AiLabTestFlagsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiLabTestFlagsService extends SimplifiedService<
  typeof aiLabTestFlags,
  AiLabTestFlags,
  AiLabTestFlagsCreate,
  AiLabTestFlagsUpdate,
  AiLabTestFlagsFilters
> {
  constructor() {
    super(
      aiLabTestFlags,
      AiLabTestFlagsSelectSchema,
      AiLabTestFlagsInsertSchema,
      AiLabTestFlagsUpdateSchema,
      AiLabTestFlagsFiltersSchema,
    );
  }
}

export const aiLabTestFlagsService = new AiLabTestFlagsService();
