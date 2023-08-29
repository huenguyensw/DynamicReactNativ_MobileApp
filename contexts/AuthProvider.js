import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export default function AuthProvider({children}) {

  const [accessToken, setAccessToken] = useState({});
  const APIGenToken = 'https://chat-api-with-auth.up.railway.app/auth/token';
  const navigation = useNavigation();

  const handleLogin = async(username,password,setLoginMessage) =>{
    try{
      const response =  await fetch(APIGenToken, {
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
        headers: {
            "Content-Type": 'application/json',
        }
      });
      const result = await response.json();
      if(result.status == '401'){
        console.log("test Hello",result.message);
        setLoginMessage('Incorrect username or password');
      }else if(result.status == '200'){
        setLoginMessage('');
        //save accessToken and userID of user
        const userInfo = {};
        userInfo.accessToken = result.data.accessToken;
        userInfo.userID =  result.data._id;
        await AsyncStorage.setItem('MyApp_user',JSON.stringify(userInfo));
        console.log('successfully',userInfo);
        setAccessToken(userInfo);
        navigation.navigate("Chat page");
        
      }
      
    }catch(error){
      console.log(error)
    }
  }

  const handleLogout = async() =>{
    try {
      await AsyncStorage.removeItem('MyApp_user');
      setAccessToken({});
    } catch(error){
      console.log(error);
    }
    console.log('logout ok')

  }

  const isLoggedIn = async() => {
    try{
      const token = await AsyncStorage.getItem('MyApp_user');
      setAccessToken(JSON.parse(token));
      console.log('token',token)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    isLoggedIn();
  },[]);
  return (
    <AuthContext.Provider value={{accessToken, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}
