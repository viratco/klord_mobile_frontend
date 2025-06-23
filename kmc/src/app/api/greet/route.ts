// src/app/api/greet/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  // Simulate a short delay to make loading state more apparent
  await new Promise(resolve => setTimeout(resolve, 750));

  if (!name || name.trim() === '') {
    return NextResponse.json({ error: 'Name parameter is required and cannot be empty.' }, { status: 400 });
  }

  return NextResponse.json({ message: `Hello, ${name}! This greeting comes from your Next.js backend API.` });
}
