"use client";

import { useState } from "react";
import styles from "./TagsMenu.module.css";

const tags = ["All", "Work", "Personal", "Ideas"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.menuContainer}>
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
                onClick={() => closeMenu()}
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
