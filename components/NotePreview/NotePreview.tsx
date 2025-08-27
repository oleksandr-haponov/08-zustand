"use client";

import type { Note } from "@/types/note";
import { formatDateUTC } from "@/lib/format";
import css from "./NotePreview.module.css";

export interface NotePreviewProps {
  note?: Note | null;
  onBack?: () => void;
}

export default function NotePreview({ note, onBack }: NotePreviewProps) {
  if (!note) {
    return (
      <div className={css.container}>
        <div className={css.item}>
          {onBack && (
            <button className={css.backBtn} onClick={onBack}>
              ← Back
            </button>
          )}
          <p className={css.content}>Note not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        {onBack && (
          <button className={css.backBtn} onClick={onBack}>
            ← Back
          </button>
        )}

        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag} title={note.tag}>
            {note.tag}
          </span>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formatDateUTC(note.createdAt)}</p>
      </div>
    </div>
  );
}
