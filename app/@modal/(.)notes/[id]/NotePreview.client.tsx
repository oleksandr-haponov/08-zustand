"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePreviewClient({ id }: { id: string }) {
  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    retry: false,
  });

  if (isLoading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (isError) {
    return (
      <div style={{ padding: 16, color: "#b91c1c" }}>
        {(error as Error)?.message ?? "Failed to load note"}
      </div>
    );
  }

  return <NotePreview note={data ?? null} />;
}
