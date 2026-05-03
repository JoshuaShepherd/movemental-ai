"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { useTheme } from "next-themes";
import * as React from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";

/** Matches `globals.css` `--background` light / `.dark` paper — Safari UI chrome. */
const THEME_COLOR_LIGHT = "#faf6ee";
const THEME_COLOR_DARK = "#141110";

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    const color =
      resolvedTheme === "dark" ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [mounted, resolvedTheme]);

  return null;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client.
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client.
    return makeQueryClient();
  }
  // Browser: reuse one instance across renders.
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <ThemeProvider>
      <ThemeColorSync />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
