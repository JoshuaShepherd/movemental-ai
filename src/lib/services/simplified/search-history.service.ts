import { searchHistory } from "@/lib/db/schema";
import {
  SearchHistorySelectSchema,
  SearchHistoryInsertSchema,
  SearchHistoryUpdateSchema,
  SearchHistoryFiltersSchema,
  type SearchHistory,
  type SearchHistoryCreate,
  type SearchHistoryUpdate,
  type SearchHistoryFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SearchHistoryService extends SimplifiedService<
  typeof searchHistory,
  SearchHistory,
  SearchHistoryCreate,
  SearchHistoryUpdate,
  SearchHistoryFilters
> {
  constructor() {
    super(
      searchHistory,
      SearchHistorySelectSchema,
      SearchHistoryInsertSchema,
      SearchHistoryUpdateSchema,
      SearchHistoryFiltersSchema,
    );
  }
}

export const searchHistoryService = new SearchHistoryService();
