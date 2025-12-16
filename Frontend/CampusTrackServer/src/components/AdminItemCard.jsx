import React from "react";
import "../styles/adminpanel.css";

export default function AdminItemCard({ item, onApprove, onEdit, onDelete }) {
  return (
    <div className="admin-card">
      <div className="card-header">
        <strong>{item.name}</strong>
        <span className="status-tag">{item.status}</span>
      </div>
      <div className="card-body">
        <p><b>Category:</b> {item.category}</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Date:</b> {item.date}</p>
        <p><b>Reporter:</b> {item.reporterName}</p>
      </div>
      <div className="card-actions">
        <button className="btn-approve" onClick={() => onApprove(item.id)}>Approve</button>
        <button className="btn-edit" onClick={() => onEdit(item.id)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
}
