import React, { useContext,useEffect, useState } from 'react'
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppContext } from '../../contexts/AppProvider';


export default function Login({navigation}) {
    const {handleLogin, loginMessage, setLoginMessage} = useContext(AppContext);
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <TextInput 
                style={styles.inputField} 
                placeholder='Username' 
                value={username} onChangeText={(text)=>setUserName(text)} />
                <TextInput 
                style={styles.inputField} 
                placeholder='Password'
                value={password}
                onChangeText={(text)=>setPassword(text)} />

                {loginMessage !='' 
                &&(loginMessage == 'You have successfully registered. Please login'
                ? <Text style={{color: 'green'}}>{loginMessage}</Text>
                : <Text style={{color: 'red'}}>{loginMessage}</Text>)}
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity 
                    style={styles.loginBtn} 
                    onPress={()=> {
                        Keyboard.dismiss();
                        handleLogin(username,password, setUserName, setPassword)}} 
                >
                    <Text style={styles.buttonName}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.registerBtn} 
                    onPress={()=>{
                        setUserName('');
                        setPassword('');
                        setLoginMessage('');
                        navigation.navigate("Register")}}
                >
                    <Text style={styles.buttonName}>Register</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: 45,
        marginLeft: '10%',
        marginRight: '10%',
    },
    inputField: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'gray',
    },
    loginBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#87CEFA',
        backgroundColor: '#87CEFA',
    },
    registerBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 0,
    },
    itemContainer: {
        rowGap: 20,
    },
    buttonName: {
        fontSize: 15,
    }

})
