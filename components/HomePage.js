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
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {CommonActions, NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

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

  useFocusEffect(
    React.useCallback(() => {
      async function reqData() {
        const token = await loginDataRaw();
        const date = new Date().toISOString().split('T')[0];
        // console.log(date)
        // console.log(typeof(date))
        // console.log(token)
        await loginDataRaw();
  
        try {
          const response = await axios.get(
            'http://192.168.1.50:9011/rondas/getRondas',
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

      

      return () => {
      
      };
    }, [])
  );

  return (
    <View style={estiloHome.view}>
      <Image source={{uri: "http://192.168.1.50/img/Cozinha.png"}}></Image>
      <Text style={estiloHome.textHeader}>Locais Visitados</Text>
      <FlatList
        data={getRondaData}
        renderItem={({item}) => (
          <View>
          <TouchableOpacity  style={item.id%2==0?estiloHome.button:estiloHome.buttonGreen} onPress={openModal}>
            <Image
              style={estiloHome.img}
              source={{uri:`http://192.168.1.50/img/${item.localNome}.png`}}
            />
            <View>
            <Text 
              
              style={estiloHome.buttonTextBlack}  
              
            >{item.localNome.toString()}</Text>
            <Text
              style={estiloHome.buttonTextLight}
            
            >Clique para mais detalhes</Text>
            </View>
            <Text style={estiloHome.buttonTextHora}>{item.hora.toString()}</Text>
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
      

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('QR', {});
        }}
        style={estiloHome.botaoQr}
        >
          <Text
            style={estiloHome.botaoQrTexto} 
          >Escanear Local</Text>


        </TouchableOpacity>
    </View>
  );
}

function ModalMap({visible, onClose, prop}) {
  const url = `https://maps.google.com/?q=${prop[0]},${prop[1]}`

  return (
    <Modal transparent={true} visible={visible} animationType="slide" >
      <View style={estiloHome.modal}>
      <WebView source={{ uri: url }} style={estiloHome.webview}/>
      <TouchableOpacity onPress={onClose} style={estiloHome.botaoQr}><Text style={estiloHome.botaoQrTexto}>Fechar</Text></TouchableOpacity>
    </View>
    </Modal>
  );
}

const estiloHome = StyleSheet.create({
  view:{
    flex:1,
    width: "100%",
    height: "100%",
    backgroundColor:"#292929"
  },
  webview:{
    width: "90%",
    height: "10%",
    margin: "auto",
    marginTop: 30,
    overflow: "hidden",
    borderRadius: 20
  },
  flatList: {
    color: '#fff',
    marginBottom: 10,
    height: "50%",
    minWidth:"90%",
    borderRadius: 30,
    margin:"auto",
    backgroundColor: "#fff",
  },
  button:{
    flex:1,
    flexDirection: "row",
    height: 100,
    width: "100%",
    color:"#292929",
    alignItems:"center",
    padding:10,
    overflow: "hidden"
  },
  buttonGreen:{
    flex:1,
    flexDirection: "row",
    height: 100,
    width: "100%",
    color:"#292929",
    alignItems:"center",
    padding:10,
    overflow: "hidden",
    backgroundColor: "#72FE87"
  },
  buttonTextBlack:{
    fontWeight:"bold",
    color:"#292929",
  },
  buttonTextLight:{
    color:"#292929"
  },
  buttonTextHora:{
    marginLeft:80,
    textAlign:"center",
    fontSize: 20,
    color:"#292929",
    fontWeight: "900"
  },
  img:{
    width: 50,
    height:50,
    marginRight: 15,
  },
  modal:{
    width: "100%",
    height: "50%",
    borderRadius: 20,
    backgroundColor: "blue",
    margin:"auto",
    overflow: "hidden",
  },
  botaoQr:{
    width: "60%",
    height: "7%",
    margin:"auto",
    marginBottom:10,
    marginTop: 10,
    backgroundColor:"#72FE87",
    borderRadius: 30,
    
  },
  botaoQrTexto:{
    margin:"auto",
    fontWeight:"900",
    color: "#292929"
  },
  textHeader:{
    margin:"auto",
    height: "10%",
    fontSize:20,
    marginTop:40,
    fontWeight:"900"
  }
});
