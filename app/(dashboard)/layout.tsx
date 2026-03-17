export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>topnav placeholder</nav>
      <div style={{ display: "flex" }}>
        <aside>sidebar placeholder</aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
