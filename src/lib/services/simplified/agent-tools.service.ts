import { agentTools } from "@/lib/db/schema";
import {
  AgentToolsSelectSchema,
  AgentToolsInsertSchema,
  AgentToolsUpdateSchema,
  AgentToolsFiltersSchema,
  type AgentTools,
  type AgentToolsCreate,
  type AgentToolsUpdate,
  type AgentToolsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentToolsService extends SimplifiedService<
  typeof agentTools,
  AgentTools,
  AgentToolsCreate,
  AgentToolsUpdate,
  AgentToolsFilters
> {
  constructor() {
    super(
      agentTools,
      AgentToolsSelectSchema,
      AgentToolsInsertSchema,
      AgentToolsUpdateSchema,
      AgentToolsFiltersSchema,
    );
  }
}

export const agentToolsService = new AgentToolsService();
