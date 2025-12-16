import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const reporterId = localStorage.getItem("reporterId");
  navigate(`/my-matches/${reporterId}`);

  return (
    <nav className="navbar">
      <span onClick={() => navigate("/items")}>Item Listings</span>
      <span onClick={() => navigate(`/my-matches/${reporterId}`)}>My Matches</span>
      <span onClick={() => navigate("/messages")}>Messages</span>
      <span onClick={() => navigate("/profile")}>Profile</span>
      <span
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </span>
    </nav>
  );
}
