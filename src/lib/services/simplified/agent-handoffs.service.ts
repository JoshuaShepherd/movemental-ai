import { agentHandoffs } from "@/lib/db/schema";
import {
  AgentHandoffsSelectSchema,
  AgentHandoffsInsertSchema,
  AgentHandoffsUpdateSchema,
  AgentHandoffsFiltersSchema,
  type AgentHandoffs,
  type AgentHandoffsCreate,
  type AgentHandoffsUpdate,
  type AgentHandoffsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentHandoffsService extends SimplifiedService<
  typeof agentHandoffs,
  AgentHandoffs,
  AgentHandoffsCreate,
  AgentHandoffsUpdate,
  AgentHandoffsFilters
> {
  constructor() {
    super(
      agentHandoffs,
      AgentHandoffsSelectSchema,
      AgentHandoffsInsertSchema,
      AgentHandoffsUpdateSchema,
      AgentHandoffsFiltersSchema,
    );
  }
}

export const agentHandoffsService = new AgentHandoffsService();
