import { sermonPreparations } from "@/lib/db/schema";
import {
  SermonPreparationsSelectSchema,
  SermonPreparationsInsertSchema,
  SermonPreparationsUpdateSchema,
  SermonPreparationsFiltersSchema,
  type SermonPreparations,
  type SermonPreparationsCreate,
  type SermonPreparationsUpdate,
  type SermonPreparationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SermonPreparationsService extends SimplifiedService<
  typeof sermonPreparations,
  SermonPreparations,
  SermonPreparationsCreate,
  SermonPreparationsUpdate,
  SermonPreparationsFilters
> {
  constructor() {
    super(
      sermonPreparations,
      SermonPreparationsSelectSchema,
      SermonPreparationsInsertSchema,
      SermonPreparationsUpdateSchema,
      SermonPreparationsFiltersSchema,
    );
  }
}

export const sermonPreparationsService = new SermonPreparationsService();
