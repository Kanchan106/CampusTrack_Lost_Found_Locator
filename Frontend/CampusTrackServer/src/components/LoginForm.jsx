import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css"; 
import AuthLayout from "./AuthLayout";
import AuthTabs from "./AuthTabs";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Login successful!");
        localStorage.setItem("reporterId", data.id || data.userId);
        localStorage.setItem("userId", data.id || data.userId);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data));

        if (data.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <AuthTabs />
      <h3 className="form-title">Login</h3>
      <form onSubmit={handleLogin}>
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary">Login</button>
        <p style={{ marginTop: "10px", fontSize: "13px" }}>
          <a href="/forgot-password" style={{ color: "#0b3b8c" }}>Forgot Password?</a>
        </p>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </AuthLayout>
  );
}
