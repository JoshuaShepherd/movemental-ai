import * as fs from "fs";
import * as path from "path";

/**
 * Layer 4 validation: Checks that all entities have API route files
 * with GET, POST, PATCH, DELETE handlers.
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const routesBase = path.join(__dirname, "..", "src", "app", "api", "simplified");

const schemaContent = fs.readFileSync(schemaPath, "utf-8");
const tableRegex = /export const (\w+) = pgTable\(/g;
const tableNames: string[] = [];
let match: RegExpExecArray | null;
while ((match = tableRegex.exec(schemaContent)) !== null) {
  tableNames.push(match[1]);
}

function toKebabCase(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const missing: string[] = [];
const invalid: string[] = [];
let routeCount = 0;
const requiredHandlers = ["GET", "POST", "PATCH", "DELETE"];

for (const varName of tableNames) {
  const kebab = toKebabCase(varName);
  const routeFile = path.join(routesBase, kebab, "route.ts");

  if (!fs.existsSync(routeFile)) {
    missing.push(kebab);
    continue;
  }

  const content = fs.readFileSync(routeFile, "utf-8");
  const missingHandlers = requiredHandlers.filter(
    (h) => !content.includes(`export async function ${h}`)
  );

  if (missingHandlers.length > 0) {
    invalid.push(`${kebab} (missing: ${missingHandlers.join(", ")})`);
    continue;
  }

  routeCount++;
}

const issues = [...missing.map((m) => `missing: ${m}`), ...invalid];
const status = issues.length === 0 ? "VALIDATED" : "UNLOCKED";
const message =
  status === "VALIDATED"
    ? `Layer 4 VALIDATED: ${routeCount} API routes found for ${tableNames.length} entities with all CRUD handlers.`
    : `Layer 4 UNLOCKED: ${missing.length} missing, ${invalid.length} invalid. First 10: ${issues.slice(0, 10).join(", ")}`;

const result = {
  layer: 4,
  name: "API Routes",
  status,
  schemaTables: tableNames.length,
  routes: routeCount,
  missing: missing.length,
  invalid: invalid.length,
  message,
};

console.log(JSON.stringify(result, null, 2));
process.exit(status === "VALIDATED" ? 0 : 1);
