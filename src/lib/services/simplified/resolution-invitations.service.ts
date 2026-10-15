import { resolutionInvitations } from "@/lib/db/schema";
import {
  ResolutionInvitationsSelectSchema,
  ResolutionInvitationsInsertSchema,
  ResolutionInvitationsUpdateSchema,
  ResolutionInvitationsFiltersSchema,
  type ResolutionInvitations,
  type ResolutionInvitationsCreate,
  type ResolutionInvitationsUpdate,
  type ResolutionInvitationsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ResolutionInvitationsService extends SimplifiedService<
  typeof resolutionInvitations,
  ResolutionInvitations,
  ResolutionInvitationsCreate,
  ResolutionInvitationsUpdate,
  ResolutionInvitationsFilters
> {
  constructor() {
    super(
      resolutionInvitations,
      ResolutionInvitationsSelectSchema,
      ResolutionInvitationsInsertSchema,
      ResolutionInvitationsUpdateSchema,
      ResolutionInvitationsFiltersSchema,
    );
  }
}

export const resolutionInvitationsService = new ResolutionInvitationsService();
