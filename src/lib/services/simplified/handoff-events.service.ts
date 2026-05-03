import { handoffEvents } from "@/lib/db/schema";
import {
  HandoffEventsSelectSchema,
  HandoffEventsInsertSchema,
  HandoffEventsUpdateSchema,
  HandoffEventsFiltersSchema,
  type HandoffEvents,
  type HandoffEventsCreate,
  type HandoffEventsUpdate,
  type HandoffEventsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class HandoffEventsService extends SimplifiedService<
  typeof handoffEvents,
  HandoffEvents,
  HandoffEventsCreate,
  HandoffEventsUpdate,
  HandoffEventsFilters
> {
  constructor() {
    super(
      handoffEvents,
      HandoffEventsSelectSchema,
      HandoffEventsInsertSchema,
      HandoffEventsUpdateSchema,
      HandoffEventsFiltersSchema,
    );
  }
}

export const handoffEventsService = new HandoffEventsService();
