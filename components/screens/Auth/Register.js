import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native';
import { StyleSheet, TextInput, View, Text,TouchableOpacity, Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../contexts/AppProvider';

export default function Register() {
    const URL = 'https://chat-api-with-auth.up.railway.app/auth/register';
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [registerResult, setRegisterResult] = useState('');
    const navigation = useNavigation();
    const {setLoginMessage} = useContext(AppContext);

    
    const handleRegisterUser = async() =>{
        try{
            const response = await fetch(URL,{
                method: 'POST',
                body: JSON.stringify({
                    "username": userName,
                    "password": password
                }),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });
            const result = await response.json();
            setRegisterResult(result);

            if(result.status == '200'){
                setLoginMessage('You have successfully registered. Please login');
                navigation.navigate("Login");              
            }
            
        }catch(error){
            console.log(error);
        } 
    }
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <TextInput 
                style={styles.inputField} 
                placeholder='Username' 
                value={userName} 
                onChangeText={(text)=>setUserName(text)} />

                <TextInput 
                style={styles.inputField} 
                placeholder='Password' 
                value={password} 
                secureTextEntry={true}
                onChangeText={(text)=>setPassword(text)} />
                {registerResult !== null && (registerResult.status == '409'
                ? <Text style={{color: 'red'}}>{registerResult.message}</Text>
                : null)}
                
            </View>
            <View>
                <TouchableOpacity 
                style={styles.touchBtn} 
                onPress={()=> {
                    Keyboard.dismiss();
                    handleRegisterUser()}}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
            <Link to={{ screen: 'Login' }} style={styles.goBackLink} onPress={()=> setLoginMessage('')}>
                <View style={styles.goBackContainer}>
                    <Ionicons name="chevron-back" size={33} color="gray" />
                    <Text style={styles.goBackText}>Back to login</Text>
                </View>
            </Link>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: 40,
        marginLeft: '10%',
        marginRight: '10%',
    },
    inputField: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'gray',
    },
    touchBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'powderblue',
        backgroundColor: 'powderblue',
    },
    itemContainer: {
        rowGap: 20,
    },
    goBackLink: {
        fontSize: 18,
        color:'gray'
    },
    goBackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      goBackText: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 5, // Adjust the margin as needed
      },
})