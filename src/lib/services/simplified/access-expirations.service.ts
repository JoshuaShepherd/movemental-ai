import { accessExpirations } from "@/lib/db/schema";
import {
  AccessExpirationsSelectSchema,
  AccessExpirationsInsertSchema,
  AccessExpirationsUpdateSchema,
  AccessExpirationsFiltersSchema,
  type AccessExpirations,
  type AccessExpirationsCreate,
  type AccessExpirationsUpdate,
  type AccessExpirationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AccessExpirationsService extends SimplifiedService<
  typeof accessExpirations,
  AccessExpirations,
  AccessExpirationsCreate,
  AccessExpirationsUpdate,
  AccessExpirationsFilters
> {
  constructor() {
    super(
      accessExpirations,
      AccessExpirationsSelectSchema,
      AccessExpirationsInsertSchema,
      AccessExpirationsUpdateSchema,
      AccessExpirationsFiltersSchema,
    );
  }
}

export const accessExpirationsService = new AccessExpirationsService();
