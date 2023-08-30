import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { AntDesign, Feather } from '@expo/vector-icons';
import CameraApp from '../screens/CameraApp';

const Tab = createBottomTabNavigator();


export default function SettingsBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{headerShown: false,
          tabBarIcon: ({color, size}) => {
            return (
              <AntDesign name="profile" size={size} color={color} />
            );
        },}} />
      <Tab.Screen 
        name="Camera" 
        component={CameraApp} 
        options={{headerShown: false,
        tabBarIcon: ({color, size}) => {
          return (
            <Feather name="camera" size={size} color={color} />
          );
      },}}/>
    </Tab.Navigator>
  )
}
