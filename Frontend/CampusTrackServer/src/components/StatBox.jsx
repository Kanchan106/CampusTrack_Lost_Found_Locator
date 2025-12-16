import React from "react";
import "../styles/adminpanel.css";

export default function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}
