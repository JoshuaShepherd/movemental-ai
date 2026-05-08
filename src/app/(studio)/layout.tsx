import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Agent runtime",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-4 py-10 md:px-6">{children}</div>
  );
}
