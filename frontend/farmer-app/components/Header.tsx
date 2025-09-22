import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../assets/images/logo-placeholder.png')} 
        style={styles.logo} 
      />
      <Text style={styles.headerTitle}>ASHVINI-FARMER</Text>
      <View style={styles.langSelector}>
        <Text style={styles.langText}>EN</Text>
        <Text style={styles.langText}>|</Text>
        <Text style={styles.langText}>हि</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40, // Adjust for status bar
    paddingBottom: 10,
    backgroundColor: Colors.tabBar,
    width: '100%',
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    fontSize: 16,
    color: Colors.text,
    marginHorizontal: 2,
  },
});