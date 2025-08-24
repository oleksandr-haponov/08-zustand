"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "@/lib/api/notes";
import { Note } from "@/types/note";
import styles from "./Notes.module.css";
import NoteCard from "@/components/NoteCard/NoteCard";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useState, useMemo } from "react";

const NOTES_PER_PAGE = 6;

export default function NotesClient() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // состояние поиска и страницы
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // фильтрация заметок по запросу
  const filteredNotes = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // пагинация
  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Could not fetch the list of notes." />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notes</h1>

      <SearchBox
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // при поиске сбрасываем на первую страницу
        }}
      />

      <ul className={styles.list}>
        {paginatedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={(id) => mutation.mutate(id)}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
