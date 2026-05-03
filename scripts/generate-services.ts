import * as fs from "fs";
import * as path from "path";
import { extractPgTableVarNames } from "./extract-schema-pg-tables";

/**
 * Generates a service file for each Drizzle table that extends SimplifiedService.
 * Output: src/lib/services/simplified/<entity>.service.ts
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const outputDir = path.join(__dirname, "..", "src", "lib", "services", "simplified");

const schemaContent = fs.readFileSync(schemaPath, "utf-8");

const tables = extractPgTableVarNames(schemaContent).map((varName) => ({
  varName,
}));

function toPascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Convert camelCase to kebab-case for filenames
function toKebabCase(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const serviceFiles: string[] = [];

for (const { varName } of tables) {
  const pascal = toPascalCase(varName);
  const kebab = toKebabCase(varName);
  const fileName = `${kebab}.service.ts`;
  const filePath = path.join(outputDir, fileName);

  // Don't overwrite base.service.ts
  if (fileName === "base.service.ts") continue;

  const content = `import { ${varName} } from "@/lib/db/schema";
import {
  ${pascal}SelectSchema,
  ${pascal}InsertSchema,
  ${pascal}UpdateSchema,
  ${pascal}FiltersSchema,
  type ${pascal},
  type ${pascal}Create,
  type ${pascal}Update,
  type ${pascal}Filters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ${pascal}Service extends SimplifiedService<
  typeof ${varName},
  ${pascal},
  ${pascal}Create,
  ${pascal}Update,
  ${pascal}Filters
> {
  constructor() {
    super(
      ${varName},
      ${pascal}SelectSchema,
      ${pascal}InsertSchema,
      ${pascal}UpdateSchema,
      ${pascal}FiltersSchema,
    );
  }
}

export const ${varName}Service = new ${pascal}Service();
`;

  fs.writeFileSync(filePath, content);
  serviceFiles.push(fileName);
}

// Generate index.ts that re-exports all services
const indexLines = serviceFiles.map((f) => {
  const moduleName = f.replace(".ts", "");
  return `export * from "./${moduleName}";`;
});

const indexContent = `// Auto-generated service index
// Generated at: ${new Date().toISOString()}
// Do not edit manually - regenerate with: pnpm generate:services

export { SimplifiedService } from "./base.service";
export type { Result, Ok, Err } from "./base.service";

${indexLines.join("\n")}
`;

fs.writeFileSync(path.join(outputDir, "index.ts"), indexContent);

console.log(`Generated ${serviceFiles.length} service files + index.ts in ${outputDir}`);
