import { kairosMoments } from "@/lib/db/schema";
import {
  KairosMomentsSelectSchema,
  KairosMomentsInsertSchema,
  KairosMomentsUpdateSchema,
  KairosMomentsFiltersSchema,
  type KairosMoments,
  type KairosMomentsCreate,
  type KairosMomentsUpdate,
  type KairosMomentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class KairosMomentsService extends SimplifiedService<
  typeof kairosMoments,
  KairosMoments,
  KairosMomentsCreate,
  KairosMomentsUpdate,
  KairosMomentsFilters
> {
  constructor() {
    super(
      kairosMoments,
      KairosMomentsSelectSchema,
      KairosMomentsInsertSchema,
      KairosMomentsUpdateSchema,
      KairosMomentsFiltersSchema,
    );
  }
}

export const kairosMomentsService = new KairosMomentsService();
