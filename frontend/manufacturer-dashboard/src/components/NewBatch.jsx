import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewBatch.css";

const NewBatch = () => {
  const [batchId, setBatchId] = useState("");
  const [formData, setFormData] = useState({
    herbName: "",
    farmerId: "",
    quantity: "",
    moistureContent: "",
    harvestDate: "",
    submissionDate: "",
    storageConditions: "",
    processReport: null,
  });

  const navigate = useNavigate();

  // Generate random Batch ID
  const generateBatchId = () => {
    const id = "BATCH-" + Math.floor(Math.random() * 100000);
    setBatchId(id);
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, processReport: e.target.files[0] });
  };

  // Submit form (API call commented out)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    /*
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    try {
      const res = await axios.post("https://api.example.com/batches", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Batch submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error submitting batch:", err);
      alert("Error submitting batch.");
    }
    */
    alert("Batch submitted for testing (mock).");
  };
  const fetchUserData = async () => {
    try {
      const res = await axios.get("/api/user"); 
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser({ username: "Guest", producerId: "N/A" });
    }
  };
const [user, setUser] = useState({ username: "", producerId: "" });
  return (
    <div className="newbatch-container">
      {/* Header */}
      <div className="header">
            <img src="./src/assets/ashvini.svg" alt="Ashvini Lab Logo" />

        <h1>ASHVINI - MANUFACTURER</h1>

        <div className="user">
    <p>{user.username}</p>
    <p>{user.producerId}</p>
  </div>
</div>

      {/* Back to Dashboard */}
      <div className="back-bar">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Form Section */}
      <div className="form-wrapper">
        <div className="batch-header">
          <button className="generate-btn" onClick={generateBatchId}>
            Click to Generate Batch ID
          </button>
          <p className="batch-id">
            {batchId ? `Your Batch ID: ${batchId}` : "Your Batch ID will show here"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="batch-form">
          <p>Herb Name:</p>
          <input
            type="text"
            name="herbName"
            placeholder="Enter Herb Name"
            value={formData.herbName}
            onChange={handleChange}
            required
          />
          <p>Farmer Id:</p>
          <input
            type="text"
            name="farmerId"
            placeholder="Enter Farmer ID"
            value={formData.farmerId}
            onChange={handleChange}
            required
          />
            <p>Quantity:</p>
          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
<p>Moisture Content:</p>
          <input
            type="text"
            name="moistureContent"
            placeholder="Enter Moisture Content"
            value={formData.moistureContent}
            onChange={handleChange}
          />
<p>Harvest Date:</p>
          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            placeholder="Harvest Date"
            required
          />
<p>Submission Date:</p>
          <input
            type="date"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
            required
          />
<p>Storage Conditions:</p>
          <input
            type="text"
            name="storageConditions"
            placeholder="Enter Storage Conditions"
            value={formData.storageConditions}
            onChange={handleChange}
          />

          {/* File Upload */}
          <div className="file-upload">
            <p>Upload Process Report</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button type="submit" className="submit-btn">
              Click to Send for Testing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBatch;
