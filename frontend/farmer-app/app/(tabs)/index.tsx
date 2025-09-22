import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import Colors from '../../constants/Colors';

export default function HomeScreen() {
  // Dummy data for now
  const weather = { temp: 28, humidity: 65, description: 'Partly Cloudy' };
  const user = { name: 'Shreshth', id: 'FARMER-IND-011' };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.welcomeTitle}>Welcome, {user.name}!</Text>
          <Text style={styles.welcomeSubtitle}>Farmer ID: {user.id}</Text>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Weather & Humidity" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
          <Text style={styles.weatherText}>{weather.description}</Text>
          <Text style={styles.weatherText}>Humidity: {weather.humidity}%</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    marginBottom: 15,
  },
  cardTitle: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 5,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 5,
  },
});