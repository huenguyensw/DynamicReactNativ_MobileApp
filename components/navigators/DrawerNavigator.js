import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../screens/App/Chat';
import SettingsBottomTabNavigator from './SettingsBottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{
      headerTitleStyle: {
      fontSize: 22,
      },
      drawerLabelStyle: {
        fontSize: 16,
      }}
    }>
      <Drawer.Screen 
      name="Chat" 
      component={Chat}/>
      <Drawer.Screen 
        name="Settings"
        component={SettingsBottomTabNavigator} />
    </Drawer.Navigator>
  )
}
