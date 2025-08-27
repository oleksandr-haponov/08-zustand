import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type Draft = {
  title: string;
  content: string;
  tag: Tag;
};

export const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: Draft;
  setDraft: (patch: Partial<Draft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-draft", // localStorage key
    },
  ),
);
