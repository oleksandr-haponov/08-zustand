import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tagRaw = slug?.[0] ?? "All";
  const title = `NoteHub — ${tagRaw} notes`;
  const description =
    tagRaw === "All"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by tag "${tagRaw}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/notes/filter/${tagRaw}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

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
