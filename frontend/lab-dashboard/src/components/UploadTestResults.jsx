import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadTestResults = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState("");

  // Hardcoded batch object (can be replaced with API fetch)
  const batchData = {
    batchId: "#A120",
    herbName: "Kumari",
    scientificName: "Aloe Vera",
    qty: "40kg Root Powder",
    farmerId: "F67573",
    collectionDate: "27th Feb, 2025",
    processingDate: "28th March, 2025",
    latitude: "12.420800",
    longitude: "75.739700",
  };

  // Example API fetch (commented out for now)
  /*
  useEffect(() => {
    fetch("https://api.example.com/batch/A120")
      .then((res) => res.json())
      .then((data) => {
        // setBatchData(data);
      })
      .catch((err) => console.error(err));
  }, []);
  */

  // Fetch location from device GPS + LocationIQ
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`File "${selectedFile.name}" uploaded successfully!`);
    } else {
      alert("Please choose a file first.");
    }
  };

  return (
    <div>
      <h2>ASHVINI LABORATORY</h2>
      <p>
        New Notifications/Alerts: • Batch #A12 awaiting test results • Certificates for
        batch #B05 rejected • 3 new batches assigned to you
      </p>

      <h3>Upload Test Results</h3>

      <div>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </div>

      <div>
        <h4>Testing Laboratory Info</h4>
        <p>Testing Laboratory Name: Green Leaf Testing</p>
        <p>Location: Rajasthan - 110052</p>
        <p>Testing Date: 20th March, 2025</p>
        <p>TEST RESULT: PASS</p>
        <label>
          <input type="checkbox" /> I confirm that the above results are authentic and verified by Green Leaf Testing.
        </label>
      </div>

      <button onClick={() => alert("Results recorded to blockchain")}>
        RECORD RESULTS TO BLOCKCHAIN
      </button>

      <div>
        <h4>Input Batch Details</h4>
        <p>Batch ID: {batchData.batchId}</p>
        <p>Herb Name: {batchData.herbName}</p>
        <p>Scientific Name: {batchData.scientificName}</p>
        <p>QTY: {batchData.qty}</p>
        <p>Farmer ID: {batchData.farmerId}</p>
        <p>Collection Date: {batchData.collectionDate}</p>
        <p>Processing Date: {batchData.processingDate}</p>
        <p>
          Location: {location || `Latitude ${batchData.latitude} | Longitude ${batchData.longitude}`}
        </p>
      </div>

      <button onClick={handleUpload}>UPLOAD</button>
    </div>
  );
};

export default UploadTestResults;
