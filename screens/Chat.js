
import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Feather } from '@expo/vector-icons';
import { View, Keyboard, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import Message from './Message';

export default function Chat() {
    const { accessToken } = useContext(AuthContext);
    const [allMessages, setAllMessages] = useState(null);
    const fetchAllMessagesAPI = 'https://chat-api-with-auth.up.railway.app/messages';
    const headers = { "Authorization": "Bearer " + accessToken.accessToken };
    const [newMessage, setNewMessage] = useState('');

    const flatListRef = useRef(null);

    useEffect(() => {
        if (flatListRef.current) {
            // Scroll to the end of the list after a short delay to allow rendering
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, []);


    const getData = () => {
        fetch(fetchAllMessagesAPI, { headers })
            .then((response) => {
                if (response.ok == false) {
                    throw new Error('HTTP Error' + response.status)
                }
                return response.text();

            })
            .then((resText) => {
                setAllMessages(JSON.parse(resText).data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getData();
    }, [fetchAllMessagesAPI]);


    const handleSendMessage = async () => {
        console.log('newMessage', newMessage)
        try {
            const response = await fetch(fetchAllMessagesAPI, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + accessToken.accessToken,
                },
                body: JSON.stringify({
                    content: newMessage,
                }),
            })

            const result = await response.json();
            console.log('resk', result)
            if (result.status == '201') {
                getData();
            };
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log('allmessage: ', allMessages)

    return (
        <SafeAreaView style={styles.container} >
            {allMessages
                && <FlatList
                    style={styles.messageBox}
                    ref={flatListRef}
                    data={allMessages}
                    renderItem={({ item }) =>
                    (< Message
                        item = {item}
                        message={item}
                        userID={accessToken.userID}
                    />
                    )}
                    keyExtractor={item => item._id}
                    initialScrollIndex={(allMessages.length<=10)?0:(allMessages.length-10)} // Scroll to the first item
                    initialNumToRender={10} // Number of items to render initially
                />}

            {/* the second solution */}
            {/* {allMessages && allMessages.map((message) =>

                // <Message
                //     key={message._id}
                //     message={message}
                //     userID={accessToken.userID}
                // />
            )} */}
            <View style={styles.newMessageBox}>
                <TextInput
                    style={styles.inputField}
                    placeholder='Message...'
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <TouchableOpacity 
                    onPress={() => {
                        handleSendMessage();
                        Keyboard.dismiss();
                    }}
                >
                    <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    content: {
        backgroundColor: 'red',
    },
    newMessageBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    inputField: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'gray',
        width: '85%',
        padding: 5,
    },
    messageBox: {
        marginBottom: 20,
    }
})
