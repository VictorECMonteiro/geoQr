import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable,
    Button,
    TextInput,
    TouchableOpacity
  } from 'react-native';
  import React, { useState } from 'react';
  import { CommonActions, NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const axios = require('axios').default;
const Stack = createNativeStackNavigator();


export default function LoginComponent({navigation}){
    const [userName, setUserName] = useState("")
    const [passWord, setPassword] = useState("")
    const [dadosResposta, setDadosResposta] = useState(true)

    navegar = async () => {

    }
    loginRequest = async()=>{
        await axios.post('http://192.168.9.247:9011/login/loginHandle', {
            userName: userName,
            passWord: passWord
        }).then(async (response)=>{
            console.log(response.data)
            if(!response.data || response.data.success == false){
                console.log("errou")    
                setDadosResposta(false)
                return false
            }

            await AsyncStorage.setItem("loginData", JSON.stringify(response.data))

            console.log("Tudo ok")

            navigation.dispatch(CommonActions.reset({index:0,routes:[{name:'Home'}]}))

        }).catch((e)=>{
            console.log(e)  
        })

    }

    return(
        <View style={styleLogin.view}>
            <Text style={styleLogin.pageLabel}>{dadosResposta?"Fazer Login":"Usuario ou senha incorretos"}</Text>
            <View style={styleLogin.viewLogin}>
                <Text style={styleLogin.label}>Nome de usuário</Text>
                <TextInput
                    style={styleLogin.textinput}
                    onChangeText={text=>setUserName(text)}
                />
                <Text style={styleLogin.label}>Digite sua senha</Text>
                <TextInput
                    style={styleLogin.textinput}
                    onChangeText={text=>setPassword(text)}
                    secureTextEntry={true}/>
                
                <TouchableOpacity style={styleLogin.button}onPress={loginRequest}><Text>Entrar</Text></TouchableOpacity>
            </View>
        </View>

    )
}

const styleLogin = StyleSheet.create({
    view:{
        width:"100%",
        height:"100%",
        display: "flex",
        alignItems:"start",
        justifyContent:"center",
        color: "#FFF",
        backgroundColor: "#292929",
        
    },
    viewLogin:{
        width: "90%",
        height: "80%",
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
        margin: "auto",
    },
    textinput:{
        
        minWidth: "80%",
        minHeight: "5%",
        padding:10,
        // backgroundColor: "#FFF",
        color: "#fff",
        borderWidth:2,
        borderRadius:5,
        borderColor: "#D9D9D9",
    },
    label:{
        fontSize: 13,
        marginBottom: 10,
        marginTop:10,
        color: "#fff",
        alignSelf:"flex-start",
        marginLeft: 50

    },
    pageLabel:{
        backgroundColor:"blue",
        minHeight:50,
        marginTop: 100,
        marginLeft: 50,
        fontSize: 20,
        textAlign: "left",
        fontWeight: "900",
        color: "#FFF",
        
    },
    button:{
        alignItems:"center",
        justifyContent: "center",
        color: "#292929",
        marginTop: 50,
        backgroundColor: "#d9d9d9",
        width: 200,
        height: 40,
        borderRadius: 20,
    }




})