"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NoteModalClient({ id }: { id: number }) {
  const router = useRouter();
  const noteId = String(id);

  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    retry: false, // не крутить "Loading..." по несколько попыток
  });

  return (
    <Modal open onClose={() => router.back()}>
      {isLoading ? (
        <p style={{ padding: 16, fontSize: 22 }}>Loading...</p>
      ) : isError ? (
        <div style={{ padding: 16 }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "transparent",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <p style={{ marginTop: 12, color: "#b91c1c" }}>
            {error instanceof Error ? error.message : "Failed to load note."}
          </p>
        </div>
      ) : !data ? (
        <div style={{ padding: 16 }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "transparent",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <p style={{ marginTop: 12 }}>Note not found.</p>
        </div>
      ) : (
        <NotePreview note={data} onBack={() => router.back()} />
      )}
    </Modal>
  );
}
