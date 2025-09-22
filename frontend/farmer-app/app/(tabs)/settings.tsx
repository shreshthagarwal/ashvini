import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Colors from '../../constants/Colors';

export default function SettingsScreen() {
  const user = { name: 'Shreshth', id: 'FARMER-IND-011' };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.id}>Farmer ID: {user.id}</Text>
        </Card.Content>
      </Card>
      
      <Button mode="contained" style={styles.button} buttonColor={Colors.accent}>
        View My Analytics
      </Button>
      <Button mode="contained" style={styles.button} buttonColor={Colors.accent}>
        Learning Resources
      </Button>
      <Button mode="contained" style={styles.button} buttonColor={Colors.accent}>
        Contact Support
      </Button>
      <Button mode="contained" style={styles.button} buttonColor={Colors.accent}>
        Settings
      </Button>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  id: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginBottom: 15,
    paddingVertical: 8,
  },
});