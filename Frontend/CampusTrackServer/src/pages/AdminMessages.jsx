import React, { useEffect, useState } from "react";
import { getAllMessages } from "./admin/apiClient";
import { useNavigate } from "react-router-dom";
import "./../styles/AdminMessages.css";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [userFilter, setUserFilter] = useState(""); // ✅ filter by serial/user id
  const navigate = useNavigate();

  useEffect(() => {
    getAllMessages().then(setMessages).catch(console.error);
  }, []);

  const filteredMessages = messages.filter((m, index) => {
    const serial = String(index + 1); // ✅ serial number as user id
    return !userFilter || serial.includes(userFilter.trim());
  });

  return (
    <div className="admin-messages">
      {/* 🔝 Topbar with title, search bar, and back button */}
      <div className="topbar">
        <h2>Admin Panel – Messages</h2>
        <input
          className="filter-input"
          placeholder="Search User (serial)…"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <button className="back-btn" onClick={() => navigate("/admin")}>
          ⬅ Back
        </button>
      </div>

      {/* 📋 Scrollable Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th> {/* ✅ serial number */}
              <th>Item</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((m, index) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{index + 1}</td> {/* ✅ serial shown as User ID */}
                <td>{m.itemName}</td>
                <td>{m.message}</td>
                <td>{new Date(m.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}