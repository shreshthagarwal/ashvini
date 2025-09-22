import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Manufacturer = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [dashboardData, setDashboardData] = useState({
    batchesSubmitted: 34,
    reportsReceived: 30,
    pendingValidation: 4,
    certificatesApproved: 30,
  });
  const navigate=useNavigate();
  // ✅ LocationIQ API (active)
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

  // ✅ API fetching for manufacturer data (commented out, fallback is hardcoded)
 

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

      {/* Notifications */}
      <div className="bg-red-200 w-full text-center py-2 text-sm font-medium mt-2">
        Notification/Alerts: Certificate for Batch #M102 approved | Batch #M109
        sent for testing
      </div>

      {/* Dashboard Welcome */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6 w-full max-w-4xl text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Welcome, User_Name!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Welcome to your produce dashboard — every harvest recorded, every batch
          valued.
        </p>

        {/* Dashboard stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 transition">
            <p className="text-2xl font-bold">{dashboardData.batchesSubmitted}</p>
            <p className="text-sm">Batches Submitted</p>
          </button>

          <button className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 transition">
            <p className="text-2xl font-bold">{dashboardData.reportsReceived}</p>
            <p className="text-sm">Reports Received</p>
          </button>

          <button className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 transition">
            <p className="text-2xl font-bold">{dashboardData.pendingValidation}</p>
            <p className="text-sm">Pending Validation</p>
          </button>

          <button className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 transition">
            <p className="text-2xl font-bold">
              {dashboardData.certificatesApproved}
            </p>
            <p className="text-sm">Certificates Approved</p>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-6 mt-6">
        <button
          onClick={() => navigate('/NewBatch')}
          className="bg-green-300 px-6 py-4 rounded-xl shadow hover:bg-green-400 transition"
        >
          Submit New Batch for Testing
        </button>
        <button
          onClick={() => navigate('/BatchHistory')}
          className="bg-purple-300 px-6 py-4 rounded-xl shadow hover:bg-purple-400 transition"
        >
          Batch Status History & QR Generation
        </button>
      </div>

      {/* Footer */}
      <div className="bg-gray-300 w-full p-4 mt-10 text-center text-sm">
        <p>
          Company Name: <span className="font-semibold">Green Leaf Pvt Ltd</span>{" "}
          | Location: {location}
        </p>
      </div>
    </div>
  );
};

export default Manufacturer;
