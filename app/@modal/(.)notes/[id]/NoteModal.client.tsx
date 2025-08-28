"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NoteModalClient({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    retry: false,
  });

  return (
    <Modal open onClose={() => router.back()}>
      {isLoading ? (
        <p style={{ padding: 16, fontSize: 18 }}>Loading...</p>
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
            {(error as Error)?.message ?? "Failed to load note"}
          </p>
        </div>
      ) : (
        <NotePreview note={data ?? null} onBack={() => router.back()} />
      )}
    </Modal>
  );
}
