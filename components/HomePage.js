import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
















export default function HomePage({navigation}) {
  

  const date = new Date().toISOString().split("T")[0];

  reqData = async ()=>{
    await axios.get("", {
      data: date



    
  })
    




}











  return (
    <View>
      <Button
        title="Navegar"
        onPress={
            ()=>{navigation.navigate("QR", {})}
        }></Button>
    </View>
  );
}
