import React from "react";
import "../styles/adminpanel.css";

export default function BackButton({ to, label }) {
  return (
    <button className="back-button" onClick={() => window.location.href = to}>
      ← {label}
    </button>
  );
}
