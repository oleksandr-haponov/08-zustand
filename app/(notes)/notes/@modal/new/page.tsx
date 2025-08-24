"use client";

import NoteEditor from "@/components/NoteEditor/NoteEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NewNoteModal() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
    },
  });

  return (
    <Modal onClose={() => router.back()}>
      <h1>Create New Note</h1>
      <NoteEditor onSave={(data) => mutation.mutate(data)} />
    </Modal>
  );
}
