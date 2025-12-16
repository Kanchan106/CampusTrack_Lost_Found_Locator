import React from "react";
import "../../styles/AdminNavbar.css"; 

export default function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <a href="/dashboard">🏠 Dashboard</a>
      <a href="/admin/reports">📋 Reports</a>
      <a href="/admin/analytics">📊 Analytics</a>
      <a href="/admin/users">👥 Users</a>
      <a href="/admin/messages">💬 Messages</a>
      <a href="/admin/matches">🔗 Matches</a>
    </nav>
  );
}
