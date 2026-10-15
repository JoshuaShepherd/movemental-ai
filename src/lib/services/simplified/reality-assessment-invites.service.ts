import { realityAssessmentInvites } from "@/lib/db/schema";
import {
  RealityAssessmentInvitesSelectSchema,
  RealityAssessmentInvitesInsertSchema,
  RealityAssessmentInvitesUpdateSchema,
  RealityAssessmentInvitesFiltersSchema,
  type RealityAssessmentInvites,
  type RealityAssessmentInvitesCreate,
  type RealityAssessmentInvitesUpdate,
  type RealityAssessmentInvitesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class RealityAssessmentInvitesService extends SimplifiedService<
  typeof realityAssessmentInvites,
  RealityAssessmentInvites,
  RealityAssessmentInvitesCreate,
  RealityAssessmentInvitesUpdate,
  RealityAssessmentInvitesFilters
> {
  constructor() {
    super(
      realityAssessmentInvites,
      RealityAssessmentInvitesSelectSchema,
      RealityAssessmentInvitesInsertSchema,
      RealityAssessmentInvitesUpdateSchema,
      RealityAssessmentInvitesFiltersSchema,
    );
  }
}

export const realityAssessmentInvitesService = new RealityAssessmentInvitesService();
