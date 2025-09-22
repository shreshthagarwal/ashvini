import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Header from '../../components/Header';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.text,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
        },
        header: () => <Header />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'home' : 'home'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'plus-square' : 'plus-square-o'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'leaf' : 'leaf'} size={24} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'cog' : 'cogs'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}