"use client";

import styles from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NotePreview({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong</p>;

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <small>{new Date(data.createdAt).toLocaleString()}</small>
        <button onClick={() => window.history.back()}>Close</button>
      </div>
    </div>
  );
}
