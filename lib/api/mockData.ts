import type { Note } from "@/types/note";

const now = Date.now();

export const notes: Note[] = [
  {
    id: 1,
    title: "Первая заметка",
    content: "Это пример заметки.",
    tag: "Todo",
    createdAt: new Date(now - 3 * 864e5).toISOString(),
    updatedAt: new Date(now - 3 * 864e5).toISOString(),
  },
  {
    id: 2,
    title: "Рабочая задача",
    content: "Подготовить отчёт по проекту.",
    tag: "Work",
    createdAt: new Date(now - 2 * 864e5).toISOString(),
    updatedAt: new Date(now - 2 * 864e5).toISOString(),
  },
];
