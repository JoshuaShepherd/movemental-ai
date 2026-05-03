import { contactSubmissions } from "@/lib/db/schema";
import {
  ContactSubmissionsSelectSchema,
  ContactSubmissionsInsertSchema,
  ContactSubmissionsUpdateSchema,
  ContactSubmissionsFiltersSchema,
  type ContactSubmissions,
  type ContactSubmissionsCreate,
  type ContactSubmissionsUpdate,
  type ContactSubmissionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ContactSubmissionsService extends SimplifiedService<
  typeof contactSubmissions,
  ContactSubmissions,
  ContactSubmissionsCreate,
  ContactSubmissionsUpdate,
  ContactSubmissionsFilters
> {
  constructor() {
    super(
      contactSubmissions,
      ContactSubmissionsSelectSchema,
      ContactSubmissionsInsertSchema,
      ContactSubmissionsUpdateSchema,
      ContactSubmissionsFiltersSchema,
    );
  }
}

export const contactSubmissionsService = new ContactSubmissionsService();
