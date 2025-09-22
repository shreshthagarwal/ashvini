import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Banner } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { dummyCollections } from '../../constants/DummyData';
import { getFarmerCollections } from '../../services/ApiService';

export default function CollectionsScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setError(false);
        setLoading(true);
        // This will call your API service
        const data = await getFarmerCollections("FARMER-IND-011");
        setCollections(data);
      } catch (e) {
        console.log("Could not connect to server, loading dummy data.");
        setError(true);
        setCollections(dummyCollections); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, []);

  if (loading) {
    return <ActivityIndicator animating={true} color={Colors.text} style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      <Banner
        visible={error}
        actions={[]}
        style={{ backgroundColor: '#fffbe6', marginBottom: 10 }}
        icon="alert-circle-outline"
      >
        <Text style={{ color: '#9f7d00' }}>Could not connect to the server. Displaying sample data.</Text>
      </Banner>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id || item.batchId}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name || item.herbName} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text style={styles.text}>Batch ID: {item.id || item.batchId}</Text>
              <Text style={styles.text}>Date: {new Date(item.date || item.harvestDate).toLocaleDateString()}</Text>
              <Text style={styles.text}>Quantity: {item.quantity || item.initialQuantity}</Text>
              <Text style={styles.text}>Status: {item.status}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 15 },
  card: { backgroundColor: Colors.cardBackground, marginBottom: 15 },
  cardTitle: { color: Colors.text, fontWeight: 'bold' },
  text: { fontSize: 16, color: Colors.text, lineHeight: 24 },
});