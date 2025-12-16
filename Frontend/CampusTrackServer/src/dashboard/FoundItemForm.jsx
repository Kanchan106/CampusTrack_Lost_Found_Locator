import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReportLostForm from "./LostItemForm";
import "../styles/Forms.css";
import ImageUpload from "../components/ImageUpload";

export default function ReportFoundForm() {
  const [showLostForm, setShowLostForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
    location: "",
    file: null,
  });

  const reporterId = localStorage.getItem("userId"); // ✅ use reporterId
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reporterId) {
      toast.error("User not logged in");
      return;
    }

    let imageUrl = null;

    // Step 1: Upload image
    if (formData.file) {
      const imageForm = new FormData();
      imageForm.append("file", formData.file);

      try {
        const uploadRes = await fetch("http://localhost:8081/api/upload/image", {
          method: "POST",
          body: imageForm,
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.url) {
          imageUrl = uploadData.url;
        } else {
          toast.error("Image upload failed");
          return;
        }
      } catch {
        toast.error("Image upload error");
        return;
      }
    }

    // Step 2: Submit item
    const itemPayload = {
      reporterId, // ✅ correct field
      status: "FOUND",
      name: formData.name,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      location: formData.location,
      imageUrl,
    };

    try {
      const res = await fetch("http://localhost:8081/api/items/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemPayload),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Found item reported successfully!");
        navigate("/items");
      } else {
        toast.error(data.message || "Failed to report found item");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (showLostForm) return <ReportLostForm />;

  return (
    <div className="form-wrapper">
      <div className="toggle-switch">
        <button onClick={() => setShowLostForm(true)}>Report Lost</button>
        <button className="active">Report Found</button>
      </div>

      <div className="form-box found-theme">
        <h3>Report Found Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input name="name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="5" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Accessories">Accessories</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image</label>
            <ImageUpload
              onFileSelect={(file) =>
                setFormData((prev) => ({ ...prev, file }))
              }
            />
          </div>

          <button type="submit" className="primary">Submit</button>
        </form>

        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
