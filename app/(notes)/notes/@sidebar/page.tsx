import styles from "./Sidebar.module.css";

const tags = ["All", "Work", "Personal", "Ideas"];

export default function SidebarNotes() {
  return (
    <ul className={styles.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={styles.menuItem}>
          <a
            href={tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`}
            className={styles.menuLink}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
