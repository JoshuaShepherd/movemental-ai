import { organizationAssets } from "@/lib/db/schema";
import {
  OrganizationAssetsSelectSchema,
  OrganizationAssetsInsertSchema,
  OrganizationAssetsUpdateSchema,
  OrganizationAssetsFiltersSchema,
  type OrganizationAssets,
  type OrganizationAssetsCreate,
  type OrganizationAssetsUpdate,
  type OrganizationAssetsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OrganizationAssetsService extends SimplifiedService<
  typeof organizationAssets,
  OrganizationAssets,
  OrganizationAssetsCreate,
  OrganizationAssetsUpdate,
  OrganizationAssetsFilters
> {
  constructor() {
    super(
      organizationAssets,
      OrganizationAssetsSelectSchema,
      OrganizationAssetsInsertSchema,
      OrganizationAssetsUpdateSchema,
      OrganizationAssetsFiltersSchema,
    );
  }
}

export const organizationAssetsService = new OrganizationAssetsService();
