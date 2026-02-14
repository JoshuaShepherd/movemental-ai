import { NextResponse } from 'next/server';
import { writeService } from '@/lib/services/simplified/write';

export type LinkedWriterWithContent = {
  id: string;
  fullName: string;
  email: string | null;
  slug: string | null;
  bio: string | null;
  avatarUrl: string | null;
  role: string | null;
  organization: string | null;
  tags: unknown;
  linkedUserId: string | null;
  linkedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  featuredContent: {
    id: string;
    title: string;
    contentType: string;
    bodyExcerpt: string | null;
    url: string | null;
  } | null;
};

export async function GET() {
  try {
    const writersResult = await writeService.listLinkedWriters();
    if (!writersResult.ok) {
      return NextResponse.json(
        { error: writersResult.error.message },
        { status: writersResult.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }

    const writers = writersResult.data;
    if (writers.length === 0) {
      return NextResponse.json({ data: [] });
    }

    const contentResult = await writeService.getFirstContentByWriteIds(writers.map((w) => w.id));
    if (!contentResult.ok) {
      return NextResponse.json(
        { error: contentResult.error.message },
        { status: 500 }
      );
    }

    const contentMap = contentResult.data;
    const data: LinkedWriterWithContent[] = writers.map((w) => ({
      ...w,
      featuredContent: contentMap[w.id]
        ? {
            id: contentMap[w.id]!.id,
            title: contentMap[w.id]!.title,
            contentType: contentMap[w.id]!.contentType,
            bodyExcerpt: contentMap[w.id]!.bodyExcerpt ?? null,
            url: contentMap[w.id]!.url ?? null,
          }
        : null,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
