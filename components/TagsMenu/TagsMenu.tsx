"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./TagsMenu.module.css";

const tags = ["All", "Work", "Personal", "Ideas"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // закрытие при клике вне меню и по Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={styles.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={styles.menuItem}>
              <a
                href={
                  tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`
                }
                className={styles.menuLink}
                onClick={closeMenu}
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
