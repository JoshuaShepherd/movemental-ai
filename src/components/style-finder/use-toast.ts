"use client";

import { useCallback, useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const toast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    window.setTimeout(() => setVisible(false), 1400);
  }, []);

  return { message, visible, toast };
}
