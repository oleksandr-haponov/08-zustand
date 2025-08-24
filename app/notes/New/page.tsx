"use client";

import NoteEditor from "@/components/NoteEditor/NoteEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes");
    },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Create New Note</h1>
      <NoteEditor onSave={(data) => mutation.mutate(data)} />
    </main>
  );
}
