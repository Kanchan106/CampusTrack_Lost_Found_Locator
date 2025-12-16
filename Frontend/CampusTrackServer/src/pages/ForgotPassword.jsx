import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset link sent to your email!");
      } else {
        toast.error(data.message || "User not found");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <h3 className="form-title">Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your registered email"
               value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="primary">Send Reset Link</button>
      </form>
    </AuthLayout>
  );
}