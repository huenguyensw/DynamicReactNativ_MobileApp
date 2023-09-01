import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import DrawerNavigator from './DrawerNavigator';


const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerTitleStyle: {
      fontSize: 22,
    }}}>
      <Stack.Screen name="Login" component={Login}
       />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Chat page" component={DrawerNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
