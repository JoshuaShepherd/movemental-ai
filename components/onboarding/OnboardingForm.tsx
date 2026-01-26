'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOnboardingResponse, useUpdateOnboardingResponse, useCompleteOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';
import {
  VoiceContentSamplesSchema,
  BrandAssetsSchema,
  VisionCallingSchema,
  AudienceUnderstandingSchema,
  ContentInventorySchema,
  CapacityTimelineSchema,
  GoalsConcernsSchema,
  DecisionsApprovalsSchema,
  ProfileInformationSchema,
} from '@/lib/schemas';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Voice & Content', schema: VoiceContentSamplesSchema },
  { id: 2, title: 'Brand Assets', schema: BrandAssetsSchema },
  { id: 3, title: 'Vision & Calling', schema: VisionCallingSchema },
  { id: 4, title: 'Audience', schema: AudienceUnderstandingSchema },
  { id: 5, title: 'Content Inventory', schema: ContentInventorySchema },
  { id: 6, title: 'Capacity & Timeline', schema: CapacityTimelineSchema },
  { id: 7, title: 'Goals & Concerns', schema: GoalsConcernsSchema },
  { id: 8, title: 'Decisions & Approvals', schema: DecisionsApprovalsSchema },
  { id: 9, title: 'Profile Information', schema: ProfileInformationSchema },
] as const;

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: existingResponse, isLoading } = useOnboardingResponse();
  const updateResponse = useUpdateOnboardingResponse();
  const completeResponse = useCompleteOnboardingResponse();

  const currentStepConfig = STEPS[currentStep - 1];
  const progress = (currentStep / STEPS.length) * 100;

  const form = useForm({
    resolver: zodResolver(currentStepConfig.schema),
    defaultValues: existingResponse ? {} : {},
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      await updateResponse.mutateAsync({
        ...data,
        currentStep: currentStep.toString(),
      });

      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        form.reset();
      } else {
        // Complete onboarding
        await completeResponse.mutateAsync();
        // Handle completion (redirect, show success message, etc.)
      }
    } catch (error) {
      console.error('Error saving step:', error);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#2A2A2A] border border-gray-700 rounded-lg p-6">
          <h2 className="text-3xl font-serif tracking-wide mb-6">
            {currentStepConfig.title}
          </h2>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Render step-specific fields */}
              {renderStepFields(currentStep, form)}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-[#1A1A1A] rounded hover:bg-gray-100 flex items-center gap-2"
                >
                  {currentStep === STEPS.length ? 'Complete' : 'Next'}
                  {currentStep < STEPS.length && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

function renderStepFields(step: number, form: any) {
  // Placeholder for step-specific field rendering
  // Each step should have its own component
  switch (step) {
    case 1:
      return <div className="text-gray-300">Voice & Content Step - To be implemented</div>;
    case 2:
      return <div className="text-gray-300">Brand Assets Step - To be implemented</div>;
    case 3:
      return <div className="text-gray-300">Vision & Calling Step - To be implemented</div>;
    case 4:
      return <div className="text-gray-300">Audience Step - To be implemented</div>;
    case 5:
      return <div className="text-gray-300">Content Inventory Step - To be implemented</div>;
    case 6:
      return <div className="text-gray-300">Capacity & Timeline Step - To be implemented</div>;
    case 7:
      return <div className="text-gray-300">Goals & Concerns Step - To be implemented</div>;
    case 8:
      return <div className="text-gray-300">Decisions & Approvals Step - To be implemented</div>;
    case 9:
      return <div className="text-gray-300">Profile Information Step - To be implemented</div>;
    default:
      return null;
  }
}
