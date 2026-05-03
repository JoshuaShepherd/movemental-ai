import { agentTraces } from "@/lib/db/schema";
import {
  AgentTracesSelectSchema,
  AgentTracesInsertSchema,
  AgentTracesUpdateSchema,
  AgentTracesFiltersSchema,
  type AgentTraces,
  type AgentTracesCreate,
  type AgentTracesUpdate,
  type AgentTracesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentTracesService extends SimplifiedService<
  typeof agentTraces,
  AgentTraces,
  AgentTracesCreate,
  AgentTracesUpdate,
  AgentTracesFilters
> {
  constructor() {
    super(
      agentTraces,
      AgentTracesSelectSchema,
      AgentTracesInsertSchema,
      AgentTracesUpdateSchema,
      AgentTracesFiltersSchema,
    );
  }
}

export const agentTracesService = new AgentTracesService();
