// src/components/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch profile from backend
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:8081/api/profile?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Profile fetch failed:", err));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save profile to backend
  const handleSave = () => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8081/api/profile?userId=${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message || "Profile updated!");
        setIsEditing(false);
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="profile-page">
      {/* ✅ Fixed top bar */}
      <div className="top-bar">
        <h2>Profile</h2>
        <button
          className="dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
           Dashboard
        </button>
      </div>

      {/* ✅ Scrollable content window */}
      <div className="profile-window">
        <div className="profile-section">
          <h3>Personal Information</h3>
          {isEditing ? (
            <>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={user.fullName || ""}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
              />
              <label>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={user.contactNumber || ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <p><strong>Full Name:</strong> {user.fullName || "N/A"}</p>
              <p><strong>Email:</strong> {user.email || "N/A"}</p>
              <p><strong>Contact Number:</strong> {user.contactNumber || "N/A"}</p>
            </>
          )}
        </div>

        <div className="profile-section">
          <h3>Academic / Role Details</h3>
          {isEditing ? (
            <>
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={user.role || ""}
                onChange={handleChange}
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={user.department || ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <p><strong>Role:</strong> {user.role || "N/A"}</p>
              <p><strong>Department:</strong> {user.department || "N/A"}</p>
            </>
          )}
        </div>

        <div className="profile-section">
          <h3>System Info</h3>
          <p><strong>User ID:</strong> {user.id || user.userId || "N/A"}</p>
        </div>

        {/* ✅ Edit / Save buttons */}
        <div className="profile-actions">
          {isEditing ? (
            <button className="save-button" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      {/* ✅ Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
