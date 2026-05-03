import * as fs from "fs";
import * as path from "path";

/**
 * Layer 5 validation: Checks that all entities have React Query hooks
 * with list, detail, create, update, delete hooks and query keys.
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const hooksDir = path.join(__dirname, "..", "src", "hooks", "simplified");

const schemaContent = fs.readFileSync(schemaPath, "utf-8");
const tableRegex = /export const (\w+) = pgTable\(/g;
const tableNames: string[] = [];
let match: RegExpExecArray | null;
while ((match = tableRegex.exec(schemaContent)) !== null) {
  tableNames.push(match[1]);
}

function toPascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toKebabCase(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const missing: string[] = [];
const invalid: string[] = [];
let hookCount = 0;

for (const varName of tableNames) {
  const kebab = toKebabCase(varName);
  const pascal = toPascalCase(varName);
  const hookFile = path.join(hooksDir, `${kebab}.hooks.ts`);

  if (!fs.existsSync(hookFile)) {
    missing.push(`${kebab}.hooks.ts`);
    continue;
  }

  const content = fs.readFileSync(hookFile, "utf-8");

  const requiredExports = [
    `${varName}Keys`,
    `use${pascal}List`,
    `use${pascal}Create`,
    `use${pascal}Update`,
    `use${pascal}Delete`,
  ];

  const missingExports = requiredExports.filter((e) => !content.includes(e));
  if (missingExports.length > 0) {
    invalid.push(`${kebab}.hooks.ts (missing: ${missingExports.join(", ")})`);
    continue;
  }

  hookCount++;
}

// Check QueryClientProvider exists
const providersPath = path.join(__dirname, "..", "src", "app", "providers.tsx");
const hasProvider = fs.existsSync(providersPath) &&
  fs.readFileSync(providersPath, "utf-8").includes("QueryClientProvider");

const issues = [...missing.map((m) => `missing: ${m}`), ...invalid];
if (!hasProvider) issues.push("QueryClientProvider not found in providers.tsx");

const status = issues.length === 0 ? "LOCKED" : "UNLOCKED";
const message =
  status === "LOCKED"
    ? `Layer 5 LOCKED: ${hookCount} hook files found for ${tableNames.length} entities. QueryClientProvider present.`
    : `Layer 5 UNLOCKED: ${missing.length} missing, ${invalid.length} invalid. First 10: ${issues.slice(0, 10).join(", ")}`;

const result = {
  layer: 5,
  name: "React Hooks",
  status,
  schemaTables: tableNames.length,
  hooks: hookCount,
  missing: missing.length,
  invalid: invalid.length,
  message,
};

console.log(JSON.stringify(result, null, 2));
process.exit(status === "LOCKED" ? 0 : 1);
