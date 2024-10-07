import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable,
    Button,
    TextInput
  } from 'react-native';
  import React, { useState } from 'react';
  import { CommonActions, NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  const axios = require('axios').default;
const Stack = createNativeStackNavigator();


export default function LoginComponent(){
    const [userName, setUserName] = useState("")
    const [passWord, setPassword] = useState("")




    loginRequest = async()=>{
        await axios.post('http://192.168.65.177:9010/login/loginHandle', {
            userName: userName,
            passWord: passWord
        }).then((response)=>{
            console.log(response.data)

        }).catch((e)=>{
            console.log(e)
        })
    }

    return(
        <View style={styleLogin.view}>
            <Text style={styleLogin.pageLabel}>Fazer Login</Text>
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
                    secureTextEntry={true}
                />
                <Button title='Entrar' onPress={loginRequest}></Button>
            </View>
        </View>

    )




}

const styleLogin = StyleSheet.create({
    view:{
        width:"100%",
        height:"100%",
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        color: "#FFF"
    },
    viewLogin:{
        width: "90%",
        height: "80%",
        backgroundColor: "#d9d9d9",
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    },
    textinput:{
        
        minWidth: "80%",
        minHeight: "6%",
        padding:10,
        // backgroundColor: "#FFF",
        color: "#292929",
        borderWidth:2,
        borderRadius:5,
        borderColor: "blue",
    },
    label:{
        fontSize: 20,
        marginBottom: 10,
        marginTop:10,
        fontWeight: "900",
        color: "#292929",
        alignSelf:"flex-start",
        marginLeft: 50

    },
    pageLabel:{
        fontSize: 50,
        marginBottom: 10,
        fontWeight: "900",
        color: "#292929"
    }




})