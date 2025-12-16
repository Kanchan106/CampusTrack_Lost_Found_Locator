import React, { useEffect, useState } from "react";
import { getAllUsers } from "./admin/apiClient";
import { useNavigate } from "react-router-dom";
import "./../styles/AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  const filteredUsers = users.filter((u) => {
    const query = search.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.department.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query) ||
      String(u.id).includes(query)
    );
  });

  return (
    <div className="admin-users">
      {/* Title bar */}
      <div className="users-header">
        <h1>Admin Panel – Users</h1>
        <button className="back-button" onClick={() => navigate("/admin")}>
          ← Back
        </button>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search the user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Table container */}
      <div className="users-content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.department}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}