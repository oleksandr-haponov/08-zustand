export interface Note {
  id: string; // ✅ string вместо number
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}
