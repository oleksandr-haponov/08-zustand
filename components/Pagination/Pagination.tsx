"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  pageCount: number; // общее число страниц (>= 1)
  currentPage: number; // 1-based
  onPageChange: (page: number) => void; // 1-based
  isFetchingPage?: boolean;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
  isFetchingPage,
}: PaginationProps) {
  // не показываем пагинацию, если страниц одна или меньше
  if (!pageCount || pageCount <= 1) return null;

  // приводим currentPage в допустимые границы
  const safeCurrent = Math.min(Math.max(1, currentPage || 1), pageCount);

  return (
    <nav aria-label="Pagination">
      {isFetchingPage && (
        <span
          style={{ display: "block", textAlign: "center", marginBottom: 8 }}
        >
          Loading...
        </span>
      )}

      <ReactPaginate
        pageCount={pageCount}
        forcePage={safeCurrent - 1} // ReactPaginate — 0-based
        onPageChange={(sel) => onPageChange(sel.selected + 1)}
        previousLabel="<"
        nextLabel=">"
        breakLabel="…"
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        // классы контейнера/ссылок/активации/disabled
        containerClassName={css.pagination}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </nav>
  );
}
