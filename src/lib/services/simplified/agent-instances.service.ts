import { agentInstances } from "@/lib/db/schema";
import {
  AgentInstancesSelectSchema,
  AgentInstancesInsertSchema,
  AgentInstancesUpdateSchema,
  AgentInstancesFiltersSchema,
  type AgentInstances,
  type AgentInstancesCreate,
  type AgentInstancesUpdate,
  type AgentInstancesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentInstancesService extends SimplifiedService<
  typeof agentInstances,
  AgentInstances,
  AgentInstancesCreate,
  AgentInstancesUpdate,
  AgentInstancesFilters
> {
  constructor() {
    super(
      agentInstances,
      AgentInstancesSelectSchema,
      AgentInstancesInsertSchema,
      AgentInstancesUpdateSchema,
      AgentInstancesFiltersSchema,
    );
  }
}

export const agentInstancesService = new AgentInstancesService();
