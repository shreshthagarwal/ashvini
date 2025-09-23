import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate();

  // Hardcoded data
  const [dashboardData, setDashboardData] = useState({
    pendingBatches: 5,
    validatedBatches: 17,
    failedTests: 3,
    averageProcessingTime: '2 Hrs',
    lastVisited: '20th Sept, 2025',
    username: 'User_Name',
    labShift: '9am-5pm',
  });

  // Uncomment below to use API instead of hardcoded data
  /*
  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await fetch('/api/lab-dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }

    fetchDashboardStats();
  }, []);
  */

  const handleProceed = () => {
    navigate('/lab');
  };

  return (
    <div className="dashboard-screen">
      <header>
        <div className="logo">
          <img height="40px"src="./src/assets/ashvini.svg"></img>
<h2>ASHVINI-LABORATORY</h2>
        </div>
        
        <div className="user-info">
          <p>{dashboardData.username}</p>
          <p>{dashboardData.laboratoryId}</p>
        </div>
      </header>

      <div className="notifications-bar">
        <p>New Notifications/Alerts: • Batch #A12 awaiting test results • Certificates for batch #B05 rejected • 3 new batches assigned to you</p>
      </div>

      <div className="greeting-row">
        <div>
          <p><strong>Good Morning {dashboardData.username}</strong></p>
          <p>Last Visited: {dashboardData.lastVisited}</p>
        </div>
        <div>
          <p>{dashboardData.username}</p>
          <p>Lab Tester</p>
          <p>Shift: {dashboardData.labShift}</p>
          <p>User Settings ⚙️</p>
        </div>
      </div>

      <div className="status-cards">
        <div>
          <p>No of Pending Batches</p>
          <h3>{dashboardData.pendingBatches}</h3>
        </div>
        <div>
          <p>No of Validated Batches</p>
          <h3>{dashboardData.validatedBatches}</h3>
        </div>
        <div>
          <p>No of Failed Tests</p>
          <h3>{dashboardData.failedTests}</h3>
        </div>
        <div>
          <p>Average Processing Time</p>
          <h3>{dashboardData.averageProcessingTime}</h3>
        </div>
      </div>

      <button onClick={handleProceed}>
        Proceed to Testing Tasks
      </button>
    </div>
  );
}

export default Dashboard;
