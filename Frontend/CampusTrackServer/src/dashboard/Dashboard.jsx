// src/components/dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({ lost: 0, found: 0, matched: 0 });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const fullName = localStorage.getItem("fullName") || "User";

  useEffect(() => {
    if (!userId) {
      toast.error("No user ID found. Please log in again.");
      navigate("/login");
      return;
    }

    // ✅ Correct backend endpoint
    fetch(`http://localhost:8081/api/dashboard/counts/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Stats fetch failed");
        return res.json();
      })
      .then(data =>
        setStats({
          lost: data.lostCount ?? 0,
          found: data.foundCount ?? 0,
          matched: data.matchedCount ?? 0
        })
      )
      .catch(() => toast.error("Failed to load stats"));
  }, [userId, navigate]);

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <span onClick={() => navigate("/items")}>Item Listings</span>
        <span onClick={() => navigate("/matches")}>My Matches</span>
        <span onClick={() => navigate("/messages")}>Messages</span>
        <span onClick={() => navigate("/profile")}>Profile</span>
        <span
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </span>
      </nav>

      <div className="dashboard-box">
        <div className="greeting">
          <h2>Hello, {fullName}!</h2>
          <p>Welcome to your dashboard</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card red">
            <h4>Lost Items Reported</h4>
            <p>{stats.lost}</p>
          </div>
          <div className="stat-card green">
            <h4>Found Items Reported</h4>
            <p>{stats.found}</p>
          </div>
          <div className="stat-card blue">
            <h4>Total Matched Items</h4>
            <p>{stats.matched}</p>
          </div>
        </div>

        <div className="action-grid">
          <div className="action-card red">
            <p>Let us know what you've lost and we'll help you find it</p>
            <button onClick={() => navigate("/report-lost")}>
              Report Lost Item
            </button>
          </div>
          <div className="action-card green">
            <p>Found something? Help reunite it with its owner</p>
            <button onClick={() => navigate("/report-found")}>
              Report Found Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}