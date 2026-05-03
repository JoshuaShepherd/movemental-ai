import { certificates } from "@/lib/db/schema";
import {
  CertificatesSelectSchema,
  CertificatesInsertSchema,
  CertificatesUpdateSchema,
  CertificatesFiltersSchema,
  type Certificates,
  type CertificatesCreate,
  type CertificatesUpdate,
  type CertificatesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CertificatesService extends SimplifiedService<
  typeof certificates,
  Certificates,
  CertificatesCreate,
  CertificatesUpdate,
  CertificatesFilters
> {
  constructor() {
    super(
      certificates,
      CertificatesSelectSchema,
      CertificatesInsertSchema,
      CertificatesUpdateSchema,
      CertificatesFiltersSchema,
    );
  }
}

export const certificatesService = new CertificatesService();
