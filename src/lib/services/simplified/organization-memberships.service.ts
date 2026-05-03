import { organizationMemberships } from "@/lib/db/schema";
import {
  OrganizationMembershipsSelectSchema,
  OrganizationMembershipsInsertSchema,
  OrganizationMembershipsUpdateSchema,
  OrganizationMembershipsFiltersSchema,
  type OrganizationMemberships,
  type OrganizationMembershipsCreate,
  type OrganizationMembershipsUpdate,
  type OrganizationMembershipsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OrganizationMembershipsService extends SimplifiedService<
  typeof organizationMemberships,
  OrganizationMemberships,
  OrganizationMembershipsCreate,
  OrganizationMembershipsUpdate,
  OrganizationMembershipsFilters
> {
  constructor() {
    super(
      organizationMemberships,
      OrganizationMembershipsSelectSchema,
      OrganizationMembershipsInsertSchema,
      OrganizationMembershipsUpdateSchema,
      OrganizationMembershipsFiltersSchema,
    );
  }
}

export const organizationMembershipsService = new OrganizationMembershipsService();
