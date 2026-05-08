import { integrityDiagnosticSubmissions } from "@/lib/db/schema";
import {
  IntegrityDiagnosticSubmissionsSelectSchema,
  IntegrityDiagnosticSubmissionsInsertSchema,
  IntegrityDiagnosticSubmissionsUpdateSchema,
  IntegrityDiagnosticSubmissionsFiltersSchema,
  type IntegrityDiagnosticSubmissions,
  type IntegrityDiagnosticSubmissionsCreate,
  type IntegrityDiagnosticSubmissionsUpdate,
  type IntegrityDiagnosticSubmissionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class IntegrityDiagnosticSubmissionsService extends SimplifiedService<
  typeof integrityDiagnosticSubmissions,
  IntegrityDiagnosticSubmissions,
  IntegrityDiagnosticSubmissionsCreate,
  IntegrityDiagnosticSubmissionsUpdate,
  IntegrityDiagnosticSubmissionsFilters
> {
  constructor() {
    super(
      integrityDiagnosticSubmissions,
      IntegrityDiagnosticSubmissionsSelectSchema,
      IntegrityDiagnosticSubmissionsInsertSchema,
      IntegrityDiagnosticSubmissionsUpdateSchema,
      IntegrityDiagnosticSubmissionsFiltersSchema,
    );
  }
}

export const integrityDiagnosticSubmissionsService = new IntegrityDiagnosticSubmissionsService();
