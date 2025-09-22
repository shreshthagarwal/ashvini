import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Lab(props) {
  // State for notifications and status summary data
  const [notifications, setNotifications] = useState([]);
  const [statusData, setStatusData] = useState({
    pendingTests: 0,
    validatedBatches: 0,
    failedTests: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch notifications from API endpoint
      const notificationsResponse = await axios.get('/api/notifications');
      setNotifications(notificationsResponse.data.notifications || []);

      // Fetch status summary data
      const statusResponse = await axios.get('/api/lab-status');
      setStatusData(statusResponse.data.status || {
        pendingTests: 0,
        validatedBatches: 0,
        failedTests: 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setNotifications(['Failed to load notifications.']);
      setStatusData({
        pendingTests: 0,
        validatedBatches: 0,
        failedTests: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBatch = () => {
    navigate("/labscreen");
  };

  const handleUploadResults = async () => {
    navigate("/UploadTestResults");
    
   
  };

  const handleAttachCertificate = async () => {
    
   navigate('/CertificateTable')
  };

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  // Defensive rendering: just in case statusData is undefined (extra safety)
  if (!statusData) {
    return <div>Loading status data...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header">
        <div className="portal-name">
          <div className="logo">
            <img src="path/to/logo.png" alt="Ashvini Lab Logo" />
            <h1>ASHVINI-LABORATORY</h1>
          </div>
        </div>
        <div className="user">
          <p>{props.username}</p>
          <p>{props.laboratoryId}</p>
        </div>
      </div>

      <div className="notifications-container">
        <p>New Notifications/Alerts:</p>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((note, index) => (
            <span key={index} className="notification-item">{note}</span>
          ))
        ) : (
          <span>No new notifications.</span>
        )}
      </div>

      {/* Quick Status Summary Section */}
      <div className="status-summary">
        <h3>Quick Analytics / Status Summary</h3>
        <p>Batches Pending Testing: {statusData?.pendingTests ?? 0}</p>
        <p>Validated Batches: {statusData?.validatedBatches ?? 0}</p>
        <p>Failed Quality Tests: {statusData?.failedTests ?? 0}</p>
      </div>

      {/* Action Buttons/Tabs Section */}
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
