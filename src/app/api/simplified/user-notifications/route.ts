import { NextRequest, NextResponse } from "next/server";
import { userNotificationsService } from "@/lib/services/simplified/user-notifications.service";
import { UserNotificationsInsertSchema, UserNotificationsUpdateSchema, UserNotificationsFiltersSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawFilters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    rawFilters[key] = value;
  });

  const parsed = UserNotificationsFiltersSchema.safeParse({
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

  const result = await userNotificationsService.list(parsed.data);
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

  const parsed = UserNotificationsInsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await userNotificationsService.create(parsed.data);
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

  const parsed = UserNotificationsUpdateSchema.safeParse(updateData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 },
    );
  }

  const result = await userNotificationsService.update(id, parsed.data);
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

  const result = await userNotificationsService.delete(id);
  if (!result.success) {
    const status = result.error.code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  return new NextResponse(null, { status: 204 });
}
