import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios').default;
const Stack = createNativeStackNavigator();

function QrScan({navigation}) {
  const [valueqr, setValueqr] = useState('');
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [latitude, setLat] = useState('');
  const [longitude, setLog] = useState('');
  const scannerEnable = useRef(true);
  // const loginDataRaw = AsyncStorage.getItem("loginData")

  async function loginDataRaw() {
    try {
      const value = await AsyncStorage.getItem('loginData');
      const parsedValue = JSON.parse(value);
      console.log(parsedValue);
      setUserName(parsedValue.userName);
      setToken(parsedValue.token);
    } catch (e) {}
  }

  function navegar() {
    navigation.navigate('Home', {});
  }

  async function getLatitude() {
    try {
      Geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLog(position.coords.longitude);
      });
    } catch (e) {}
  }

  const data = new Date().toISOString().split("T")[0];
  const dataHoras = new Date()


  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      if (scannerEnable.current == false) {
        return;
      }

      scannerEnable.current = false;

      for (i = 0; i <= 0; i++) {
        const valorQr = codes[0].value;
        setValueqr(valorQr);
        console.log(valorQr);
        await getLatitude();
        await loginDataRaw();
        
        await axios
          .post(
            'http://192.168.9.247:9011/rondas/rondaDefine',
            {
              userName: userName,
              localNome: valueqr,
              latitude: latitude,
              longitude: longitude,
              data: data,
              hora: dataHoras.getHours() + ':' + dataHoras.getMinutes(),
            },
            {
              headers: {
                'x-auth-token': token,
              },
            },
          )
          .then(response => {
            if (response.data.rondaSuccess == false) {
              ToastAndroid.show(
                'Falha ao escanear, se o problema persistir, abra um chamado',
                ToastAndroid.SHORT,
              );
              scannerEnable.current = false;
            } else {
              scannerEnable.current = false;
              navegar();
              ToastAndroid.show(
                'Local escaneado com sucesso',
                ToastAndroid.SHORT,
              );
            }
          })
          .catch(e => {
            scannerEnable.current = true;
            ToastAndroid.show(
              'Falha ao escanear, se o problema persistir, abra um chamado 1',
              ToastAndroid.SHORT,
            );
            console.log(e.error);
          });
      }
    },
  });

  if (device == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.view}>
      <View style={styles.cameraView}>
        <Camera
          codeScanner={codeScanner}
          style={styles.camera}
          device={device}
          isActive={true}
        />
      </View>
      <Pressable style={styles.button}>
        <Text style={StyleSheet.create({color: '#292929'})}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {
    width: '70%',
    height: '50%',
    borderRadius: 30,
    borderWidth: 10,
    borderColor: 'transparent',
    overflow: 'hidden',
    zIndex: 0,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 80,
    marginTop: 80,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFF',
    zIndex: 1,
  },
});

export default QrScan;
