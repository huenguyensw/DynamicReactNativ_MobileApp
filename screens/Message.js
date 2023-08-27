import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Message({message, userID}) {
  return (
    <View style={styles.container}>
        {message.user
        && (message.user._id == userID
            ? <View style={styles.myContent}>
                <Text>{message.content}</Text>
                <Text>{message.date}</Text>
              </View>
            : <View style={styles.otherMessage}>
                <Text style={styles.content}>{message.content}</Text>
                <Text style={styles.date}>{message.date}</Text>
              </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 5,
    },
    myContent: {
        alignItems: 'flex-end',
        backgroundColor: '#1E90FF',
        padding: 5,
        borderRadius: 4,
    },
    otherMessage: {
        alignItems: 'flex-start',
        backgroundColor: '#A9A9A9',
        padding: 5,
        borderRadius: 4,

    },
    content: {
        color: 'black',
    },
    date: {
        color: '#696969'
    }

})
