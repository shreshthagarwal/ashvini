import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lab.css";

function Lab() {
  // Notifications + Status summary
  const [notifications, setNotifications] = useState([]);
  const [statusData, setStatusData] = useState({
    pendingTests: 0,
    validatedBatches: 0,
    failedTests: 0,
  });

  // User Info
  const [user, setUser] = useState({ username: "", laboratoryId: "" });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load Dashboard Data
  useEffect(() => {
    fetchDashboardData();
    fetchUserData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Notifications
      const notificationsResponse = await axios.get("/api/notifications");
      setNotifications(notificationsResponse.data.notifications || []);

      // Status
      const statusResponse = await axios.get("/api/lab-status");
      setStatusData(
        statusResponse.data.status || {
          pendingTests: 0,
          validatedBatches: 0,
          failedTests: 0,
        }
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setNotifications(["Failed to load notifications."]);
      setStatusData({
        pendingTests: 0,
        validatedBatches: 0,
        failedTests: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Data (from backend API)
  const fetchUserData = async () => {
    try {
      const res = await axios.get("/api/user"); // API se aayega { username, laboratoryId }
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser({ username: "Guest", laboratoryId: "N/A" });
    }
  };

  // Navigation handlers
  const handleSelectBatch = () => {
    navigate("/labscreen");
  };

  const handleUploadResults = () => {
    navigate("/UploadTestResults");
  };

  const handleAttachCertificate = () => {
    navigate("/CertificateTable");
  };

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header">
  <div className="logo">
    <img src="./src/assets/ashvini.svg" alt="Ashvini Lab Logo" />
    <h1>ASHVINI-LABORATORY</h1>
  </div>

  <div className="user">
    <p>{user.username}</p>
    <p>{user.laboratoryId}</p>
  </div>
</div>

      {/* Notifications */}
      <div className="notifications-container">
        <p>New Notifications/Alerts:</p>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((note, index) => (
            <span key={index} className="notification-item">
              {note}
            </span>
          ))
        ) : (
          <span>No new notifications.</span>
        )}
      </div>

      {/* Quick Status Summary */}
      <div className="status-summary">
        <h3>Quick Analytics / Status Summary</h3>
        <p>Batches Pending Testing: {statusData?.pendingTests ?? 0}</p>
        <p>Validated Batches: {statusData?.validatedBatches ?? 0}</p>
        <p>Failed Quality Tests: {statusData?.failedTests ?? 0}</p>
      </div>

      {/* Action Tabs */}
      <div className="action-tabs">
        <div className="tab" onClick={handleSelectBatch}>
          <p>Select Batch For Testing</p>
        </div>
        <div className="tab" onClick={handleUploadResults}>
          <p>Upload Test Results</p>
        </div>
        <div className="tab" onClick={handleAttachCertificate}>
          <p>Attach Certificate / Validation Status</p>
        </div>
      </div>
    </div>
  );
}

export default Lab;
