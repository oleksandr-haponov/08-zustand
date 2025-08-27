"use client";

import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css"; // <-- правильно: свой css модуля

export interface NoteListProps {
  notes: Note[];
  onDelete?: (id: number | string) => void;
  isDeleting?: boolean;
  deletingId?: number | string;
}

export default function NoteList({
  notes,
  onDelete,
  isDeleting,
  deletingId,
}: NoteListProps) {
  if (!notes?.length) return null;

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listItem}>
          <h3 className={css.title}>{n.title}</h3>
          <p className={css.content}>{n.content}</p>

          <div className={css.footer}>
            <span className={css.tag} title={n.tag}>
              {n.tag}
            </span>

            <div style={{ display: "flex", gap: 8 }}>
              <Link className={css.link} href={`/notes/${String(n.id)}`}>
                View details
              </Link>

              {onDelete && (
                <button
                  className={css.button}
                  onClick={() => onDelete(n.id)}
                  disabled={isDeleting && deletingId === n.id}
                >
                  {isDeleting && deletingId === n.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
