import { consentRecords } from "@/lib/db/schema";
import {
  ConsentRecordsSelectSchema,
  ConsentRecordsInsertSchema,
  ConsentRecordsUpdateSchema,
  ConsentRecordsFiltersSchema,
  type ConsentRecords,
  type ConsentRecordsCreate,
  type ConsentRecordsUpdate,
  type ConsentRecordsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ConsentRecordsService extends SimplifiedService<
  typeof consentRecords,
  ConsentRecords,
  ConsentRecordsCreate,
  ConsentRecordsUpdate,
  ConsentRecordsFilters
> {
  constructor() {
    super(
      consentRecords,
      ConsentRecordsSelectSchema,
      ConsentRecordsInsertSchema,
      ConsentRecordsUpdateSchema,
      ConsentRecordsFiltersSchema,
    );
  }
}

export const consentRecordsService = new ConsentRecordsService();
