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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function HomePage({navigation}) {
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
