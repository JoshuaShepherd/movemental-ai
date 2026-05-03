import { coachingHuddles } from "@/lib/db/schema";
import {
  CoachingHuddlesSelectSchema,
  CoachingHuddlesInsertSchema,
  CoachingHuddlesUpdateSchema,
  CoachingHuddlesFiltersSchema,
  type CoachingHuddles,
  type CoachingHuddlesCreate,
  type CoachingHuddlesUpdate,
  type CoachingHuddlesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CoachingHuddlesService extends SimplifiedService<
  typeof coachingHuddles,
  CoachingHuddles,
  CoachingHuddlesCreate,
  CoachingHuddlesUpdate,
  CoachingHuddlesFilters
> {
  constructor() {
    super(
      coachingHuddles,
      CoachingHuddlesSelectSchema,
      CoachingHuddlesInsertSchema,
      CoachingHuddlesUpdateSchema,
      CoachingHuddlesFiltersSchema,
    );
  }
}

export const coachingHuddlesService = new CoachingHuddlesService();
