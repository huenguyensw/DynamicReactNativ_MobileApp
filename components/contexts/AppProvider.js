import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AppContext = createContext();

export default function AppProvider({children}) {
  const [loginMessage, setLoginMessage] = useState('');
  const [accessToken, setAccessToken] = useState({});
  const APIGenToken = 'https://chat-api-with-auth.up.railway.app/auth/token';
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  const handleLogin = async(username,password,setUserName, setPassword) =>{
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
        setLoginMessage('Incorrect username or password');
      }else if(result.status == '200'){
        
        // clear content of input fields as well as login message
        setLoginMessage('');
        setUserName('');
        setPassword('');

        //Save accessToken and userID of the user
        const userInfo = {};
        userInfo.accessToken = result.data.accessToken;
        userInfo.userID =  result.data._id;
        await AsyncStorage.setItem('MyApp_user',JSON.stringify(userInfo));
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

  }

  const isLoggedIn = async() => {
    try{
      const token = await AsyncStorage.getItem('MyApp_user');
      setAccessToken(JSON.parse(token));
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    isLoggedIn();
  },[]);

  return (
    <AppContext.Provider 
    value={{
      accessToken, 
      handleLogin,
      handleLogout, 
      setLoginMessage, 
      loginMessage,
      profileImage,
      setProfileImage}}
    >
      {children}
    </AppContext.Provider>
  )
}
