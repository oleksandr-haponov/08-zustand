import { NextRequest, NextResponse } from "next/server";
import { notes } from "@/lib/api/mockData";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newNote = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...body,
  };
  notes.push(newNote);
  return NextResponse.json(newNote, { status: 201 });
}
