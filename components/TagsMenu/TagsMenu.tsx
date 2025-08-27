"use client";

import { useEffect, useRef, useState } from "react";
import css from "./TagsMenu.module.css";

const TAGS = ["All", "Work", "Personal", "Todo", "Idea"];

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Закрытие по клику вне и по Esc
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={css.menuContainer} ref={rootRef}>
      <button
        type="button"
        className={css.menuButton}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList} role="menu" aria-label="Filter by tag">
          {TAGS.map((tag) => {
            const href =
              tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
            return (
              <li key={tag} className={css.menuItem} role="none">
                <a
                  href={href}
                  className={css.menuLink}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      (e.currentTarget as HTMLAnchorElement).click();
                    }
                  }}
                >
                  {tag}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
