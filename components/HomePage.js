import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView  from 'react-native-maps';

const Stack = createNativeStackNavigator();

export default function HomePage({navigation}) {
  // const [token, setToken] = useState('');
  const [getRondaData, setGetRondadata] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  async function loginDataRaw() {
    try {
      const value = await AsyncStorage.getItem('loginData');
      const parsedValue = JSON.parse(value);
      return parsedValue.token;
    } catch (e) {}
  }

  useEffect(() => {
    async function reqData() {
      const token = await loginDataRaw();
      const date = new Date().toISOString().split('T')[0];
      // console.log(date)
      // console.log(typeof(date))
      // console.log(token)
      await loginDataRaw();

      try {
        const response = await axios.get(
          'http://192.168.9.247:9011/rondas/getRondas',
          {
            params: {
              data: date,
            },
            headers: {
              'x-auth-token': token,
            },
          },
        );

        // console.log(resposta)
        setGetRondadata(response.data);
      } catch (error) {
        console.error(error); // Para facilitar a depuração
      }
    }
    // const teste = reqData()
    // console.log(teste)
    reqData();

    // console.log(getRondaData)
  }, []);
  // useEffect(()=>{
  //   console.log(getRondaData)
  // });

  return (
    <View>
      <FlatList
        data={getRondaData}
        renderItem={({item}) => (
          <View>
          <TouchableOpacity>
            <Text onPress={openModal}>{item.localNome.toString()}</Text>
          </TouchableOpacity>
            <ModalMap
              
              visible={modalVisible}
              onClose={closeModal}
              prop={[item.latitude, item.longitude, item.localNome]}/>
          </View>
        )} // Acesse a propriedade correta
        keyExtractor={item => item.id.toString()} // Certifique-se de que 'id' seja uma string
        style={estiloHome.flatList}
      />


      <Button
        title="Navegar"
        onPress={() => {
          navigation.navigate('QR', {});
        }}></Button>
    </View>
  );
}

function ModalMap({visible, onClose, prop}) {
  return (
    <Modal transparent={true} visible={visible} animationType="slide" >
      <View style={estiloHome.modal}>
        <MapView 
          initialRegion={
            {
              latitude:prop[1],
              longitude:prop[2],
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }
          }
        />
      <TouchableOpacity onPress={onClose}><Text>Fechar</Text></TouchableOpacity>
    </View>
    </Modal>
  );
}

const estiloHome = StyleSheet.create({
  flatList: {
    color: '#292929',
  },
  modal:{
    width: 100,
    height: 100,
    backgroundColor:"blue"
  }
});
