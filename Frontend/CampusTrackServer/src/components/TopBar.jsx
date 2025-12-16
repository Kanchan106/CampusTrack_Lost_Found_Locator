// frontend/src/components/TopBar.jsx
import { Link } from "react-router-dom";

export default function TopBar() {
  const role = localStorage.getItem("role");
  return (
    <div className="top-bar">
      <h2>Dashboard</h2>
      <div className="top-bar-actions">
        <Link className="btn" to="/messages">Messages</Link>
        <Link className="btn" to="/profile">Profile</Link>
        {role === "ADMIN" && <Link className="btn btn-admin" to="/admin">Admin Panel</Link>}
      </div>
    </div>
  );
}
