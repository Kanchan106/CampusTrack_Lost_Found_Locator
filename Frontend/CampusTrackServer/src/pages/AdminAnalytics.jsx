import React, { useEffect, useState } from "react";
import { getAdminStats, exportCsv, exportPdf } from "./admin/apiClient";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./../styles/AdminAnalytics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminAnalytics() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAdminStats().then(setStats).catch(console.error);
  }, []);

  const data = {
    labels: ["Total Reports", "Lost Items", "Found Items", "Matched Items", "Resolved Items"],
    datasets: [
      {
        label: "Count",
        data: [
          stats.totalReports ?? 0,
          stats.lostCount ?? 0,
          stats.foundCount ?? 0,
          stats.matchedCount ?? 0,
          stats.resolvedCount ?? 0,
        ],
        backgroundColor: [
          "#3f51b5", "#f44336", "#4caf50", "#ff9800", "#9c27b0"
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Admin Analytics Overview" },
    },
  };

  return (
    <div className="admin-analytics">
      <div className="analytics-box">
        {/* Inline title + back button */}
        <div className="analytics-header-inline">
          <h1>Admin Panel – Analytics</h1>
          <button className="back-button" onClick={() => navigate("/admin")}>← Back</button>
        </div>

        {/* Horizontal stat boxes */}
        <div className="analytics-grid">
          <div className="stat-box total"><h3>{stats.totalReports ?? 0}</h3><p>Total Reports</p></div>
          <div className="stat-box lost"><h3>{stats.lostCount ?? 0}</h3><p>Lost Items</p></div>
          <div className="stat-box found"><h3>{stats.foundCount ?? 0}</h3><p>Found Items</p></div>
          <div className="stat-box matched"><h3>{stats.matchedCount ?? 0}</h3><p>Matched Items</p></div>
          <div className="stat-box resolved"><h3>{stats.resolvedCount ?? 0}</h3><p>Resolved Items</p></div>
        </div>

        {/* Graph */}
        <div className="analytics-graph">
          <Bar data={data} options={options} />
        </div>

        {/* Export buttons */}
        <div className="export-buttons">
          <button onClick={exportCsv}>Export CSV</button>
          <button onClick={exportPdf}>Export PDF</button>
        </div>
      </div>
    </div>
  );
}