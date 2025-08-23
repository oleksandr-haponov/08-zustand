import { NextResponse } from "next/server";
import { notes } from "@/lib/api/mockData";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const note = notes.find((n) => n.id === params.id);
  return note
    ? NextResponse.json(note)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const idx = notes.findIndex((n) => n.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  notes[idx] = { ...notes[idx], ...body };
  return NextResponse.json(notes[idx]);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const idx = notes.findIndex((n) => n.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const deleted = notes.splice(idx, 1);
  return NextResponse.json(deleted[0]);
}