import { citations } from "@/lib/db/schema";
import {
  CitationsSelectSchema,
  CitationsInsertSchema,
  CitationsUpdateSchema,
  CitationsFiltersSchema,
  type Citations,
  type CitationsCreate,
  type CitationsUpdate,
  type CitationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CitationsService extends SimplifiedService<
  typeof citations,
  Citations,
  CitationsCreate,
  CitationsUpdate,
  CitationsFilters
> {
  constructor() {
    super(
      citations,
      CitationsSelectSchema,
      CitationsInsertSchema,
      CitationsUpdateSchema,
      CitationsFiltersSchema,
    );
  }
}

export const citationsService = new CitationsService();
