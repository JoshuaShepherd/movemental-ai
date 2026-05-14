import { sandboxStaffReadinessInvites } from "@/lib/db/schema";
import {
  SandboxStaffReadinessInvitesSelectSchema,
  SandboxStaffReadinessInvitesInsertSchema,
  SandboxStaffReadinessInvitesUpdateSchema,
  SandboxStaffReadinessInvitesFiltersSchema,
  type SandboxStaffReadinessInvites,
  type SandboxStaffReadinessInvitesCreate,
  type SandboxStaffReadinessInvitesUpdate,
  type SandboxStaffReadinessInvitesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SandboxStaffReadinessInvitesService extends SimplifiedService<
  typeof sandboxStaffReadinessInvites,
  SandboxStaffReadinessInvites,
  SandboxStaffReadinessInvitesCreate,
  SandboxStaffReadinessInvitesUpdate,
  SandboxStaffReadinessInvitesFilters
> {
  constructor() {
    super(
      sandboxStaffReadinessInvites,
      SandboxStaffReadinessInvitesSelectSchema,
      SandboxStaffReadinessInvitesInsertSchema,
      SandboxStaffReadinessInvitesUpdateSchema,
      SandboxStaffReadinessInvitesFiltersSchema,
    );
  }
}

export const sandboxStaffReadinessInvitesService = new SandboxStaffReadinessInvitesService();
