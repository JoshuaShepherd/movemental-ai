import * as fs from "fs";
import * as path from "path";

/**
 * Reads schema.ts, extracts all pgTable exports, and generates
 * src/lib/schemas/index.ts with Zod select/insert/update/filters schemas.
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const outputPath = path.join(__dirname, "..", "src", "lib", "schemas", "index.ts");

const schemaContent = fs.readFileSync(schemaPath, "utf-8");

// Extract all pgTable exports. Table SQL name may start on the next line after `pgTable(`.
const tableDeclRegex =
  /export const (\w+)\s*(?::\s*[^=]+)?\s*=\s*pgTable\s*\(\s*/g;
const tables: { varName: string; tableName: string }[] = [];
let match: RegExpExecArray | null;
while ((match = tableDeclRegex.exec(schemaContent)) !== null) {
  const varName = match[1];
  const afterOpen = match.index + match[0].length;
  const tail = schemaContent.slice(afterOpen);
  const nameMatch = tail.match(/^["']([^"']+)["']/);
  const tableName = nameMatch ? nameMatch[1] : varName;
  tables.push({ varName, tableName });
}

console.log(`Found ${tables.length} tables in schema.ts`);

// Convert camelCase to PascalCase
function toPascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Second argument body of pgTable("name", { ... }) — brace-balanced for nested objects like date({ mode: 'string' }). */
function extractPgTableColumnsBody(varName: string): string | null {
  const marker = `export const ${varName} = pgTable(`;
  const start = schemaContent.indexOf(marker);
  if (start === -1) return null;
  const pgOpen = schemaContent.indexOf("pgTable(", start);
  const firstComma = schemaContent.indexOf(",", pgOpen + 8);
  if (firstComma === -1) return null;
  const openBrace = schemaContent.indexOf("{", firstComma);
  if (openBrace === -1) return null;
  let depth = 0;
  for (let i = openBrace; i < schemaContent.length; i++) {
    const ch = schemaContent[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return schemaContent.slice(openBrace + 1, i);
      }
    }
  }
  return null;
}

// Check if a table has a specific column
function tableHasColumn(varName: string, columnName: string): boolean {
  const body = extractPgTableColumnsBody(varName);
  if (!body) return false;
  return new RegExp(`\\b${columnName}\\b\\s*:`).test(body);
}

// Build imports
const schemaImports = tables.map((t) => t.varName).join(",\n  ");

let output = `// Auto-generated Zod schemas from Drizzle schema
// Generated at: ${new Date().toISOString()}
// Do not edit manually - regenerate with: pnpm generate:schemas

import { z } from "zod";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import {
  ${schemaImports},
} from "@/lib/db/schema";

// ---- Base Filters ----

export const BaseFiltersSchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional(),
  search: z.string().optional(),
});

export type BaseFilters = z.infer<typeof BaseFiltersSchema>;

// ---- Entity Schemas ----
`;

for (const { varName, tableName } of tables) {
  const pascal = toPascalCase(varName);

  // Build entity-specific filter extensions
  const filterExtensions: string[] = [];
  if (tableHasColumn(varName, "id")) {
    filterExtensions.push(`  id: z.string().uuid().optional(),`);
  }
  if (tableHasColumn(varName, "status")) {
    filterExtensions.push(`  status: z.string().optional(),`);
  }
  if (tableHasColumn(varName, "user_id")) {
    filterExtensions.push(`  userId: z.string().uuid().optional(),`);
  }

  const filtersExtend =
    filterExtensions.length > 0
      ? `BaseFiltersSchema.extend({\n${filterExtensions.join("\n")}\n})`
      : `BaseFiltersSchema`;

  output += `
// ${pascal}
export const ${pascal}SelectSchema = createSelectSchema(${varName});
export const ${pascal}InsertSchema = createInsertSchema(${varName});
export const ${pascal}UpdateSchema = createUpdateSchema(${varName});
export const ${pascal}FiltersSchema = ${filtersExtend};

export type ${pascal} = z.infer<typeof ${pascal}SelectSchema>;
export type ${pascal}Create = z.infer<typeof ${pascal}InsertSchema>;
export type ${pascal}Update = z.infer<typeof ${pascal}UpdateSchema>;
export type ${pascal}Filters = z.infer<typeof ${pascal}FiltersSchema>;
`;
}

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, output);
console.log(`Generated ${outputPath} with ${tables.length} entity schemas`);
