import { prospects } from "@/lib/db/schema";
import {
  ProspectsSelectSchema,
  ProspectsInsertSchema,
  ProspectsUpdateSchema,
  ProspectsFiltersSchema,
  type Prospects,
  type ProspectsCreate,
  type ProspectsUpdate,
  type ProspectsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ProspectsService extends SimplifiedService<
  typeof prospects,
  Prospects,
  ProspectsCreate,
  ProspectsUpdate,
  ProspectsFilters
> {
  constructor() {
    super(
      prospects,
      ProspectsSelectSchema,
      ProspectsInsertSchema,
      ProspectsUpdateSchema,
      ProspectsFiltersSchema,
    );
  }
}

export const prospectsService = new ProspectsService();
