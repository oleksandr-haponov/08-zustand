"use client";

import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { useNoteStore, type Tag } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  async function handleSubmit(formData: FormData) {
    const payload = {
      title: String(formData.get("title") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      tag: String(formData.get("tag") || "Todo"),
    };

    if (!payload.title) return;

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      clearDraft(); // очистить draft только при успешном создании
      router.back(); // вернуться на предыдущий маршрут
    } else {
      console.error("Failed to create note", await res.text());
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

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
      </div>
    </form>
  );
}
