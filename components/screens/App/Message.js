import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


export default function Message({message, userID, setEnableDeleteMessage,setItemId}) {

    const showDeletion = (id) =>{
        setEnableDeleteMessage(true);
        setItemId(id);
    }
   
  return (
    <View style={styles.container}>
        {message.user
        && (message.user._id == userID
            ? <TouchableOpacity style={styles.myContent} onPress={()=>showDeletion(message._id)}>
                <View style={styles.textContainerright}>
                    <Text>{message.content}</Text>
                    <Text>{message.date}</Text>
                </View>
              </TouchableOpacity>
            : <View style={styles.otherMessage}>
                <View style={styles.textContainerleft}>
                    <Text style={styles.content}>{message.content}</Text>
                    <Text style={styles.date}>{message.date}</Text>
                </View>
              </View>
        )}
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexWrap: 'nowrap',
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 5,
    },
    myContent: {
        alignItems: 'flex-end',
        padding: 5,
        borderRadius: 4,
    },
    otherMessage: {
        alignItems: 'flex-start',
        padding: 5,
        borderRadius: 4,

    },
    content: {
        color: 'black',
    },
    date: {
        color: '#696969',
    },
    textContainerright: {
        backgroundColor: 'powderblue',
        paddingRight: 5,
        borderRadius: 4,
        alignItems: 'flex-end',
    },
    textContainerleft: {
        backgroundColor: '#A9A9A9',
        padding: 5,
        borderRadius: 4,
        alignItems: 'flex-start',
    },

})
