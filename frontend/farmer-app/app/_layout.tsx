import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native'; // <-- Import Text component
import Colors from '../constants/Colors'; // <-- Import Colors

function AppLoader() {
  return (
    <View style={styles.loaderContainer}>
      <Image
        source={require('../assets/images/logo-placeholder.png')}
        style={styles.logo}
      />
      <Text style={styles.appName}>ASHVINI-FARMER</Text> {/* <-- Added App Name */}
      <ActivityIndicator animating={true} size="large" color={Colors.text} style={styles.activityIndicator} /> {/* <-- Color from Colors, added margin */}
    </View>
  );
}

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <PaperProvider>
        <AppLoader />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, // <-- Set background color from theme
  },
  logo: {
    width: 200,   // <-- Much bigger logo
    height: 200,  // <-- Much bigger logo
    marginBottom: 20,
  },
  appName: {
    fontSize: 28, // <-- Prominent app name
    fontWeight: 'bold',
    color: Colors.text, // <-- Text color from theme
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: 20, // Add some space below the app name
  }
});