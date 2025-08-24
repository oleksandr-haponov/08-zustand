"use client";

import styles from "./TagsMenu.module.css";

const tags = ["All", "Work", "Personal", "Ideas"];

export default function TagsMenu() {
  return (
    <div className={styles.menuContainer}>
      <button className={styles.menuButton}>Notes ▾</button>
      <ul className={styles.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={styles.menuItem}>
            <a
              href={
                tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`
              }
              className={styles.menuLink}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
