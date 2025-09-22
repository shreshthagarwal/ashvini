import React, { useState, useEffect } from "react";
import axios from "axios";

function Farmer(props) {
  const [herbVariety, setHerbVariety] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  // --- Get Location for Reverse Geocoding + Weather ---
  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const coords = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = coords.coords;

        // Reverse geocode
        const resLoc = await axios.get(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.791eaeb8972e4453a4837fde74bd1c59&lat=${latitude}&lon=${longitude}&format=json`
        );
        const address = `${resLoc.data.address.city}, ${resLoc.data.address.country}`;
        setLocation(
          `GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(
            4
          )}° E | ${address}`
        );

        // Weather API
        const weatherKey = "42b288e767167a9e26739c79409a9a31";
        const resWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherKey}`
        );
        setWeather(resWeather.data);
      } catch (err) {
        console.error("Error fetching location/weather:", err);
        setLocation("Could not fetch location.");
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchLocationAndWeather();
  }, []);

  // --- Form Handlers ---
  const handleHerbVariety = (e) => setHerbVariety(e.target.value);
  const handleHarvestDate = (e) => setHarvestDate(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);
  const handleChoosePhotos = (e) => {
    const localFiles = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...localFiles]);
  };

  const handleFarmerData = async () => {
    const formData = new FormData();
    formData.append("herbVariety", herbVariety);
    formData.append("harvestDate", harvestDate);
    formData.append("quantity", quantity);
    formData.append("location", location);

    photos.forEach((photo, idx) => {
      formData.append(`photo_${idx}`, photo);
    });

    try {
      const response = await axios.post("Bhaiya_ki_API", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data successfully recorded:", response.data);
      alert("Data successfully recorded!");

      setHerbVariety("");
      setHarvestDate("");
      setQuantity("");
      setPhotos([]);
    } catch (error) {
      console.error("Error recording data:", error);
      alert("Failed to record data. Please try again.");
    }
  };

  const getConditionText = (temp) => {
    if (temp >= 25 && temp <= 32) return "Perfect for harvesting";
    if (temp < 25) return "Cool weather, monitor soil moisture";
    if (temp > 32) return "Hot conditions, ensure irrigation";
    return "";
  };

  // --- Mocked collections ---
  const collections = [
    {
      id: "ASH-2025-034",
      name: "Ashwagandha Premium",
      date: "Mar 15, 2025",
      quantity: "75 kg",
      grade: "Grade A",
      status: "Processing",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="portal-name">
          <h1>ASHVINI-FARMER</h1>
        </div>
        <div className="user">
          <p>{props.username}</p>
          <p>{props.FarmerId}</p>
        </div>
      </div>

      {/* Welcome + Stats */}
      <div className="main">
        <h2>Welcome back, {props.username}!</h2>
        <p>
          Track your herbal harvests and contribute to the most trusted supply
          chain in the industry. Every collection matters for global health and
          sustainability.
        </p>
        <div className="farmerData">
          <div>
            <p>{props.collections}</p>
            <p>Collections</p>
          </div>
          <div>
            <p>{props.totalHarvest} Kg</p>
            <p>Total harvest</p>
          </div>
          <div>
            <p>{props.earnings}</p>
            <p>Earnings</p>
          </div>
          <div>
            <p>{props.qualityScore}%</p>
            <p>Quality score</p>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="weather-widget">
        {loadingWeather ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <>
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p>{getConditionText(Math.round(weather.main.temp))}</p>
            <p>
              Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} km/h
            </p>
          </>
        ) : (
          <p>No weather data available.</p>
        )}
      </div>

      {/* Record New Collection Event */}
      <div className="enterCollection">
        <h3>📝 Record New Collection Event</h3>
        <hr />
        <div className="herbVariety">
          <p>🌿 Herb Variety</p>
          <input
            value={herbVariety}
            onChange={handleHerbVariety}
            placeholder="Enter herb variety"
          />
        </div>
        <div className="harvestDate">
          <p>📅 Harvest Date</p>
          <input
            value={harvestDate}
            type="date"
            onChange={handleHarvestDate}
            placeholder="dd-mm-yyyy"
          />
        </div>
        <div className="quantity">
          <p>⚖️ Quantity (kg)</p>
          <input
            value={quantity}
            type="number"
            onChange={handleQuantity}
            placeholder="Enter Harvest Weight"
          />
        </div>
        <div className="location">
          <p>📍 Location Information</p>
          <input value={location} readOnly={true} />
        </div>
      </div>

      {/* Upload Photos */}
      <div className="harvestPics">
        <p>📸 Upload Harvest Photos</p>
        <button onClick={() => document.getElementById("fileInput").click()}>
          Choose Photos
        </button>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleChoosePhotos}
          style={{ display: "none" }}
        />
        <div style={{ marginTop: "10px" }}>
          {photos.map((file, index) => (
            <span key={index}>
              {file.name}
              {index < photos.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <button className="submitFarmer" onClick={handleFarmerData}>
        🔗 RECORD DATA TO BLOCKCHAIN
      </button>

      {/* Recent Collections */}
      <div className="recentCollections">
        <h3>RECENT COLLECTIONS</h3>
        {collections.map((col) => (
          <div key={col.id} className="collectionCard">
            <h4>🌿 {col.name}</h4>
            <p>{col.id}</p>
            <p>Date: {col.date}</p>
            <p>Quantity: {col.quantity}</p>
            <p>Quality: {col.grade}</p>
            <p>Status: {col.status}</p>
            <button>Track Progress / View Details</button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quickActions">
        <h3>⚡ Quick Actions</h3>
        <button>📊 View my Analytics</button>
        <button>💰 Payment History</button>
        <button>📚 Learning Resource</button>
        <button>☎️ Contact Support</button>
        <button>⚙️ Settings</button>
      </div>
    </>
  );
}

export default Farmer;
