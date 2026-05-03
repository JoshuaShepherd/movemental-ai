import { certificateTemplates } from "@/lib/db/schema";
import {
  CertificateTemplatesSelectSchema,
  CertificateTemplatesInsertSchema,
  CertificateTemplatesUpdateSchema,
  CertificateTemplatesFiltersSchema,
  type CertificateTemplates,
  type CertificateTemplatesCreate,
  type CertificateTemplatesUpdate,
  type CertificateTemplatesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CertificateTemplatesService extends SimplifiedService<
  typeof certificateTemplates,
  CertificateTemplates,
  CertificateTemplatesCreate,
  CertificateTemplatesUpdate,
  CertificateTemplatesFilters
> {
  constructor() {
    super(
      certificateTemplates,
      CertificateTemplatesSelectSchema,
      CertificateTemplatesInsertSchema,
      CertificateTemplatesUpdateSchema,
      CertificateTemplatesFiltersSchema,
    );
  }
}

export const certificateTemplatesService = new CertificateTemplatesService();
