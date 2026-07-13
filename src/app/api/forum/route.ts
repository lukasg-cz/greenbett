import { NextRequest, NextResponse } from 'next/server';
import { MOCK_FORUM_CATEGORIES } from '@/lib/api/mock-data';

export async function GET() {
  return NextResponse.json(MOCK_FORUM_CATEGORIES);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      categoryId: string;
      title: string;
      content: string;
    };

    // TODO: Insert into Supabase when configured
    return NextResponse.json({
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
}
