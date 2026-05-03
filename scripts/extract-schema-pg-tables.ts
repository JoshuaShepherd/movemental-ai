/**
 * Shared helpers for codegen scripts that scan `src/lib/db/schema.ts`.
 * Handles multiline `pgTable(\n  "sql_table_name",` openings.
 */

/** Variable names for each `export const x = pgTable(...)` in document order. */
export function extractPgTableVarNames(schemaContent: string): string[] {
  const tableDeclRegex =
    /export const (\w+)\s*(?::\s*[^=]+)?\s*=\s*pgTable\s*\(\s*/g;
  const names: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = tableDeclRegex.exec(schemaContent)) !== null) {
    names.push(match[1]);
  }
  return names;
}
