import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createEnrollmentSchema } from "@/lib/safety/schemas";
import { createEnrollmentRecord, getEnrollmentById, updateEnrollmentRecord } from "@/lib/safety/server/enrollment";

const EnrollmentIdSchema = z.object({ enrollment_id: z.string().uuid() });

export async function GET(request: NextRequest) {
  const enrollmentId = request.nextUrl.searchParams.get("enrollment_id");
  const parsed = EnrollmentIdSchema.safeParse({ enrollment_id: enrollmentId });
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "enrollment_id is required." } },
      { status: 400 },
    );
  }

  const row = await getEnrollmentById(parsed.data.enrollment_id);
  if (!row) {
    return NextResponse.json({ error: { code: "not_found", message: "Enrollment not found." } }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: row });
}

export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null || !("enrollment_id" in body)) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "enrollment_id is required." } },
      { status: 400 },
    );
  }

  const enrollmentId = String((body as { enrollment_id: string }).enrollment_id);
  const idParsed = EnrollmentIdSchema.safeParse({ enrollment_id: enrollmentId });
  if (!idParsed.success) {
    return NextResponse.json({ error: { code: "validation_error", message: "Invalid enrollment_id." } }, { status: 400 });
  }

  const { enrollment_id: _id, ...patch } = body as Record<string, unknown>;
  const patchParsed = createEnrollmentSchema.partial().safeParse(patch);
  if (!patchParsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: patchParsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await updateEnrollmentRecord(idParsed.data.enrollment_id, patchParsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  const row = await getEnrollmentById(idParsed.data.enrollment_id);
  return NextResponse.json({ success: true, data: row });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = createEnrollmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await createEnrollmentRecord(parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data }, { status: 201 });
}
