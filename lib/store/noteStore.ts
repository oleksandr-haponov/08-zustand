import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft = { title: "", content: "", tag: "Todo" as const };
type Draft = typeof initialDraft;

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
    { name: "notehub-draft" },
  ),
);
