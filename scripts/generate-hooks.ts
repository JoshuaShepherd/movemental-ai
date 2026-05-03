import * as fs from "fs";
import * as path from "path";

/**
 * Generates React Query hooks for each entity.
 * Output: src/hooks/simplified/<kebab-entity>.hooks.ts
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const outputDir = path.join(__dirname, "..", "src", "hooks", "simplified");

const schemaContent = fs.readFileSync(schemaPath, "utf-8");

const tableRegex = /export const (\w+) = pgTable\("(\w+)"/g;
const tables: { varName: string }[] = [];
let match: RegExpExecArray | null;
while ((match = tableRegex.exec(schemaContent)) !== null) {
  tables.push({ varName: match[1] });
}

function toPascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toKebabCase(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const hookFiles: string[] = [];

for (const { varName } of tables) {
  const pascal = toPascalCase(varName);
  const kebab = toKebabCase(varName);
  const fileName = `${kebab}.hooks.ts`;
  const filePath = path.join(outputDir, fileName);

  const apiPath = `/api/simplified/${kebab}`;

  const content = `import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  ${pascal},
  ${pascal}Create,
  ${pascal}Update,
  ${pascal}Filters,
} from "@/lib/schemas";
import { buildQueryString } from "./query-utils";

// ---- Query Keys ----

export const ${varName}Keys = {
  all: ["${varName}"] as const,
  lists: () => [...${varName}Keys.all, "list"] as const,
  list: (filters?: ${pascal}Filters) => [...${varName}Keys.lists(), filters] as const,
  details: () => [...${varName}Keys.all, "detail"] as const,
  detail: (id: string) => [...${varName}Keys.details(), id] as const,
};

// ---- Fetch Helpers ----

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error?.message ?? "Request failed");
  }
  return json.data;
}

// ---- Hooks ----

export function use${pascal}List(filters?: ${pascal}Filters) {
  return useQuery({
    queryKey: ${varName}Keys.list(filters),
    queryFn: () =>
      fetchApi<${pascal}[]>(\`${apiPath}\${buildQueryString(filters)}\`),
  });
}

export function use${pascal}(id: string) {
  return useQuery({
    queryKey: ${varName}Keys.detail(id),
    queryFn: () =>
      fetchApi<${pascal}>(\`${apiPath}?id=\${id}\`),
    enabled: !!id,
  });
}

export function use${pascal}Create() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ${pascal}Create) =>
      fetchApi<${pascal}>(\`${apiPath}\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${varName}Keys.lists() });
    },
  });
}

export function use${pascal}Update() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: ${pascal}Update & { id: string }) =>
      fetchApi<${pascal}>(\`${apiPath}\`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ${varName}Keys.lists() });
      queryClient.invalidateQueries({
        queryKey: ${varName}Keys.detail(variables.id),
      });
    },
  });
}

export function use${pascal}Delete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(\`${apiPath}?id=\${id}\`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${varName}Keys.lists() });
    },
  });
}
`;

  fs.writeFileSync(filePath, content);
  hookFiles.push(fileName);
}

// Generate index.ts
const indexLines = hookFiles.map((f) => {
  const moduleName = f.replace(".ts", "");
  return `export * from "./${moduleName}";`;
});

const indexContent = `// Auto-generated hooks index
// Generated at: ${new Date().toISOString()}
// Do not edit manually - regenerate with: pnpm generate:hooks

export { buildQueryString } from "./query-utils";
${indexLines.join("\n")}
`;

fs.writeFileSync(path.join(outputDir, "index.ts"), indexContent);

console.log(`Generated ${hookFiles.length} hook files + index.ts in ${outputDir}`);
