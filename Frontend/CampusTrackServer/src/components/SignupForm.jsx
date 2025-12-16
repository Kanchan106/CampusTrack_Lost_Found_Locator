// src/components/SignupForm.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import AuthTabs from "./AuthTabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css"; // ✅ Import your signup-specific CSS

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          contactNumber,
          email,
          password,
          role,
          department,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // ✅ Success popup
        toast.success(data.message || "Registration successful!");
      } else {
        // ❌ Error popup
        toast.error(data.message || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <AuthTabs />
      <h3 className="form-title">Register</h3>
      <form onSubmit={handleSignup}>
        <div className="form-row">
          <div className="col form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="col form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="your.email@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="col form-group">
            <label>Select your role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="col form-group">
            <label>Department</label>
            <input
              type="text"
              placeholder="e.g., Computer Science"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="primary">Register</button>
      </form>

      {/* ✅ Toast container here */}
      <ToastContainer position="top-right" autoClose={3000} />
    
    </AuthLayout>
  );
}
