import { organizationInquiries } from "@/lib/db/schema";
import {
  OrganizationInquiriesSelectSchema,
  OrganizationInquiriesInsertSchema,
  OrganizationInquiriesUpdateSchema,
  OrganizationInquiriesFiltersSchema,
  type OrganizationInquiries,
  type OrganizationInquiriesCreate,
  type OrganizationInquiriesUpdate,
  type OrganizationInquiriesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OrganizationInquiriesService extends SimplifiedService<
  typeof organizationInquiries,
  OrganizationInquiries,
  OrganizationInquiriesCreate,
  OrganizationInquiriesUpdate,
  OrganizationInquiriesFilters
> {
  constructor() {
    super(
      organizationInquiries,
      OrganizationInquiriesSelectSchema,
      OrganizationInquiriesInsertSchema,
      OrganizationInquiriesUpdateSchema,
      OrganizationInquiriesFiltersSchema,
    );
  }
}

export const organizationInquiriesService = new OrganizationInquiriesService();
