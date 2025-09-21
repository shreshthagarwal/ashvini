import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Location from './Location'; 

function Farmer(props) {
  const [herbVariety, setHerbVariety] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);

  
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
        setLocation(`GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E | ${address}`);
      } catch (err) {
        setLocation('Could not fetch location.');
        console.error('Error fetching location:', err);
      }
    };
    fetchLocation();
  }, []);


  const handleHerbVariety = (e) => setHerbVariety(e.target.value);
  const handleHarvestDate = (e) => setHarvestDate(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);

  const handleChoosePhotos = (e) => {
   
    const localFiles = Array.from(e.target.files);
    setPhotos(prevPhotos => [...prevPhotos, ...localFiles]);

  };

  const handleFarmerData = async () => {
    const formData = new FormData();
    formData.append('herbVariety', herbVariety);
    formData.append('harvestDate', harvestDate);
    formData.append('quantity', quantity);
    formData.append('location', location);
    

    photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
    });

    try {
        // bhaiya yaha par since aap alr blockchain install kar chuke to apni api daal dena
      const response = await axios.post('Bhaiya_ki_API', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Data successfully recorded to blockchain:', response.data);
      alert('Data successfully recorded!');
 
      setHerbVariety('');
      setHarvestDate('');
      setQuantity('');
      setPhotos([]);
    } catch (error) {
      console.error('Error recording data to blockchain:', error);
      alert('Failed to record data. Please try again.');
    }
  };

  return (
    <>
      <div className="header">
        <div className="portal-name">
          <div className="logo">
            <img src="/path/to/your/logo.png" alt="Ashvini Logo" />
            <h1>ASHVINI-FARMER</h1>
          </div>
        </div>
        <div className="user">
          <p>{props.username}</p>
          <p>{props.FarmerId}</p>
        </div>
      </div>
      <div className="main">
        <h2>Welcome back, {props.username}!</h2>
        <p>Track your herbal harvests and contribute to the most trusted supply chain in the industry. Every collection matters for global health and sustainability.</p>
        <div className="farmerData">
          <div><p>{props.collections}</p><p>Collections</p></div>
          <div><p>{props.totalHarvest} Kg</p><p>Total harvest</p></div>
          <div><p>{props.earnings}</p><p>Earnings</p></div>
          <div><p>{props.qualityScore}%</p><p>Quality score</p></div>
        </div>
      </div>

      <div className="enterCollection">
        <h3>📝 Record New Collection Event</h3>
        <hr />
        <div className="herbVariety">
          <p>🌿 Herb Variety</p>
          <input value={herbVariety} onChange={handleHerbVariety} placeholder="Enter herb variety" />
        </div>
        <div className="harvestDate">
          <p>📅 Harvest Date</p>
          <input value={harvestDate} type="date" onChange={handleHarvestDate} placeholder="dd-mm-yyyy" />
        </div>
        <div className="quantity">
          <p>⚖️ Quantity (kg)</p>
          <input value={quantity} type="number" onChange={handleQuantity} placeholder="Enter Harvest Weight" />
        </div>
        <div className="location">
          <p>📍 Location Information</p>
         
          <input value={location} readOnly={true} placeholder="Fetching your location..." />
      
        </div>
      </div>

      <div className="harvestPics">
        <p>📸 Upload Harvest Photos</p>
        <pre>📷
          Click to upload harvest photos
          or drag & drop
        </pre>
        <button onClick={() => document.getElementById('fileInput').click()}>Choose Photos</button>
        <input 
          id="fileInput"
          type="file" 
          multiple
          onChange={handleChoosePhotos} 
          style={{ display: 'none' }} 
        />
        
        <div style={{ marginTop: '10px' }}>
          {photos.map((file, index) => (
            <span key={index}>{file.name}{index < photos.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
      </div>

      <button className="submitFarmer" onClick={handleFarmerData}>🔗 RECORD DATA TO BLOCKCHAIN</button>
    </>
  );
}

export default Farmer;