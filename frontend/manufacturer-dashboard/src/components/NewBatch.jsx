import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate=useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <div className="bg-green-200 w-full p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">ASHVINI - MANUFACTURER</h1>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">USER_NAME</span>
          <span className="text-gray-600">PRODUCER_ID</span>
        </div>
      </div>

      {/* Back to Dashboard */}
      <div className="bg-red-200 w-full text-center py-2 text-sm font-medium mt-2 cursor-pointer">
       <button className="dashboard" onClick={()=>navigate('/manufacturer')}> ← Back to Dashboard</button>
      </div>

      {/* Form Section */}      
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={generateBatchId}
            className="bg-gray-300 px-4 py-2 rounded shadow hover:bg-gray-400 transition"
          >
            Click to Generate Batch ID
          </button>
          <p className="text-gray-600">
            {batchId ? `Your Batch ID: ${batchId}` : "Your Batch ID will show here"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="herbName"
            placeholder="Enter Herb Name"
            value={formData.herbName}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="farmerId"
            placeholder="Enter Farmer ID"
            value={formData.farmerId}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="moistureContent"
            placeholder="Enter Moisture Content"
            value={formData.moistureContent}
            onChange={handleChange}
            className="p-3 border rounded"
          />

          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="date"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="storageConditions"
            placeholder="Enter Storage Conditions"
            value={formData.storageConditions}
            onChange={handleChange}
            className="p-3 border rounded"
          />

          {/* File Upload */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Upload Process Report</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border rounded"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition"
            >
              Click to Send for Testing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBatch;
