"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import { Note } from "@/types/note";

export default function NotesPage() {
  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки заметок</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Заметки</h1>
      <ul>
        {data?.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong> — {note.content}
          </li>
        ))}
      </ul>
    </main>
  );
}