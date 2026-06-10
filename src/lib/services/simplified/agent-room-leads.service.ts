import { agentRoomLeads } from "@/lib/db/schema";
import {
  AgentRoomLeadsSelectSchema,
  AgentRoomLeadsInsertSchema,
  AgentRoomLeadsUpdateSchema,
  AgentRoomLeadsFiltersSchema,
  type AgentRoomLeads,
  type AgentRoomLeadsCreate,
  type AgentRoomLeadsUpdate,
  type AgentRoomLeadsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentRoomLeadsService extends SimplifiedService<
  typeof agentRoomLeads,
  AgentRoomLeads,
  AgentRoomLeadsCreate,
  AgentRoomLeadsUpdate,
  AgentRoomLeadsFilters
> {
  constructor() {
    super(
      agentRoomLeads,
      AgentRoomLeadsSelectSchema,
      AgentRoomLeadsInsertSchema,
      AgentRoomLeadsUpdateSchema,
      AgentRoomLeadsFiltersSchema,
    );
  }
}

export const agentRoomLeadsService = new AgentRoomLeadsService();
