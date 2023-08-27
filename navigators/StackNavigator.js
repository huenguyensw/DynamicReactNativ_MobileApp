import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Chat from '../screens/Chat';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Chat" component={DrawerNavigator} options={{headerShown: false}} />
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
    </Stack.Navigator>
  )
}
