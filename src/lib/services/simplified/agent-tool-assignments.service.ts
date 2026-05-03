import { agentToolAssignments } from "@/lib/db/schema";
import {
  AgentToolAssignmentsSelectSchema,
  AgentToolAssignmentsInsertSchema,
  AgentToolAssignmentsUpdateSchema,
  AgentToolAssignmentsFiltersSchema,
  type AgentToolAssignments,
  type AgentToolAssignmentsCreate,
  type AgentToolAssignmentsUpdate,
  type AgentToolAssignmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentToolAssignmentsService extends SimplifiedService<
  typeof agentToolAssignments,
  AgentToolAssignments,
  AgentToolAssignmentsCreate,
  AgentToolAssignmentsUpdate,
  AgentToolAssignmentsFilters
> {
  constructor() {
    super(
      agentToolAssignments,
      AgentToolAssignmentsSelectSchema,
      AgentToolAssignmentsInsertSchema,
      AgentToolAssignmentsUpdateSchema,
      AgentToolAssignmentsFiltersSchema,
    );
  }
}

export const agentToolAssignmentsService = new AgentToolAssignmentsService();
