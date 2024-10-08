import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable,
    Button
  } from 'react-native';
  import React, { useState } from 'react';
  import { CommonActions, NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function HomePage({navigation}){

    


        return(
            <View>
                <Button title='Navegar' onPress={()=>{
                    navigation.dispatch(CommonActions.reset({index:0,routes:[{name:'QR'}]}))
                    AsyncStorage.setItem("teste","valorteste")
                    
                    }}></Button>
            </View>
        )
    



}

