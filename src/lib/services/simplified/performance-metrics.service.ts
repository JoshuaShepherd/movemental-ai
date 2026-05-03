import { performanceMetrics } from "@/lib/db/schema";
import {
  PerformanceMetricsSelectSchema,
  PerformanceMetricsInsertSchema,
  PerformanceMetricsUpdateSchema,
  PerformanceMetricsFiltersSchema,
  type PerformanceMetrics,
  type PerformanceMetricsCreate,
  type PerformanceMetricsUpdate,
  type PerformanceMetricsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class PerformanceMetricsService extends SimplifiedService<
  typeof performanceMetrics,
  PerformanceMetrics,
  PerformanceMetricsCreate,
  PerformanceMetricsUpdate,
  PerformanceMetricsFilters
> {
  constructor() {
    super(
      performanceMetrics,
      PerformanceMetricsSelectSchema,
      PerformanceMetricsInsertSchema,
      PerformanceMetricsUpdateSchema,
      PerformanceMetricsFiltersSchema,
    );
  }
}

export const performanceMetricsService = new PerformanceMetricsService();
