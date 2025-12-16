import { useNavigate, Link } from "react-router-dom";
import "./admin.css";

export default function AdminLayout({ children, section }) {
  const navigate = useNavigate();
  return (
    <div className="admin-root">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-header-actions">
          <button className="btn-secondary" onClick={() => navigate("/admin")}>
            Back to Admin Panel
          </button>
          <button className="btn-outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </header>

      <aside className="admin-sidebar">
        <div className="sidebar-title">Sections</div>
        <nav>
          <Link to="/admin/reports" className={section === "reports" ? "active" : ""}>Reported items</Link>
          <Link to="/admin/analytics" className={section === "analytics" ? "active" : ""}>Analytics</Link>
          <Link to="/admin/users" className={section === "users" ? "active" : ""}>Users</Link>
          <Link to="/admin/messages" className={section === "messages" ? "active" : ""}>Messages</Link>
          <Link to="/admin/matches" className={section === "matches" ? "active" : ""}>Matches</Link>
        </nav>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
