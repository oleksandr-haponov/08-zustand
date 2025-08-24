"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import styles from "./NoteDetails.module.css";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorMessage message="Something went wrong." />;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={styles.content}>{data.content}</p>
        <p className={styles.date}>
          {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
