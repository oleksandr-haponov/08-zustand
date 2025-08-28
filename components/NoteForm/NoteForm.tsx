"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type CreateNotePayload } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useNoteStore, type Tag } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  // Мутация создания + инвалидация кеша ["notes"]
  const {
    mutateAsync: createAsync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Нативная HTML-форма: form action
  async function handleSubmit(formData: FormData) {
    const payload: CreateNotePayload = {
      title: String(formData.get("title") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      tag: String(formData.get("tag") || "Todo"),
    };

    if (!payload.title) return;

    try {
      await createAsync(payload);
      clearDraft(); // очистить draft ТОЛЬКО при успехе
      router.back(); // вернуться на предыдущий маршрут
    } catch {
      // Ошибку покажем ниже (isError + error.message)
    }
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraft({ tag: e.target.value as Tag });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          placeholder="Enter title"
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          placeholder="Enter content"
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleTagChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {isError && (
        <p className={css.error}>
          {(error as Error)?.message ?? "Failed to create note"}
        </p>
      )}

      <div className={css.actions}>
        {/* Cancel: НЕ очищает draft, только назад */}
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
