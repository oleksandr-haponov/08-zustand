import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noteId = Number(id);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["note", String(noteId)],
    queryFn: () => fetchNoteById(String(noteId)), // строкой, чтобы не было TS-конфликта
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={noteId} />
    </HydrationBoundary>
  );
}
