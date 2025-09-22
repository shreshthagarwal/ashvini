import axios from 'axios';

// --- IMPORTANT: Networking Configuration ---
// If running on an Android Emulator, use this:
const API_URL = "http://10.0.2.2:8080/api";
// If running on a physical phone, find your computer's local IP address and use it here:
// const API_URL = "http://192.168.1.5:8080/api"; 

// Simulates uploading an image file and getting a public URL back
export const uploadImage = async (uri: string) => {
  console.log('Simulating image upload...');
  // In a real app, you would create FormData and post to a cloud storage service (e.g., S3)
  // For this project, we'll just return a placeholder URL after a short delay.
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  const fakeUrl = `https://s3.amazonaws.com/ashvini/harvest_${new Date().getTime()}.jpg`;
  console.log('Simulated upload complete. URL:', fakeUrl);
  return fakeUrl;
};

// Creates a new harvest batch by sending data to the Go server
export const createHarvestBatch = async (data: object) => {
  const response = await axios.post(`${API_URL}/batches`, data);
  return response.data;
};

// Fetches the list of collections for a specific farmer
export const getFarmerCollections = async (farmerId: string) => {
  // NOTE: This endpoint is not yet implemented in the Go server.
  // We will simulate the call for now.
  console.log(`Fetching collections for farmer: ${farmerId}`);
  // Real API call would be:
  // const response = await axios.get(`${API_URL}/batches/farmer/${farmerId}`);
  // return response.data;

  // Simulate a successful response for now
  await new Promise(resolve => setTimeout(resolve, 1000));
  const mockCollections = [{
      batchId: "ASH-2025-034", herbName: "Ashwagandha Premium", harvestDate: "2025-03-15T10:00:00Z",
      initialQuantity: "75kg", status: "Processing",
  }];
  return mockCollections;
};