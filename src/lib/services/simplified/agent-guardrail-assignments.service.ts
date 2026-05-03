import { agentGuardrailAssignments } from "@/lib/db/schema";
import {
  AgentGuardrailAssignmentsSelectSchema,
  AgentGuardrailAssignmentsInsertSchema,
  AgentGuardrailAssignmentsUpdateSchema,
  AgentGuardrailAssignmentsFiltersSchema,
  type AgentGuardrailAssignments,
  type AgentGuardrailAssignmentsCreate,
  type AgentGuardrailAssignmentsUpdate,
  type AgentGuardrailAssignmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentGuardrailAssignmentsService extends SimplifiedService<
  typeof agentGuardrailAssignments,
  AgentGuardrailAssignments,
  AgentGuardrailAssignmentsCreate,
  AgentGuardrailAssignmentsUpdate,
  AgentGuardrailAssignmentsFilters
> {
  constructor() {
    super(
      agentGuardrailAssignments,
      AgentGuardrailAssignmentsSelectSchema,
      AgentGuardrailAssignmentsInsertSchema,
      AgentGuardrailAssignmentsUpdateSchema,
      AgentGuardrailAssignmentsFiltersSchema,
    );
  }
}

export const agentGuardrailAssignmentsService = new AgentGuardrailAssignmentsService();
