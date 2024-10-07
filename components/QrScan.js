import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable
  } from 'react-native';
  import React, { useState } from 'react';
  import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
  import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
  function QrScan(){
    const [valueqr, setValueqr] = useState("");
    const device = useCameraDevice("back");
  
    const codeScanner = useCodeScanner({
      codeTypes: ['qr', 'ean-13'],
      onCodeScanned: (codes) => {
        for (const code of codes) {
          console.log(code.value)
          setValueqr(code.value);
        }
      }
    });
  
    if (device == null) {
      return <Text>Loading...</Text>
    }
  
    return (
      <View style={styles.view}>
        <Pressable style={styles.button}><Text style={StyleSheet.create({color: '#292929'})}>Voltar</Text></Pressable>
  
        <Camera
          codeScanner={codeScanner}
          style={styles.camera}
          device={device}
          isActive={true}
        />
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    view: {
      height: '100%', 
      width: '100%',
      flex: 1,
      flexDirection:"column",
      justifyContent:"flex-end",
      alignItems: 'center', 
    },
    camera:{
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 0
    },
    button:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 80,
      marginBottom: 30,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#FFF',
      zIndex:1,
      
    }
  });
  
  export default QrScan;
  