import { NextRequest, NextResponse } from 'next/server';
import { onboardingResponsesService } from '@/lib/services/simplified/onboardingResponses';
import {
  OnboardingResponsesInsertSchema,
  OnboardingResponsesUpdateSchema,
} from '@/lib/schemas';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // Service automatically filters by organizationId (tenant scoping)
    const result = await onboardingResponsesService.getOnboardingResponse(request);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = OnboardingResponsesInsertSchema.parse(body);

    // CRITICAL: organizationId comes from tenant context, not client input
    // Remove organizationId from validated data if present (security)
    const { organizationId: _, ...dataWithoutOrgId } = validated as any;

    const result = await onboardingResponsesService.createOnboardingResponse(
      request,
      dataWithoutOrgId
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : 500 }
      );
    }

    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = OnboardingResponsesUpdateSchema.parse(body);

    // CRITICAL: organizationId comes from tenant context, not client input
    // Remove organizationId from validated data if present (security)
    const { organizationId: _, ...dataWithoutOrgId } = validated as any;

    const result = await onboardingResponsesService.updateOnboardingResponse(
      request,
      dataWithoutOrgId
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
