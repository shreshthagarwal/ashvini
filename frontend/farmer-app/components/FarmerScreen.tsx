import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// --- IMPORTANT: Networking Configuration ---
// If running on an Android Emulator, use this:
const API_URL = "http://10.0.2.2:8080/api";
// If running on a physical phone, replace with your computer's local IP address:
// const API_URL = "http://192.168.1.5:8080/api"; 

// TODO: Move these keys to a secure configuration file
const WEATHER_API_KEY = "42b288e767167a9e26739c79409a9a31";

const FarmerScreen = () => {
  const [herbName, setHerbName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>('Fetching location...');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // --- Auto-fetch location and weather ---
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      const gpsString = `${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`;
      setLocation(gpsString);

      // Fetch weather
      try {
        const resWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=metric&appid=${WEATHER_API_KEY}`);
        setWeather(resWeather.data);
      } catch (weatherError) {
        console.error("Failed to fetch weather", weatherError);
      }
    })();
  }, []);
  
  // --- Form Handlers ---
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!herbName || !quantity || !imageUri || !location) {
      Alert.alert('Missing Information', 'Please fill all fields and take a photo.');
      return;
    }
    setLoading(true);

    try {
      // In a real app, you would first upload the image from `imageUri`
      // to a service like AWS S3 and get back a public URL.
      const photoUrl = "http://example.com/uploaded_photo.jpg"; // Placeholder URL

      const payload = {
        herbName: herbName,
        initialQuantity: `${quantity}kg`,
        photoUrl: photoUrl,
        harvestDate: new Date().toISOString(),
        harvestLocation: location,
        farmerId: "FARMER-IND-011", // Hardcoded for this example
        farmerName: "Shreshth", // Hardcoded for this example
      };
      
      console.log('Submitting to API:', payload);
      
      // Post the JSON data to your Go server
      const response = await axios.post(`${API_URL}/batches`, payload);

      Alert.alert('Success!', `Batch created successfully! Batch ID: ${response.data.batchId}`);
      // Clear the form
      setHerbName('');
      setQuantity('');
      setImageUri(null);

    } catch (error) {
      console.error('Submission failed:', error);
      Alert.alert('Error', 'Failed to create batch. Please check your server connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>New Harvest Batch</Text>
      
      {weather && (
        <Card style={styles.card}>
          <Card.Title title="Current Conditions" />
          <Card.Content>
            <Text variant="displaySmall">{Math.round(weather.main.temp)}°C</Text>
            <Text>{weather.weather[0].description}</Text>
          </Card.Content>
        </Card>
      )}

      <TextInput
        label="Herb Name (e.g., Ashwagandha)"
        value={herbName}
        onChangeText={setHerbName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Quantity (kg)"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Location (GPS)"
        value={location || ""}
        editable={false}
        style={styles.input}
        mode="outlined"
      />
      
      <Button icon="camera" mode="contained" onPress={handleTakePhoto} style={styles.button}>
        Take Photo
      </Button>
      {imageUri && <Text style={styles.imageText}>Photo captured!</Text>}
      
      <Button 
        mode="contained-tonal" 
        onPress={handleSubmit} 
        loading={loading} 
        disabled={loading}
        style={styles.button}
      >
        Submit to Blockchain
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  imageText: {
    textAlign: 'center',
    color: 'green',
    marginTop: 5,
    marginBottom: 10,
  }
});

export default FarmerScreen;