"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePreviewClient({ id }: { id: number }) {
  // грузим данные заметки и рендерим превью (без обёртки Modal — её делает page.tsx)
  const { data } = useQuery<Note>({
    queryKey: ["note", String(id)],
    queryFn: () => fetchNoteById(String(id)),
    refetchOnMount: false,
  });

  return <NotePreview note={data ?? null} />;
}
