import { NextRequest, NextResponse } from "next/server";
import { agentGuardrailAssignmentsService } from "@/lib/services/simplified/agent-guardrail-assignments.service";
import { AgentGuardrailAssignmentsInsertSchema, AgentGuardrailAssignmentsUpdateSchema, AgentGuardrailAssignmentsFiltersSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawFilters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    rawFilters[key] = value;
  });

  const parsed = AgentGuardrailAssignmentsFiltersSchema.safeParse({
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

  const result = await agentGuardrailAssignmentsService.list(parsed.data);
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

  const parsed = AgentGuardrailAssignmentsInsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await agentGuardrailAssignmentsService.create(parsed.data);
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

  const parsed = AgentGuardrailAssignmentsUpdateSchema.safeParse(updateData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await agentGuardrailAssignmentsService.update(id, parsed.data);
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

  const result = await agentGuardrailAssignmentsService.delete(id);
  if (!result.success) {
    const status = result.error.code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  return new NextResponse(null, { status: 204 });
}
