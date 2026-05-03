import * as fs from "fs";
import * as path from "path";

/**
 * Layer 3 validation: Checks that all Drizzle schema tables have
 * corresponding service files that extend SimplifiedService.
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const servicesDir = path.join(__dirname, "..", "src", "lib", "services", "simplified");

// Extract table export names from schema.ts
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
let serviceCount = 0;

for (const varName of tableNames) {
  const kebab = toKebabCase(varName);
  const serviceFile = path.join(servicesDir, `${kebab}.service.ts`);

  if (!fs.existsSync(serviceFile)) {
    missing.push(`${kebab}.service.ts`);
    continue;
  }

  const content = fs.readFileSync(serviceFile, "utf-8");
  const pascal = toPascalCase(varName);

  if (!content.includes(`extends SimplifiedService`)) {
    invalid.push(`${kebab}.service.ts (does not extend SimplifiedService)`);
    continue;
  }

  if (!content.includes(`${pascal}Service`)) {
    invalid.push(`${kebab}.service.ts (missing ${pascal}Service class/export)`);
    continue;
  }

  serviceCount++;
}

// Check base.service.ts exists
const baseExists = fs.existsSync(path.join(servicesDir, "base.service.ts"));

const issues = [...missing.map((m) => `missing: ${m}`), ...invalid];
const status = issues.length === 0 && baseExists ? "LOCKED" : "UNLOCKED";
const message =
  status === "LOCKED"
    ? `Layer 3 LOCKED: ${serviceCount} services found for ${tableNames.length} entities. Base service present.`
    : `Layer 3 UNLOCKED: ${missing.length} missing, ${invalid.length} invalid.${!baseExists ? " base.service.ts missing." : ""} First 10: ${issues.slice(0, 10).join(", ")}`;

const result = {
  layer: 3,
  name: "Services",
  status,
  schemaTables: tableNames.length,
  services: serviceCount,
  missing: missing.length,
  invalid: invalid.length,
  message,
};

console.log(JSON.stringify(result, null, 2));
process.exit(status === "LOCKED" ? 0 : 1);
