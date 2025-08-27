// app/notes/filter/[...slug]/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const VALID_TAGS = ["All", "Work", "Personal", "Todo", "Idea"];

export default async function FilterPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const tagRaw = slug?.[0] ?? "All";
  if (!VALID_TAGS.includes(tagRaw)) {
    notFound(); // покажем /app/not-found.tsx для неизвестного тега
  }

  const tag = tagRaw === "All" ? undefined : tagRaw;
  const q = typeof sp?.q === "string" ? sp.q : "";
  const page = sp?.page ? Number(sp.page) : 1;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", { q, page, tag: tag ?? "" }],
    queryFn: () => fetchNotes({ q, page, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialQ={q} initialPage={page} tag={tag ?? null} />
    </HydrationBoundary>
  );
}
