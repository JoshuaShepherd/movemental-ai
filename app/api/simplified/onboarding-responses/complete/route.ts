import { NextRequest, NextResponse } from 'next/server';
import { onboardingResponsesService } from '@/lib/services/simplified/onboardingResponses';

export async function POST(request: NextRequest) {
  try {
    const result = await onboardingResponsesService.completeOnboardingResponse(request);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : result.error.code === 'NOT_FOUND' ? 404 : 500 }
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
