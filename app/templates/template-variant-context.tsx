"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface VariantContextValue {
  variant: string;
  setVariant: (v: string) => void;
}

const VariantContext = createContext<VariantContextValue>({
  variant: "",
  setVariant: () => {},
});

export function VariantProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariantState] = useState("");
  const setVariant = useCallback((v: string) => setVariantState(v), []);

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      <div
        className="min-h-screen template-movement-leader"
        data-variant={variant || undefined}
      >
        {children}
      </div>
    </VariantContext.Provider>
  );
}

export function useTemplateVariant() {
  return useContext(VariantContext);
}
