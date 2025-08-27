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

  const { data } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal open onClose={() => router.back()}>
      <NotePreview note={data} onBack={() => router.back()} />
    </Modal>
  );
}
