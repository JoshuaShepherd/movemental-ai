import * as fs from "fs";
import * as path from "path";

/**
 * Generates API route files for each entity.
 * Output: src/app/api/simplified/<kebab-entity>/route.ts
 */

const schemaPath = path.join(__dirname, "..", "src", "lib", "db", "schema.ts");
const outputBase = path.join(__dirname, "..", "src", "app", "api", "simplified");

const schemaContent = fs.readFileSync(schemaPath, "utf-8");

const tableRegex = /export const (\w+) = pgTable\("(\w+)"/g;
const tables: { varName: string; tableName: string }[] = [];
let match: RegExpExecArray | null;
while ((match = tableRegex.exec(schemaContent)) !== null) {
  tables.push({ varName: match[1], tableName: match[2] });
}

function toPascalCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toKebabCase(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

let count = 0;

for (const { varName } of tables) {
  const pascal = toPascalCase(varName);
  const kebab = toKebabCase(varName);
  const serviceKebab = kebab;

  const routeDir = path.join(outputBase, kebab);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  const routeFile = path.join(routeDir, "route.ts");

  const content = `import { NextRequest, NextResponse } from "next/server";
import { ${varName}Service } from "@/lib/services/simplified/${serviceKebab}.service";
import { ${pascal}InsertSchema, ${pascal}UpdateSchema, ${pascal}FiltersSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawFilters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    rawFilters[key] = value;
  });

  const parsed = ${pascal}FiltersSchema.safeParse({
    ...rawFilters,
    limit: rawFilters.limit ? Number(rawFilters.limit) : undefined,
    offset: rawFilters.offset ? Number(rawFilters.offset) : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await ${varName}Service.list(parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, data: result.data });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 },
    );
  }

  const parsed = ${pascal}InsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await ${varName}Service.create(parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, data: result.data }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 },
    );
  }

  const { id, ...updateData } = body as Record<string, unknown>;
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "id is required" } },
      { status: 400 },
    );
  }

  const parsed = ${pascal}UpdateSchema.safeParse(updateData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await ${varName}Service.update(id, parsed.data);
  if (!result.success) {
    const status = result.error.code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  return NextResponse.json({ success: true, data: result.data });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "id query parameter is required" } },
      { status: 400 },
    );
  }

  const result = await ${varName}Service.delete(id);
  if (!result.success) {
    const status = result.error.code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  return new NextResponse(null, { status: 204 });
}
`;

  fs.writeFileSync(routeFile, content);
  count++;
}

console.log(`Generated ${count} API route files in ${outputBase}`);
