// app/notes/page.tsx
import { redirect } from "next/navigation";
export default function NotesIndexRedirect() {
  redirect("/notes/filter/All");
}
