import type { Metadata } from "next";

import { MapPage } from "@/components/mv/map/map-page";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "The Map | Movemental",
  description:
    "Respond: help your organization live what it decides. Five stages, each leaving your organization with something it keeps. The Map is free.",
  alternates: { canonical: "/map-new" },
};

/** The Map, public. Board: Map (Oct 15, 2026). */
export default function MapNewPage() {
  return (
    <>
      <MvHeader />
      <MapPage />
      <MvFooter />
    </>
  );
}
