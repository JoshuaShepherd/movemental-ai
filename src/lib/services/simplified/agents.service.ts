import { agents } from "@/lib/db/schema";
import {
  AgentsSelectSchema,
  AgentsInsertSchema,
  AgentsUpdateSchema,
  AgentsFiltersSchema,
  type Agents,
  type AgentsCreate,
  type AgentsUpdate,
  type AgentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentsService extends SimplifiedService<
  typeof agents,
  Agents,
  AgentsCreate,
  AgentsUpdate,
  AgentsFilters
> {
  constructor() {
    super(
      agents,
      AgentsSelectSchema,
      AgentsInsertSchema,
      AgentsUpdateSchema,
      AgentsFiltersSchema,
    );
  }
}

export const agentsService = new AgentsService();
