import React, { useState } from "react";

export default function ImageUpload({ onFileSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="image-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
}