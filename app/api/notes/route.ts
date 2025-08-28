import { NextRequest, NextResponse } from "next/server";
import { notes } from "@/lib/api/mockData";

type Note = (typeof notes)[number];

// 👇 уменьши в демо, чтобы пагинация гарантированно была видна
const PAGE_SIZE = 10;

function filter(all: Note[], q?: string, tag?: string) {
  let res = all;

  const query = q?.trim().toLowerCase();
  const tagFilter = tag?.trim();

  if (query) {
    res = res.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query) ||
        String(n.tag ?? "").toLowerCase().includes(query),
    );
  }

  // если прилетит "All" — игнорируем
  if (tagFilter && tagFilter !== "All") {
    res = res.filter((n) => n.tag === tagFilter);
  }

  // сортируем по дате создания (свежие первыми), чтобы список был стабильным
  res = res.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return res;
}

function paginate(all: Note[], page: number) {
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const p = Math.min(Math.max(1, Number.isFinite(page) && page > 0 ? page : 1), totalPages);
  const start = (p - 1) * PAGE_SIZE;
  return { items: all.slice(start, start + PAGE_SIZE), totalPages };
}

// GET /api/notes?q=&page=&tag=
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const tag = url.searchParams.get("tag") ?? undefined;
  const page = Number(url.searchParams.get("page") ?? "1");

  const filtered = filter(notes, q, tag);
  const { items, totalPages } = paginate(filtered, page);

  return NextResponse.json({ notes: items, totalPages });
}

// POST /api/notes
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Pick<Note, "title" | "content" | "tag">>;

  if (!body?.title || !body?.tag) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const id = (globalThis.crypto?.randomUUID?.() ?? Date.now().toString()) as string;

  const newNote: Note = {
    id,
    title: body.title.trim(),
    content: (body.content ?? "").trim(),
    tag: body.tag,
    createdAt: now,
    updatedAt: now,
  };

  notes.unshift(newNote);
  return NextResponse.json(newNote, { status: 201 });
}
