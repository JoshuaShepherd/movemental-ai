import type { ReactNode } from "react";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";

export default function AssessLayout({ children }: { children: ReactNode }) {
  return <InkBandUtilityShell>{children}</InkBandUtilityShell>;
}
