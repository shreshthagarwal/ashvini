
//   useEffect(() => {
//     // Commented out API fetch — Uncomment when backend API is ready
//     /*
//     const fetchBatches = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/batches'); // your API endpoint here
//         setBatches(response.data.batches); // adapt based on your response shape
//       } catch (err) {
//         console.error('Error fetching batches:', err);
//         setError('Failed to load batches. Showing demo data.');
//         setBatches(batchesDemo); // fallback to demo data
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBatches();
//     */

//     // For now, use hardcoded demo data directly
//     setBatches(batchesDemo);
//     setLoading(false);
//   }, []);


import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LabScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const batch = location.state?.batch;

  useEffect(() => {
    if (!batch) {
      // Redirect to batch selection page if no batch selected
      navigate('/batchselection');
    }
  }, [batch, navigate]);

  if (!batch) {
    // Optionally render null or loading while redirecting
    return null;
  }

  return (
    <div>
      <h2>Lab Screen</h2>
      <p><strong>Batch ID:</strong> {batch.id}</p>
      <p><strong>Herb Name:</strong> {batch.herbName}</p>
      <p><strong>Scientific Name:</strong> {batch.scientificName}</p>
      <p><strong>Quantity:</strong> {batch.quantity}</p>
      <p><strong>Farmer ID:</strong> {batch.farmerId}</p>
      <p><strong>Collection Date:</strong> {batch.collectionDate}</p>
      <p><strong>Processing Date:</strong> {batch.processingDate}</p>
      <p><strong>Location:</strong> Lat: {batch.location.latitude}, Long: {batch.location.longitude}</p>
    </div>
  );
}

export default LabScreen;
