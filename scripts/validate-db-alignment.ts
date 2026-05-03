import postgres from "postgres";
import * as fs from "fs";
import * as path from "path";

// Load .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex);
    let value = trimmed.slice(eqIndex + 1);
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

// Count exported pgTable definitions in schema.ts (include tables with type annotations)
function countSchemaTables(): number {
  const schemaPath = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "db",
    "schema.ts"
  );
  const content = fs.readFileSync(schemaPath, "utf-8");
  // Match both "export const x = pgTable(" and "export const x: Type = pgTable("
  const matches = content.match(/export const \w+(?::\s*\w+(?:<[^>]*>)?)?\s*=\s*pgTable\s*\(/g);
  return matches ? matches.length : 0;
}

async function main() {
  const sql = postgres(DATABASE_URL!);

  try {
    // Query live database for public schema tables
    const dbTables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    const dbTableCount = dbTables.length;
    const schemaTableCount = countSchemaTables();

    const status = dbTableCount === schemaTableCount ? "LOCKED" : "UNLOCKED";
    const message =
      status === "LOCKED"
        ? `Layer 1 LOCKED: ${schemaTableCount} tables match between schema.ts and database.`
        : `Layer 1 UNLOCKED: schema.ts has ${schemaTableCount} tables, database has ${dbTableCount} tables. Difference: ${Math.abs(schemaTableCount - dbTableCount)}.`;

    const result = {
      layer: 1,
      name: "Drizzle Schema",
      status,
      schemaTables: schemaTableCount,
      dbTables: dbTableCount,
      message,
    };

    console.log(JSON.stringify(result, null, 2));
    process.exit(status === "LOCKED" ? 0 : 1);
  } catch (error) {
    console.error("Validation failed:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
