"use client";

import { useState } from "react";
import styles from "./NoteEditor.module.css";
import { Note } from "@/types/note";

interface Props {
  initialNote?: Note; // если передан → редактируем, если нет → создаём новую
  onSave: (data: { title: string; content: string }) => void;
}

export default function NoteEditor({ initialNote, onSave }: Props) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Enter note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className={styles.button} type="submit">
        {initialNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
