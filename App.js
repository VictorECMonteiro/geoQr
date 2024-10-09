import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QrScan from './components/QrScan'
import HomePage from './components/HomePage';
import LoginComponent from './components/LoginComponent';

const Stack = createNativeStackNavigator();



function App(){
  return(
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
          name="Login"
          component={LoginComponent}/>
          <Stack.Screen
            name="Home"
            component={HomePage}/>
          <Stack.Screen
            name="QR"
            component={QrScan}/>
        </Stack.Navigator>
      </NavigationContainer>

      


  )

}



export default App;
