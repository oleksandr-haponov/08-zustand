"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "@/lib/api/notes";
import { Note } from "@/types/note";
import styles from "./Notes.module.css";
import NoteCard from "@/components/NoteCard/NoteCard";

export default function NotesClient() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notes</h1>
      <div className={styles.list}>
        {data?.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={(id) => mutation.mutate(id)}
          />
        ))}
      </div>
    </div>
  );
}