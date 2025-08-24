import api from "./axios";
import { Note } from "@/types/note";

const handleError = (error: unknown, action: string) => {
  let userMessage = "";

  switch (action) {
    case "fetch notes":
      userMessage = "Не удалось загрузить список заметок.";
      break;
    case "fetch note":
      userMessage = "Не удалось загрузить заметку.";
      break;
    case "create note":
      userMessage = "Не удалось создать заметку.";
      break;
    case "update note":
      userMessage = "Не удалось обновить заметку.";
      break;
    case "delete note":
      userMessage = "Не удалось удалить заметку.";
      break;
    default:
      userMessage = "Произошла ошибка.";
  }

  if (error instanceof Error) {
    throw new Error(`${userMessage} Техническая информация: ${error.message}`);
  }

  throw new Error(userMessage);
};

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const { data } = await api.get("/notes");
    return data;
  } catch (error) {
    handleError(error, "fetch notes");
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const { data } = await api.get(`/notes/${id}`);
    return data;
  } catch (error) {
    handleError(error, "fetch note");
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt">
): Promise<Note> => {
  try {
    const { data } = await api.post("/notes", note);
    return data;
  } catch (error) {
    handleError(error, "create note");
  }
};

export const updateNote = async (
  id: string,
  note: Partial<Note>
): Promise<Note> => {
  try {
    const { data } = await api.put(`/notes/${id}`, note);
    return data;
  } catch (error) {
    handleError(error, "update note");
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const { data } = await api.delete(`/notes/${id}`);
    return data;
  } catch (error) {
    handleError(error, "delete note");
  }
};
