import React, { useEffect, useState } from "react";
import { getAdminReports } from "./admin/apiClient";
import AdminNavbar from "./admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./../styles/AdminReports.css";

export default function AdminReports() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAdminReports()
      .then((data) => {
        const withDefaults = data.map((item, idx) => ({
          ...item,
          reporterName: item.reporterName ?? null,
          reporterId: item.reporterId ?? null,
          approved: false,
        }));
        setItems(withDefaults);
      })
      .catch(console.error);
  }, []);

  const handleApprove = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, approved: true } : item
      )
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSave = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? editingItem : item
      )
    );
    setEditingItem(null);
  };

  const filteredItems = items.filter((item) => {
    if (filter === "lost") return item.status !== "found";
    if (filter === "found") return item.status === "found";
    return true;
  });

  return (
    <div className="admin-reports">
      <AdminNavbar />

      <div className="reports-header">
        <h1>Admin Reports Overview</h1>
        <div className="header-right">
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <button className="back-button" onClick={() => navigate("/admin")}>
            ← Back
          </button>
        </div>
      </div>

      <div className="reports-content">
        <div className="reports-grid">
          {filteredItems.map((item) => (
            <div
              className={`report-card ${item.status === "found" ? "found-card" : ""}`}
              key={item.id}
            >
              {item.approved && (
                <div className="approved-tick">✔ Approved</div>
              )}

              <div className="report-image-button">
                <button onClick={() => alert("Image viewer not available in demo")}>
                  View Image
                </button>
              </div>

              <div className="report-details">
                <div className={`status-badge ${item.status === "found" ? "badge-found" : "badge-lost"}`}>
                  {item.status === "found" ? "FOUND" : "LOST"}
                </div>
              <p><b>Description:</b> {item.description}</p>
              <p><b>Category:</b> {item.category}</p>
              <p><b>Location:</b> {item.location}</p>
              <p><b>Date:</b> {item.dateReported || "—"}</p>
                {item.reporterName && item.reporterId && (
              <p><b>Reporter:</b> {item.reporterName} ({item.reporterId})</p>
      )}
          </div>

              <div className="report-actions">
                <button className="btn-approve" onClick={() => handleApprove(item.id)}>Approve</button>
                <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingItem && (
        <div className="edit-window">
          <h2>Edit Report</h2>
          <label>
            Title:
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={editingItem.description}
              onChange={(e) =>
                setEditingItem({ ...editingItem, description: e.target.value })
              }
            />
          </label>
          <div className="edit-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditingItem(null)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}