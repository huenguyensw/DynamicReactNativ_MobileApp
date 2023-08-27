import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../screens/Chat';
import SettingsBottomTabNavigator from './SettingsBottomTabNavigator';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chat" component={Chat}/>
      {/* <Drawer.Screen name="Chat" component={Chat} /> */}
      <Drawer.Screen name="Settings" component={SettingsBottomTabNavigator} />
    </Drawer.Navigator>
  )
}
