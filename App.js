import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigators/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './contexts/AuthProvider';
import DrawerNavigator from './navigators/DrawerNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
      </View>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
