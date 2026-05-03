import { agentMetrics } from "@/lib/db/schema";
import {
  AgentMetricsSelectSchema,
  AgentMetricsInsertSchema,
  AgentMetricsUpdateSchema,
  AgentMetricsFiltersSchema,
  type AgentMetrics,
  type AgentMetricsCreate,
  type AgentMetricsUpdate,
  type AgentMetricsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentMetricsService extends SimplifiedService<
  typeof agentMetrics,
  AgentMetrics,
  AgentMetricsCreate,
  AgentMetricsUpdate,
  AgentMetricsFilters
> {
  constructor() {
    super(
      agentMetrics,
      AgentMetricsSelectSchema,
      AgentMetricsInsertSchema,
      AgentMetricsUpdateSchema,
      AgentMetricsFiltersSchema,
    );
  }
}

export const agentMetricsService = new AgentMetricsService();
