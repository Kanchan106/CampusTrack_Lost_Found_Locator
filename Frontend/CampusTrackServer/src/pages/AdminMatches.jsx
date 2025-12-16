import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/AdminMatches.css";

const AdminMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/matches")
      .then((res) => {
        setMatches(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setError("Failed to load matches.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-matches-container">
      <div className="title-bar">
        <h2>Match Suggestions</h2>
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      <div className="spacer" />

      <div className="table-wrapper">
        <table className="matches-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lost Item</th>
              <th>Found Item</th>
              <th>Confidence</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.lostItemName || "—"}</td>
                <td>{m.foundItemName || "—"}</td>
                <td>{(m.confidence * 100).toFixed(1)}%</td>
                <td>
                  <span className={`badge ${m.status?.toLowerCase() || "unknown"}`}>
                    {m.status || "Unknown"}
                  </span>
                </td>
                <td>{m.notes || "—"}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-confirm">Confirm</button>
                    <button className="btn-reject">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMatches;