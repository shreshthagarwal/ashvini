import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Colors from '../../constants/Colors';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { createHarvestBatch, uploadImage } from '../../services/ApiService';

export default function CreateScreen() {
  const [herbName, setHerbName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>('Fetching location...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(`${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
    })();
  }, []);

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Camera permission is needed to take a photo.");
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
      // Step 1: "Upload" the image to get a URL
      const photoUrl = await uploadImage(imageUri);

      // Step 2: Prepare the JSON payload with the photo URL
      const payload = {
        herbName,
        initialQuantity: `${quantity}kg`,
        photoUrl,
        harvestDate: new Date().toISOString(),
        harvestLocation: location,
        farmerId: "FARMER-IND-011", // Hardcoded for this example
        farmerName: "Shreshth", // Hardcoded for this example
      };
      
      // Step 3: Send the JSON data to your Go server
      const response = await createHarvestBatch(payload);

      Alert.alert('Success!', `Batch created successfully! Batch ID: ${response.batchId}`);
      // Clear the form
      setHerbName('');
      setQuantity('');
      setImageUri(null);

    } catch (error: any) {
      console.error('Submission failed:', error);
      Alert.alert('Error', 'Failed to create batch. Please check your server connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Record New Collection Event</Text>
      
      <TextInput label="Herb Variety" value={herbName} onChangeText={setHerbName} style={styles.input} mode="outlined" theme={{ colors: { primary: Colors.text } }} />
      <TextInput label="Harvest Date" value={new Date().toLocaleDateString()} editable={false} style={styles.input} mode="outlined" />
      <TextInput label="Quantity (kg)" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} mode="outlined" theme={{ colors: { primary: Colors.text } }} />
      <TextInput label="Location Information" value={location || ""} editable={false} style={styles.input} mode="outlined" />
      
      <Button icon="camera" mode="contained" onPress={handleTakePhoto} style={styles.button} buttonColor={Colors.accent}>
        {imageUri ? "Retake Photo" : "Take Photo"}
      </Button>
      {imageUri && <Text style={styles.imageText}>Photo captured!</Text>}
      
      <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading} style={styles.submitButton} buttonColor={Colors.text}>
        Submit to Blockchain
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.text, textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15, backgroundColor: Colors.cardBackground },
  button: { marginTop: 10, paddingVertical: 5 },
  submitButton: { marginTop: 20, paddingVertical: 8 },
  imageText: { textAlign: 'center', color: 'green', marginTop: 5, marginBottom: 10 },
});