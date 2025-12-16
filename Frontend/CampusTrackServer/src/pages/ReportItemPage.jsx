// src/pages/ReportItemPage.jsx
import React, { useState } from "react";
import ReportLostForm from "../dashboard/LostItemForm";
import ReportFoundForm from "../dashboard/FoundItemForm";
import "../styles/Forms.css";

export default function ReportItemPage() {
  const [activeTab, setActiveTab] = useState("lost");

  return (
    <div className="form-wrapper">
      <div className="toggle-switch">
        <button className={activeTab === "lost" ? "active" : ""} onClick={() => setActiveTab("lost")}>
          Report Lost
        </button>
        <button className={activeTab === "found" ? "active" : ""} onClick={() => setActiveTab("found")}>
          Report Found
        </button>
      </div>

      {activeTab === "lost" ? <ReportLostForm /> : <ReportFoundForm />}
    </div>
  );
}