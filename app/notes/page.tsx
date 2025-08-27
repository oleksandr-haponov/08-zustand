import { redirect } from "next/navigation";

// /notes больше не используется в HW-07.
// Редиректим на список с фильтром "All".
export default function NotesIndexRedirect() {
  redirect("/notes/filter/All");
}
