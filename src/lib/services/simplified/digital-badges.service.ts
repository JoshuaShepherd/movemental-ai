import { digitalBadges } from "@/lib/db/schema";
import {
  DigitalBadgesSelectSchema,
  DigitalBadgesInsertSchema,
  DigitalBadgesUpdateSchema,
  DigitalBadgesFiltersSchema,
  type DigitalBadges,
  type DigitalBadgesCreate,
  type DigitalBadgesUpdate,
  type DigitalBadgesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class DigitalBadgesService extends SimplifiedService<
  typeof digitalBadges,
  DigitalBadges,
  DigitalBadgesCreate,
  DigitalBadgesUpdate,
  DigitalBadgesFilters
> {
  constructor() {
    super(
      digitalBadges,
      DigitalBadgesSelectSchema,
      DigitalBadgesInsertSchema,
      DigitalBadgesUpdateSchema,
      DigitalBadgesFiltersSchema,
    );
  }
}

export const digitalBadgesService = new DigitalBadgesService();
