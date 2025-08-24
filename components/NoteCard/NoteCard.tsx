"use client";

import styles from "./NoteCard.module.css";
import { Note } from "@/types/note";
import Link from "next/link";

interface Props {
  note: Note;
  onDelete?: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{new Date(note.createdAt).toLocaleString()}</small>

      <div className={styles.actions}>
        <Link href={`/notes/${note.id}`} className={styles.view}>
          View details
        </Link>
        {onDelete && (
          <button onClick={() => onDelete(note.id)} className={styles.delete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
