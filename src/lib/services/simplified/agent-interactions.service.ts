import { agentInteractions } from "@/lib/db/schema";
import {
  AgentInteractionsSelectSchema,
  AgentInteractionsInsertSchema,
  AgentInteractionsUpdateSchema,
  AgentInteractionsFiltersSchema,
  type AgentInteractions,
  type AgentInteractionsCreate,
  type AgentInteractionsUpdate,
  type AgentInteractionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentInteractionsService extends SimplifiedService<
  typeof agentInteractions,
  AgentInteractions,
  AgentInteractionsCreate,
  AgentInteractionsUpdate,
  AgentInteractionsFilters
> {
  constructor() {
    super(
      agentInteractions,
      AgentInteractionsSelectSchema,
      AgentInteractionsInsertSchema,
      AgentInteractionsUpdateSchema,
      AgentInteractionsFiltersSchema,
    );
  }
}

export const agentInteractionsService = new AgentInteractionsService();
