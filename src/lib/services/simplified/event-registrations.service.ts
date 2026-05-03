import { eventRegistrations } from "@/lib/db/schema";
import {
  EventRegistrationsSelectSchema,
  EventRegistrationsInsertSchema,
  EventRegistrationsUpdateSchema,
  EventRegistrationsFiltersSchema,
  type EventRegistrations,
  type EventRegistrationsCreate,
  type EventRegistrationsUpdate,
  type EventRegistrationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class EventRegistrationsService extends SimplifiedService<
  typeof eventRegistrations,
  EventRegistrations,
  EventRegistrationsCreate,
  EventRegistrationsUpdate,
  EventRegistrationsFilters
> {
  constructor() {
    super(
      eventRegistrations,
      EventRegistrationsSelectSchema,
      EventRegistrationsInsertSchema,
      EventRegistrationsUpdateSchema,
      EventRegistrationsFiltersSchema,
    );
  }
}

export const eventRegistrationsService = new EventRegistrationsService();
