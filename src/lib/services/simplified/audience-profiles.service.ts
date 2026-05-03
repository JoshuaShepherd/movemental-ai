import { audienceProfiles } from "@/lib/db/schema";
import {
  AudienceProfilesSelectSchema,
  AudienceProfilesInsertSchema,
  AudienceProfilesUpdateSchema,
  AudienceProfilesFiltersSchema,
  type AudienceProfiles,
  type AudienceProfilesCreate,
  type AudienceProfilesUpdate,
  type AudienceProfilesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AudienceProfilesService extends SimplifiedService<
  typeof audienceProfiles,
  AudienceProfiles,
  AudienceProfilesCreate,
  AudienceProfilesUpdate,
  AudienceProfilesFilters
> {
  constructor() {
    super(
      audienceProfiles,
      AudienceProfilesSelectSchema,
      AudienceProfilesInsertSchema,
      AudienceProfilesUpdateSchema,
      AudienceProfilesFiltersSchema,
    );
  }
}

export const audienceProfilesService = new AudienceProfilesService();
