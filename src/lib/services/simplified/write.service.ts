import { write } from "@/lib/db/schema";
import {
  WriteSelectSchema,
  WriteInsertSchema,
  WriteUpdateSchema,
  WriteFiltersSchema,
  type Write,
  type WriteCreate,
  type WriteUpdate,
  type WriteFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WriteService extends SimplifiedService<
  typeof write,
  Write,
  WriteCreate,
  WriteUpdate,
  WriteFilters
> {
  constructor() {
    super(
      write,
      WriteSelectSchema,
      WriteInsertSchema,
      WriteUpdateSchema,
      WriteFiltersSchema,
    );
  }
}

export const writeService = new WriteService();
