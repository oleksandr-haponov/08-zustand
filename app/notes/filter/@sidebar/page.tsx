const TAGS = ["All", "Work", "Personal", "Todo", "Idea"];
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => {
        const href =
          tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <a href={href} className={css.menuLink}>
              {tag}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
