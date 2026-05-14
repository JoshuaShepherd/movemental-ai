import { sandboxStaffReadinessAnonymousSubmissions } from "@/lib/db/schema";
import {
  SandboxStaffReadinessAnonymousSubmissionsSelectSchema,
  SandboxStaffReadinessAnonymousSubmissionsInsertSchema,
  SandboxStaffReadinessAnonymousSubmissionsUpdateSchema,
  SandboxStaffReadinessAnonymousSubmissionsFiltersSchema,
  type SandboxStaffReadinessAnonymousSubmissions,
  type SandboxStaffReadinessAnonymousSubmissionsCreate,
  type SandboxStaffReadinessAnonymousSubmissionsUpdate,
  type SandboxStaffReadinessAnonymousSubmissionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SandboxStaffReadinessAnonymousSubmissionsService extends SimplifiedService<
  typeof sandboxStaffReadinessAnonymousSubmissions,
  SandboxStaffReadinessAnonymousSubmissions,
  SandboxStaffReadinessAnonymousSubmissionsCreate,
  SandboxStaffReadinessAnonymousSubmissionsUpdate,
  SandboxStaffReadinessAnonymousSubmissionsFilters
> {
  constructor() {
    super(
      sandboxStaffReadinessAnonymousSubmissions,
      SandboxStaffReadinessAnonymousSubmissionsSelectSchema,
      SandboxStaffReadinessAnonymousSubmissionsInsertSchema,
      SandboxStaffReadinessAnonymousSubmissionsUpdateSchema,
      SandboxStaffReadinessAnonymousSubmissionsFiltersSchema,
    );
  }
}

export const sandboxStaffReadinessAnonymousSubmissionsService = new SandboxStaffReadinessAnonymousSubmissionsService();
