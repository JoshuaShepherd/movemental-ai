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

/** SQL table names declared in schema.ts (schema is the contract the app expects). */
function extractSchemaTableNames(): Set<string> {
  const schemaPath = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "db",
    "schema.ts"
  );
  const content = fs.readFileSync(schemaPath, "utf-8");
  const names = new Set<string>();
  const re = /pgTable\s*\(\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    names.add(m[1]!);
  }
  return names;
}

async function main() {
  const sql = postgres(DATABASE_URL!);

  try {
    const dbTables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    const dbNames = new Set(dbTables.map((r) => String(r.table_name)));
    const schemaNames = extractSchemaTableNames();

    const missingInDb = [...schemaNames].filter((n) => !dbNames.has(n)).sort();
    const extraInDb = [...dbNames].filter((n) => !schemaNames.has(n)).sort();

    const locked = missingInDb.length === 0;
    const status = locked ? "LOCKED" : "UNLOCKED";

    let message: string;
    if (locked && extraInDb.length === 0) {
      message = `Layer 1 LOCKED: All ${schemaNames.size} schema.ts tables exist in the database (no extra tables).`;
    } else if (locked) {
      message = `Layer 1 LOCKED: All ${schemaNames.size} schema.ts tables exist in the database. ${extraInDb.length} extra table(s) in DB not declared in schema (ignored): ${extraInDb.join(", ")}.`;
    } else {
      message = `Layer 1 UNLOCKED: ${missingInDb.length} schema table(s) missing from the database: ${missingInDb.join(", ")}. Apply migrations or scripts/sql/add-funnel-book-diagnostic-tables.sql as appropriate.`;
    }

    if (extraInDb.length > 0) {
      console.error(
        `[db:check] Note: ${extraInDb.length} public table(s) exist only in the database (not in schema.ts): ${extraInDb.join(", ")}.`
      );
    }

    const result = {
      layer: 1,
      name: "Drizzle Schema",
      status,
      schemaTables: schemaNames.size,
      dbTables: dbNames.size,
      missingInDatabase: missingInDb,
      extraInDatabase: extraInDb,
      message,
    };

    console.log(JSON.stringify(result, null, 2));
    process.exit(locked ? 0 : 1);
  } catch (error) {
    console.error("Validation failed:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
