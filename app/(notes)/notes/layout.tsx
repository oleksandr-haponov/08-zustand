export default function NotesLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          borderRight: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        {sidebar}
      </aside>

      {/* Контент */}
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>

      {/* Модальное окно */}
      {modal}
    </div>
  );
}
