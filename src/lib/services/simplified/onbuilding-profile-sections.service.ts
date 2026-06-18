import { onbuildingProfileSections } from "@/lib/db/schema";
import {
  OnbuildingProfileSectionsSelectSchema,
  OnbuildingProfileSectionsInsertSchema,
  OnbuildingProfileSectionsUpdateSchema,
  OnbuildingProfileSectionsFiltersSchema,
  type OnbuildingProfileSections,
  type OnbuildingProfileSectionsCreate,
  type OnbuildingProfileSectionsUpdate,
  type OnbuildingProfileSectionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OnbuildingProfileSectionsService extends SimplifiedService<
  typeof onbuildingProfileSections,
  OnbuildingProfileSections,
  OnbuildingProfileSectionsCreate,
  OnbuildingProfileSectionsUpdate,
  OnbuildingProfileSectionsFilters
> {
  constructor() {
    super(
      onbuildingProfileSections,
      OnbuildingProfileSectionsSelectSchema,
      OnbuildingProfileSectionsInsertSchema,
      OnbuildingProfileSectionsUpdateSchema,
      OnbuildingProfileSectionsFiltersSchema,
    );
  }
}

export const onbuildingProfileSectionsService = new OnbuildingProfileSectionsService();
