import type { ReactNode } from "react";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <InkBandUtilityShell>{children}</InkBandUtilityShell>;
}
