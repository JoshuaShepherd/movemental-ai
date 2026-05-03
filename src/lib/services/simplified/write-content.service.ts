import { writeContent } from "@/lib/db/schema";
import {
  WriteContentSelectSchema,
  WriteContentInsertSchema,
  WriteContentUpdateSchema,
  WriteContentFiltersSchema,
  type WriteContent,
  type WriteContentCreate,
  type WriteContentUpdate,
  type WriteContentFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class WriteContentService extends SimplifiedService<
  typeof writeContent,
  WriteContent,
  WriteContentCreate,
  WriteContentUpdate,
  WriteContentFilters
> {
  constructor() {
    super(
      writeContent,
      WriteContentSelectSchema,
      WriteContentInsertSchema,
      WriteContentUpdateSchema,
      WriteContentFiltersSchema,
    );
  }
}

export const writeContentService = new WriteContentService();
