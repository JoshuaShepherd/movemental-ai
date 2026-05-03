import { organizations } from "@/lib/db/schema";
import {
  OrganizationsSelectSchema,
  OrganizationsInsertSchema,
  OrganizationsUpdateSchema,
  OrganizationsFiltersSchema,
  type Organizations,
  type OrganizationsCreate,
  type OrganizationsUpdate,
  type OrganizationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OrganizationsService extends SimplifiedService<
  typeof organizations,
  Organizations,
  OrganizationsCreate,
  OrganizationsUpdate,
  OrganizationsFilters
> {
  constructor() {
    super(
      organizations,
      OrganizationsSelectSchema,
      OrganizationsInsertSchema,
      OrganizationsUpdateSchema,
      OrganizationsFiltersSchema,
    );
  }
}

export const organizationsService = new OrganizationsService();
