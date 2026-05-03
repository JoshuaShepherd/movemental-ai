import { emailTemplates } from "@/lib/db/schema";
import {
  EmailTemplatesSelectSchema,
  EmailTemplatesInsertSchema,
  EmailTemplatesUpdateSchema,
  EmailTemplatesFiltersSchema,
  type EmailTemplates,
  type EmailTemplatesCreate,
  type EmailTemplatesUpdate,
  type EmailTemplatesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class EmailTemplatesService extends SimplifiedService<
  typeof emailTemplates,
  EmailTemplates,
  EmailTemplatesCreate,
  EmailTemplatesUpdate,
  EmailTemplatesFilters
> {
  constructor() {
    super(
      emailTemplates,
      EmailTemplatesSelectSchema,
      EmailTemplatesInsertSchema,
      EmailTemplatesUpdateSchema,
      EmailTemplatesFiltersSchema,
    );
  }
}

export const emailTemplatesService = new EmailTemplatesService();
