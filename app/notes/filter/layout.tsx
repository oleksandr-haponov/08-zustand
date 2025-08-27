import type { ReactNode } from "react";
import css from "./layout.module.css";

export default function FilterLayout({
  children,
  sidebar, // <— имя слота должно совпадать с @sidebar
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
