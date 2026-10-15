import type { Metadata } from "next";

import { ResolutionDocument } from "@/components/mv/resolve/resolution-document";

export const metadata: Metadata = {
  title: "My Resolution",
  alternates: { canonical: "/resolve/document" },
};

/** My Resolution (flow document 5.2). Board: R4-Result. */
export default function ResolutionDocumentPage() {
  return <ResolutionDocument />;
}
