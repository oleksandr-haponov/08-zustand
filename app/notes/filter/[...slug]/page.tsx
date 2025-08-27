import NotesClient from "./Notes.client";

export default async function NotesPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const tag = params.slug?.[0] === "All" ? undefined : params.slug?.[0];
  return <NotesClient tag={tag} />;
}
