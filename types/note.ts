export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string; // <— добавили
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
