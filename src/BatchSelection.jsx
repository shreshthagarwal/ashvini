import React from 'react';
import { useNavigate } from 'react-router-dom';

const batches = [
  {
    id: '#A120',
    herbName: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    quantity: '50Kg Root Powder',
    farmerId: 'F67890',
    collectionDate: '19th Feb, 2025',
    processingDate: '25th March, 2025',
    location: {
      latitude: '10.089167',
      longitude: '77.059723',
    },
  },
  {
    id: '#B234',
    herbName: 'Tulsi',
    scientificName: 'Ocimum tenuiflorum',
    quantity: '30Kg Root Powder',
    farmerId: 'G45890',
    collectionDate: '19th Feb, 2025',
    processingDate: '12th March, 2025',
    location: {
      latitude: '11.626390',
      longitude: '76.088890',
    },
  },
  {
    id: '#C345',
    herbName: 'Kumari',
    scientificName: 'Aloe Vera',
    quantity: '40Kg Root Powder',
    farmerId: 'F67573',
    collectionDate: '27th Feb, 2025',
    processingDate: '28th March, 2025',
    location: {
      latitude: '12.420800',
      longitude: '75.739700',
    },
  },
];

function BatchSelection() {
  const navigate = useNavigate();

  const handleSelectBatch = (batch) => {
    navigate('/lab', { state: { batch } });
  };

  return (
    <div>
      <h2>Select a Batch for Testing</h2>
      {batches.map((batch, index) => (
        <div key={index} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <p><strong>Batch ID:</strong> {batch.id}</p>
          <p><strong>Herb Name:</strong> {batch.herbName}</p>
          <p><strong>Scientific Name:</strong> {batch.scientificName}</p>
          <p><strong>Quantity:</strong> {batch.quantity}</p>
          <p><strong>Farmer ID:</strong> {batch.farmerId}</p>
          <p><strong>Collection Date:</strong> {batch.collectionDate}</p>
          <p><strong>Processing Date:</strong> {batch.processingDate}</p>
          <button onClick={() => handleSelectBatch(batch)}>SELECT</button>
        </div>
      ))}
    </div>
  );
}

export default BatchSelection;
