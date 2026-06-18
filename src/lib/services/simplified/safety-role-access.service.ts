import { safetyRoleAccess } from "@/lib/db/schema";
import {
  SafetyRoleAccessSelectSchema,
  SafetyRoleAccessInsertSchema,
  SafetyRoleAccessUpdateSchema,
  SafetyRoleAccessFiltersSchema,
  type SafetyRoleAccess,
  type SafetyRoleAccessCreate,
  type SafetyRoleAccessUpdate,
  type SafetyRoleAccessFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyRoleAccessService extends SimplifiedService<
  typeof safetyRoleAccess,
  SafetyRoleAccess,
  SafetyRoleAccessCreate,
  SafetyRoleAccessUpdate,
  SafetyRoleAccessFilters
> {
  constructor() {
    super(
      safetyRoleAccess,
      SafetyRoleAccessSelectSchema,
      SafetyRoleAccessInsertSchema,
      SafetyRoleAccessUpdateSchema,
      SafetyRoleAccessFiltersSchema,
    );
  }
}

export const safetyRoleAccessService = new SafetyRoleAccessService();
