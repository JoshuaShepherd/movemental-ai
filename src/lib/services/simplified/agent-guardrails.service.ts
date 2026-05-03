import { agentGuardrails } from "@/lib/db/schema";
import {
  AgentGuardrailsSelectSchema,
  AgentGuardrailsInsertSchema,
  AgentGuardrailsUpdateSchema,
  AgentGuardrailsFiltersSchema,
  type AgentGuardrails,
  type AgentGuardrailsCreate,
  type AgentGuardrailsUpdate,
  type AgentGuardrailsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentGuardrailsService extends SimplifiedService<
  typeof agentGuardrails,
  AgentGuardrails,
  AgentGuardrailsCreate,
  AgentGuardrailsUpdate,
  AgentGuardrailsFilters
> {
  constructor() {
    super(
      agentGuardrails,
      AgentGuardrailsSelectSchema,
      AgentGuardrailsInsertSchema,
      AgentGuardrailsUpdateSchema,
      AgentGuardrailsFiltersSchema,
    );
  }
}

export const agentGuardrailsService = new AgentGuardrailsService();
