import type { Metadata } from "next";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";

import { LeaderApplyForm } from "./leader-apply-form";

export const metadata: Metadata = {
  title: "Apply — movement leader",
  description: "Application to join Movemental as a Movement Leader.",
};

export default function LeaderApplyPage() {
  return (
    <Section variant="default" spacing="lg" className="flex-1">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)]">
        <header className="mb-10 space-y-4">
          <Eyebrow>Trusted voices</Eyebrow>
          <Display as="h1" size="md" className="text-balance">
            Movement leader application
          </Display>
          <Prose>
            <p>
              This public form is for leaders invited to explore a trusted-voice relationship with
              Movemental. Submissions are reviewed internally; you will hear from us by email.
            </p>
          </Prose>
        </header>
        <LeaderApplyForm />
      </div>
    </Section>
  );
}
