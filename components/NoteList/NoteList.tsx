"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, type PaginatedNotesResponse } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const qc = useQueryClient();

  const {
    mutate,
    isPending,
    variables: deletingId,
    isError,
    error,
  } = useMutation({
    mutationFn: (id: string) => deleteNote(id),

    // оптимистичное обновление — вырезаем карточку из всех кэшей ["notes", ...]
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["notes"] });
      const prev = qc.getQueriesData<PaginatedNotesResponse>({ queryKey: ["notes"] });

      prev.forEach(([key, data]) => {
        if (!data) return;
        qc.setQueryData<PaginatedNotesResponse>(key, {
          ...data,
          notes: data.notes.filter((n) => n.id !== id),
        });
      });

      return { prev };
    },

    // откат при ошибке
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        ctx.prev.forEach(([key, data]) => {
          qc.setQueryData(key, data);
        });
      }
    },

    // на всякий — инвалидация, чтобы подтянуть актуальный список
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes?.length) return null;

  return (
    <ul className={css.list}>
      {notes.map((n) => {
        const pending = isPending && deletingId === n.id;

        return (
          <li key={n.id} className={css.listItem}>
            <h3 className={css.title}>{n.title}</h3>
            <p className={css.content}>{n.content}</p>

            <div className={css.footer}>
              <span className={css.tag} title={n.tag}>
                {n.tag}
              </span>

              <div style={{ display: "flex", gap: 8 }}>
                <Link className={css.link} href={`/notes/${n.id}`}>
                  View details
                </Link>

                <button
                  className={css.button}
                  onClick={() => mutate(n.id)}
                  disabled={pending}
                  aria-busy={pending}
                >
                  {pending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>

            {isError && deletingId === n.id && (
              <p className={css.error}>
                {(error as Error)?.message ?? "Failed to delete note"}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
