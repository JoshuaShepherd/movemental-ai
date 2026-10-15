import { Suspense } from "react";
import type { Metadata } from "next";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { FieldGuidePage } from "@/components/mv/legacy/field-guide";

export const metadata: Metadata = {
  title: "Field Guide: AI Safety Handbook | Movemental",
  description: "First response documentation for non-profits, churches, and institutions. Get the free field guide.",
  alternates: {
    canonical: "/field-guide",
  },
};

export default function V2FieldGuidePage() {
  return (
    <>
      <MvHeader />
      <Suspense fallback={<div className="mv-wrap mv-fg" />}>
        <FieldGuidePage />
      </Suspense>
      <MvFooter />
    </>
  );
}
