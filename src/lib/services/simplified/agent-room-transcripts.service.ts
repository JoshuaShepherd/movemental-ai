import { agentRoomTranscripts } from "@/lib/db/schema";
import {
  AgentRoomTranscriptsSelectSchema,
  AgentRoomTranscriptsInsertSchema,
  AgentRoomTranscriptsUpdateSchema,
  AgentRoomTranscriptsFiltersSchema,
  type AgentRoomTranscripts,
  type AgentRoomTranscriptsCreate,
  type AgentRoomTranscriptsUpdate,
  type AgentRoomTranscriptsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AgentRoomTranscriptsService extends SimplifiedService<
  typeof agentRoomTranscripts,
  AgentRoomTranscripts,
  AgentRoomTranscriptsCreate,
  AgentRoomTranscriptsUpdate,
  AgentRoomTranscriptsFilters
> {
  constructor() {
    super(
      agentRoomTranscripts,
      AgentRoomTranscriptsSelectSchema,
      AgentRoomTranscriptsInsertSchema,
      AgentRoomTranscriptsUpdateSchema,
      AgentRoomTranscriptsFiltersSchema,
    );
  }
}

export const agentRoomTranscriptsService = new AgentRoomTranscriptsService();
