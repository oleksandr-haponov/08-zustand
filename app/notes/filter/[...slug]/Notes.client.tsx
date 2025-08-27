"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(tag),
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки заметок</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Заметки {tag ? `(${tag})` : ""}</h1>
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
