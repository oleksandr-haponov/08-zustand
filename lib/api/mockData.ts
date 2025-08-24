import { Note } from "@/types/note";

export const notes: Note[] = [
  {
    id: "1",
    title: "Первая заметка",
    content: "Это пример заметки.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Вторая заметка",
    content: "Ещё одна тестовая заметка.",
    createdAt: new Date().toISOString(),
  },
];
