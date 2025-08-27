// app/notes/New/page.tsx
import { redirect } from "next/navigation";

export default function NewNoteRedirect() {
  redirect("/notes/action/create");
}
