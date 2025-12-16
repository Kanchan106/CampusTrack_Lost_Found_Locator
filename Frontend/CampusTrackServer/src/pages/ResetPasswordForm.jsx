import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8081/api/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset successful! Please login.");
        navigate("/login");
      } else {
        toast.error(data.message || "Invalid or expired token");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <h3 className="form-title">Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Enter new password"
               value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="primary">Reset Password</button>
      </form>
    </AuthLayout>
  );
}