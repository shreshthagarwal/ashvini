import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Manufacturer.css"; 

const Manufacturer = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [companyName, setCompanyName] = useState("Fetching company...");
  const [dashboardData, setDashboardData] = useState({
    batchesSubmitted: 34,
    reportsReceived: 30,
    pendingValidation: 4,
    certificatesApproved: 30,
  });

  const navigate = useNavigate();

  // ✅ Fetch location from GPS
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const coords = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = coords.coords;
        const response = await axios.get(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.791eaeb8972e4453a4837fde74bd1c59&lat=${latitude}&lon=${longitude}&format=json`
        );
        const address = `${response.data.address.city}, ${response.data.address.country}`;
        setLocation(
          `GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E | ${address}`
        );
      } catch (err) {
        setLocation("Could not fetch location.");
        console.error("Error fetching location:", err);
      }
    };
    fetchLocation();
  }, []);

  // ✅ Fetch company name
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/company");
        // Expected response: { companyName: "Green Leaf Pvt Ltd" }
        setCompanyName(res.data.companyName || "Company Not Found");
      } catch (err) {
        console.error("Error fetching company name:", err);
        setCompanyName("Company Not Available");
      }
    };
    fetchCompanyName();
  }, []);

  return (
    <>
    <div className="manu">
    <div className="manufacturer-container">
      {/* Header */}
      <div className="header">
        <h1>ASHVINI - MANUFACTURER</h1>
        <div className="user-info">
          <span className="username">USER_NAME</span>
          <span className="producer-id">PRODUCER_ID</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications">
        Notification/Alerts: Certificate for Batch #M102 approved | Batch #M109
        sent for testing
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <h2>Welcome, User_Name!</h2>
        <p>
          Welcome to your produce dashboard — every harvest recorded, every batch
          valued.
        </p>

        <div className="stats-grid">
          <button>
            <p className="stat-number">{dashboardData.batchesSubmitted}</p>
            <p>Batches Submitted</p>
          </button>

          <button>
            <p className="stat-number">{dashboardData.reportsReceived}</p>
            <p>Reports Received</p>
          </button>

          <button>
            <p className="stat-number">{dashboardData.pendingValidation}</p>
            <p>Pending Validation</p>
          </button>

          <button>
            <p className="stat-number">{dashboardData.certificatesApproved}</p>
            <p>Certificates Approved</p>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button onClick={() => navigate("/NewBatch")}>
          Submit New Batch for Testing
        </button>
        <button onClick={() => navigate("/BatchHistory")}>
          Batch Status History & QR Generation
        </button>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>
          Company Name: <strong>{companyName}</strong> | Location: {location}
        </p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Manufacturer;
