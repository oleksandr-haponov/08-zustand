import api from "./api/axios";
import { Note } from "@/types/note";

// ✅ fetchNotes с поддержкой фильтрации по тегу
export const fetchNotes = async (tag?: string): Promise<Note[]> => {
  const { data } = await api.get("/notes", {
    params: tag ? { tag } : {}, // если тег передан → добавляем в query params
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt">
): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const updateNote = async (
  id: string,
  note: Partial<Note>
): Promise<Note> => {
  const { data } = await api.put(`/notes/${id}`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
