"use client";

import styles from "./NotePreview.module.css";
import { Note } from "@/types/note";

interface Props {
  note: Note;
}

export default function NotePreview({ note }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
      <p className={styles.date}>{new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}
