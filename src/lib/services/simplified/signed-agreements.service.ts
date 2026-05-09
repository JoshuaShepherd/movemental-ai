import { signedAgreements } from "@/lib/db/schema";
import {
  SignedAgreementsSelectSchema,
  SignedAgreementsInsertSchema,
  SignedAgreementsUpdateSchema,
  SignedAgreementsFiltersSchema,
  type SignedAgreements,
  type SignedAgreementsCreate,
  type SignedAgreementsUpdate,
  type SignedAgreementsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SignedAgreementsService extends SimplifiedService<
  typeof signedAgreements,
  SignedAgreements,
  SignedAgreementsCreate,
  SignedAgreementsUpdate,
  SignedAgreementsFilters
> {
  constructor() {
    super(
      signedAgreements,
      SignedAgreementsSelectSchema,
      SignedAgreementsInsertSchema,
      SignedAgreementsUpdateSchema,
      SignedAgreementsFiltersSchema,
    );
  }
}

export const signedAgreementsService = new SignedAgreementsService();
