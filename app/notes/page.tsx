import { redirect } from "next/navigation";
export default function NotesIndexRedirect() {
  redirect("/notes/filter/All");
}
// redirect не возвращает управление, поэтому можно не писать return null
