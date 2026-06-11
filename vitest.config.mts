import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const srcRoot = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": srcRoot,
    },
  },
  test: {
    environment: "node",
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/unit/**/*.{test,spec}.{ts,tsx}",
    ],
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
  },
});
