import { auditLogs } from "@/lib/db/schema";
import {
  AuditLogsSelectSchema,
  AuditLogsInsertSchema,
  AuditLogsUpdateSchema,
  AuditLogsFiltersSchema,
  type AuditLogs,
  type AuditLogsCreate,
  type AuditLogsUpdate,
  type AuditLogsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AuditLogsService extends SimplifiedService<
  typeof auditLogs,
  AuditLogs,
  AuditLogsCreate,
  AuditLogsUpdate,
  AuditLogsFilters
> {
  constructor() {
    super(
      auditLogs,
      AuditLogsSelectSchema,
      AuditLogsInsertSchema,
      AuditLogsUpdateSchema,
      AuditLogsFiltersSchema,
    );
  }
}

export const auditLogsService = new AuditLogsService();
