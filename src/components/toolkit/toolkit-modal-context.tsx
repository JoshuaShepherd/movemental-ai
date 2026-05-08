"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Optional opener metadata — lets the form record where the lead came from
 * (hero, audience CTA, nav utility link, /pathway/safety footer, etc.) so the
 * day-0 / day-3 / day-7 sequence can later segment by surface.
 */
export type ToolkitModalOpenContext = {
  source?: string;
};

type ToolkitModalContextValue = {
  isOpen: boolean;
  openContext: ToolkitModalOpenContext | null;
  open: (ctx?: ToolkitModalOpenContext) => void;
  close: () => void;
};

const ToolkitModalContext = createContext<ToolkitModalContextValue | null>(null);

export function ToolkitModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openContext, setOpenContext] = useState<ToolkitModalOpenContext | null>(null);

  const open = useCallback((ctx?: ToolkitModalOpenContext) => {
    setOpenContext(ctx ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openContext, open, close }),
    [isOpen, openContext, open, close],
  );

  return <ToolkitModalContext.Provider value={value}>{children}</ToolkitModalContext.Provider>;
}

export function useToolkitModal(): ToolkitModalContextValue {
  const ctx = useContext(ToolkitModalContext);
  if (!ctx) {
    throw new Error("useToolkitModal must be used inside <ToolkitModalProvider>");
  }
  return ctx;
}
