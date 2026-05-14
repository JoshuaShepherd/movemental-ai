import { sandboxStaffReadinessSubmissions } from "@/lib/db/schema";
import {
  SandboxStaffReadinessSubmissionsSelectSchema,
  SandboxStaffReadinessSubmissionsInsertSchema,
  SandboxStaffReadinessSubmissionsUpdateSchema,
  SandboxStaffReadinessSubmissionsFiltersSchema,
  type SandboxStaffReadinessSubmissions,
  type SandboxStaffReadinessSubmissionsCreate,
  type SandboxStaffReadinessSubmissionsUpdate,
  type SandboxStaffReadinessSubmissionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SandboxStaffReadinessSubmissionsService extends SimplifiedService<
  typeof sandboxStaffReadinessSubmissions,
  SandboxStaffReadinessSubmissions,
  SandboxStaffReadinessSubmissionsCreate,
  SandboxStaffReadinessSubmissionsUpdate,
  SandboxStaffReadinessSubmissionsFilters
> {
  constructor() {
    super(
      sandboxStaffReadinessSubmissions,
      SandboxStaffReadinessSubmissionsSelectSchema,
      SandboxStaffReadinessSubmissionsInsertSchema,
      SandboxStaffReadinessSubmissionsUpdateSchema,
      SandboxStaffReadinessSubmissionsFiltersSchema,
    );
  }
}

export const sandboxStaffReadinessSubmissionsService = new SandboxStaffReadinessSubmissionsService();
