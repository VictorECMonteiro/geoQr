import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid
} from 'react-native';
import React, {useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios').default;
const Stack = createNativeStackNavigator();

function QrScan({navigation}) {
  const [valueqr, setValueqr] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLog] = useState("");
  // const loginDataRaw = AsyncStorage.getItem("loginData")
  loginDataRaw = async () => {
    const value = await AsyncStorage.getItem("loginData")
    return JSON.parse(value)

  }
  function navegar(){
    navigation.navigate("Home", {})
  }
  const loginData = loginDataRaw()
  const data = new Date()


  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes=> {
      for (const code of codes[i]) {
        setValueqr(code.value);
        console.log(valueqr)        
        console.log(loginData._j.token)
      }
      Geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLog(position.coords.longitude)
      })
      await axios.post("http://192.168.9.247:9011/rondas/rondaDefine", {
          userName: loginData._j.userName,
          localNome: valueqr,
          latitude: latitude,
          longitude: longitude,
          data: data.getDay()+"-"+data.getMonth()+"-"+data.getDay(),
          hora: data.getHours()+":"+data.getMinutes()
      }, {
        headers:{
          "x-auth-token": loginData._j.token
        }
      }).then((response =>{
        if(response.data.rondaSuccess == false){
          ToastAndroid.show("Falha ao escanear, se o problema persistir, abra um chamado", ToastAndroid.SHORT)

        }
        else{
          navegar()
          ToastAndroid.show("Local escaneado com sucesso", ToastAndroid.SHORT)

        }
      })).catch((e)=>{
        ToastAndroid.show("Falha ao escanear, se o problema persistir, abra um chamado 1", ToastAndroid.SHORT)
        console.log(e)
      })

    },
  });

  if (device == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.view}>
      <Pressable style={styles.button}>
        <Text style={StyleSheet.create({color: '#292929'})}>Voltar</Text>
      </Pressable>
      <Camera
        codeScanner={codeScanner}
        style={styles.camera}
        device={device}
        isActive={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 80,
    marginBottom: 30,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFF',
    zIndex: 1,
  },
});

export default QrScan;
