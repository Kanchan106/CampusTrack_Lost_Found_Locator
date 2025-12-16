import React from "react";
import "../styles/adminpanel.css";

export default function FlaggedCard({ post, onReview }) {
  return (
    <div className="admin-card flagged">
      <div className="card-header">
        <strong>{post.title}</strong>
        <span className="status-tag">Flagged</span>
      </div>
      <div className="card-body">
        <p><b>Reason:</b> {post.reason}</p>
        <p><b>Reporter:</b> {post.reporter}</p>
      </div>
      <div className="card-actions">
        <button className="btn-review" onClick={() => onReview(post.id)}>Review</button>
      </div>
    </div>
  );
}
