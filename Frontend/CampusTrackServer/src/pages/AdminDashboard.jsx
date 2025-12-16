import React, { useEffect, useState } from "react";
import { getAdminStats } from "./admin/apiClient";
import AdminNavbar from "./admin/AdminNavbar";
import "./../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getAdminStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNavbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Panel – Overview</h1>
          <button className="back-button" onClick={() => window.location.href = "/dashboard"}>
            ← Back to Dashboard
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-box"><h3>{stats.totalReports ?? 0}</h3><p>Total Reports</p></div>
          <div className="stat-box"><h3>{stats.lostCount ?? 0}</h3><p>Lost Items</p></div>
          <div className="stat-box"><h3>{stats.foundCount ?? 0}</h3><p>Found Items</p></div>
          <div className="stat-box"><h3>{stats.matchedCount ?? 0}</h3><p>Matched Items</p></div>
          <div className="stat-box"><h3>{stats.resolvedCount ?? 0}</h3><p>Resolved Items</p></div>
        </div>
      </div>
    </div>
  );
}
