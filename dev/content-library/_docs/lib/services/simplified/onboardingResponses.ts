import { and, eq } from 'drizzle-orm';
import { SimplifiedService } from '../simplified-base';
import {
  OnboardingResponsesSelectSchema,
  OnboardingResponsesInsertSchema,
  OnboardingResponsesUpdateSchema,
  OnboardingResponsesFiltersSchema,
  type OnboardingResponses,
  type OnboardingResponsesCreate,
  type OnboardingResponsesUpdate,
  type OnboardingResponsesFilters,
} from '../../schemas';
import { onboardingResponses } from '@/db/schema';
import type { Result } from '../types';
import { getOrganizationId } from '../../middleware/tenant';
import { NextRequest } from 'next/server';

/**
 * Service for onboarding responses with tenant scoping
 * CRITICAL: All methods filter by organizationId for tenant isolation
 */
export class OnboardingResponsesService extends SimplifiedService<
  typeof onboardingResponses,
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
  OnboardingResponsesFilters
> {
  protected table = onboardingResponses;
  protected selectSchema = OnboardingResponsesSelectSchema;
  protected insertSchema = OnboardingResponsesInsertSchema;
  protected updateSchema = OnboardingResponsesUpdateSchema;
  protected filtersSchema = OnboardingResponsesFiltersSchema;

  /**
   * Get onboarding response for a specific organization (tenant)
   * CRITICAL: Only returns data for the specified organizationId
   */
  async getOnboardingResponse(
    request: NextRequest
  ): Promise<Result<OnboardingResponses | null>> {
    try {
      const organizationId = await getOrganizationId(request);
      if (!organizationId) {
        return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
      }

      const [response] = await this.db
        .select()
        .from(this.table)
        .where(eq(this.table.organizationId, organizationId))
        .limit(1);

      if (!response) {
        return this.ok(null);
      }

      const validated = this.validateOutput(this.selectSchema, response);
      return this.ok(validated);
    } catch (error) {
      return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
    }
  }

  /**
   * Create onboarding response for a specific organization (tenant)
   * CRITICAL: organizationId must come from tenant context (middleware)
   */
  async createOnboardingResponse(
    request: NextRequest,
    data: OnboardingResponsesCreate
  ): Promise<Result<OnboardingResponses>> {
    try {
      const organizationId = await getOrganizationId(request);
      if (!organizationId) {
        return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
      }

      // Remove organizationId from data if present (security - never trust client input)
      const { organizationId: _, ...dataWithoutOrgId } = data as any;

      const validated = this.validateInput(this.insertSchema, dataWithoutOrgId);

      const [response] = await this.db
        .insert(this.table)
        .values({
          ...validated,
          organizationId, // From tenant context - CRITICAL
        })
        .returning();

      const validatedOutput = this.validateOutput(this.selectSchema, response);
      return this.ok(validatedOutput);
    } catch (error) {
      return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
    }
  }

  /**
   * Update onboarding response for a specific organization (tenant)
   * CRITICAL: Only updates data for the specified organizationId
   */
  async updateOnboardingResponse(
    request: NextRequest,
    data: OnboardingResponsesUpdate
  ): Promise<Result<OnboardingResponses>> {
    try {
      const organizationId = await getOrganizationId(request);
      if (!organizationId) {
        return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
      }

      // Remove organizationId from data if present (security)
      const { organizationId: _, ...dataWithoutOrgId } = data as any;

      const validated = this.validateInput(this.updateSchema, dataWithoutOrgId);

      const [response] = await this.db
        .update(this.table)
        .set({
          ...validated,
          updatedAt: new Date(),
        })
        .where(eq(this.table.organizationId, organizationId))
        .returning();

      if (!response) {
        return this.fail('NOT_FOUND', 'Onboarding response not found');
      }

      const validatedOutput = this.validateOutput(this.selectSchema, response);
      return this.ok(validatedOutput);
    } catch (error) {
      return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
    }
  }

  /**
   * Complete onboarding response for a specific organization (tenant)
   * CRITICAL: Only completes data for the specified organizationId
   */
  async completeOnboardingResponse(
    request: NextRequest
  ): Promise<Result<OnboardingResponses>> {
    try {
      const organizationId = await getOrganizationId(request);
      if (!organizationId) {
        return this.fail('NO_TENANT', 'Organization ID is required for tenant scoping');
      }

      const [response] = await this.db
        .update(this.table)
        .set({
          isComplete: true,
          submittedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(this.table.organizationId, organizationId))
        .returning();

      if (!response) {
        return this.fail('NOT_FOUND', 'Onboarding response not found');
      }

      const validatedOutput = this.validateOutput(this.selectSchema, response);
      return this.ok(validatedOutput);
    } catch (error) {
      return this.fail('DB_ERROR', error instanceof Error ? error.message : 'Database error');
    }
  }
}

export const onboardingResponsesService = new OnboardingResponsesService();
