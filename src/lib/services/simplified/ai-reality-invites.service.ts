import { aiRealityInvites } from "@/lib/db/schema";
import {
  AiRealityInvitesSelectSchema,
  AiRealityInvitesInsertSchema,
  AiRealityInvitesUpdateSchema,
  AiRealityInvitesFiltersSchema,
  type AiRealityInvites,
  type AiRealityInvitesCreate,
  type AiRealityInvitesUpdate,
  type AiRealityInvitesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiRealityInvitesService extends SimplifiedService<
  typeof aiRealityInvites,
  AiRealityInvites,
  AiRealityInvitesCreate,
  AiRealityInvitesUpdate,
  AiRealityInvitesFilters
> {
  constructor() {
    super(
      aiRealityInvites,
      AiRealityInvitesSelectSchema,
      AiRealityInvitesInsertSchema,
      AiRealityInvitesUpdateSchema,
      AiRealityInvitesFiltersSchema,
    );
  }
}

export const aiRealityInvitesService = new AiRealityInvitesService();
