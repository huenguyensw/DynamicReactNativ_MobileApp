import React, { useContext, useEffect, useState } from 'react'
import { Image, TextInput, View, Text, StyleSheet, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../contexts/AppProvider';


export default function Profile({navigation}) {
  const URL = 'https://chat-api-with-auth.up.railway.app/users'
  const { accessToken, handleLogout, profileImage } = useContext(AppContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [updateUser, setUpdateUser] = useState(false);
 

  
  const fetchData = async () => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + accessToken.accessToken,
        }
      })
      const result = await response.json();
      if (result.status == '200') {
        if (result.data.firstname) {
          setFirstName(result.data.firstname)
        }
        if (result.data.lastname) {
          setLastName(result.data.lastname);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [updateUser])

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken.accessToken,
        },
        body: JSON.stringify({
          "firstname": firstName,
          "lastname": lastName
        })
      })
      const result = await response.json();
      if (result.status == '200') {
        setUpdateUser(!updateUser);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async() =>{
    try{
      const response = await fetch(URL, {
        method:'DELETE',
        headers: {
          "Authorization": "Bearer " + accessToken.accessToken,
        }
      })

      const result = await response.json();
      if(result.status == '200'){
        handleLogout();
        navigation.navigate("Login");
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profileImage
      ? <Image source={{uri: profileImage}} style={styles.imageProfile}/>
      : <MaterialCommunityIcons 
        style={styles.profileIcon} 
        name="face-man-profile" 
        size={130} 
        color="black" 
      />}
      <View style={styles.childBox}>
        <TextInput
          style={styles.inputField}
          placeholder='Firstname'
          value={firstName}
          onChangeText={(text) => setFirstName(text)} 
        />
        <TextInput
          style={styles.inputField}
          placeholder='Lastname'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={styles.childBox}>
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => 
            { Keyboard.dismiss();
              handleUpdateUser()}}
        >
          <Text style={styles.buttonName}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={()=> handleDeleteUser()}
        >
          <Text style={styles.buttonName}>Delete</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={()=> {
            handleLogout();
           navigation.navigate("Login");
          }}>
          <Text style={styles.buttonName}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    rowGap: 40,
    marginLeft: '10%',
    marginRight: '10%',
  },
  title: {
    fontSize: 35,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom: 0,
  },
  inputField: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray',
  },
  logoutBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    backgroundColor: '#C0C0C0',
  },
  updateBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#87CEFA',
    backgroundColor: '#87CEFA',
  },
  deleteBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#FF4500',
    backgroundColor: '#FF4500',
  },
  profileIcon: {
    alignSelf: 'center'
  },
  childBox: {
    rowGap: 20,
  },
  imageProfile :{
    width: 100, 
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonName: {
    fontSize: 15,
}

})
