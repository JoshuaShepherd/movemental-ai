import * as fs from "fs";
import * as path from "path";

/**
 * Layer 2 validation: Checks that all Drizzle schema tables
 * have corresponding Zod schemas (Select, Insert, Update, Filters)
 * and type exports in src/lib/schemas/index.ts.
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const zodPath = path.join(__dirname, "..", "src", "lib", "schemas", "index.ts");

// Extract table export names from schema.ts
const schemaContent = fs.readFileSync(schemaPath, "utf-8");
const tableRegex = /export const (\w+) = pgTable\(/g;
const tableNames: string[] = [];
let match: RegExpExecArray | null;
while ((match = tableRegex.exec(schemaContent)) !== null) {
  tableNames.push(match[1]);
}

// Check if Zod schemas file exists
if (!fs.existsSync(zodPath)) {
  console.log(
    JSON.stringify(
      {
        layer: 2,
        name: "Zod Schemas",
        status: "UNLOCKED",
        schemaTables: tableNames.length,
        zodEntities: 0,
        missing: tableNames.length,
        message: "src/lib/schemas/index.ts does not exist.",
      },
      null,
      2
    )
  );
  process.exit(1);
}

const zodContent = fs.readFileSync(zodPath, "utf-8");

function toPascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const missingSchemas: string[] = [];
const requiredSuffixes = ["SelectSchema", "InsertSchema", "UpdateSchema", "FiltersSchema"];
const requiredTypes = ["Create", "Update", "Filters"];

for (const varName of tableNames) {
  const pascal = toPascalCase(varName);

  for (const suffix of requiredSuffixes) {
    const exportName = `${pascal}${suffix}`;
    if (!zodContent.includes(`export const ${exportName}`)) {
      missingSchemas.push(exportName);
    }
  }

  // Check the Select type (just the PascalCase name)
  if (!zodContent.includes(`export type ${pascal} =`)) {
    missingSchemas.push(`type ${pascal}`);
  }

  for (const suffix of requiredTypes) {
    const typeName = `${pascal}${suffix}`;
    if (!zodContent.includes(`export type ${typeName}`)) {
      missingSchemas.push(`type ${typeName}`);
    }
  }
}

const zodEntityCount = (zodContent.match(/export const \w+SelectSchema/g) || []).length;
const status = missingSchemas.length === 0 ? "LOCKED" : "UNLOCKED";
const message =
  status === "LOCKED"
    ? `Layer 2 LOCKED: All ${tableNames.length} entities have Select, Insert, Update, Filters schemas and types.`
    : `Layer 2 UNLOCKED: ${missingSchemas.length} missing exports. First 10: ${missingSchemas.slice(0, 10).join(", ")}`;

const result = {
  layer: 2,
  name: "Zod Schemas",
  status,
  schemaTables: tableNames.length,
  zodEntities: zodEntityCount,
  missing: missingSchemas.length,
  message,
};

console.log(JSON.stringify(result, null, 2));
process.exit(status === "LOCKED" ? 0 : 1);
