import { aiLabTestTickets } from "@/lib/db/schema";
import {
  AiLabTestTicketsSelectSchema,
  AiLabTestTicketsInsertSchema,
  AiLabTestTicketsUpdateSchema,
  AiLabTestTicketsFiltersSchema,
  type AiLabTestTickets,
  type AiLabTestTicketsCreate,
  type AiLabTestTicketsUpdate,
  type AiLabTestTicketsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AiLabTestTicketsService extends SimplifiedService<
  typeof aiLabTestTickets,
  AiLabTestTickets,
  AiLabTestTicketsCreate,
  AiLabTestTicketsUpdate,
  AiLabTestTicketsFilters
> {
  constructor() {
    super(
      aiLabTestTickets,
      AiLabTestTicketsSelectSchema,
      AiLabTestTicketsInsertSchema,
      AiLabTestTicketsUpdateSchema,
      AiLabTestTicketsFiltersSchema,
    );
  }
}

export const aiLabTestTicketsService = new AiLabTestTicketsService();
