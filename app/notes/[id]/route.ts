import { NextResponse, NextRequest } from "next/server";
import { notes } from "@/lib/api/mockData";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const note = notes.find((n) => n.id === id);

  return note
    ? NextResponse.json(note)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  notes[idx] = { ...notes[idx], ...body };
  return NextResponse.json(notes[idx]);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const deleted = notes.splice(idx, 1);
  return NextResponse.json(deleted[0]);
}
