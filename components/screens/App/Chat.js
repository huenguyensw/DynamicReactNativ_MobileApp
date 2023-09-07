import React, { useContext, useState, useEffect, useRef } from 'react'
import { Text } from 'react-native';
import { AppContext } from '../../contexts/AppProvider';
import { Feather } from '@expo/vector-icons';
import { View, Keyboard, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native'
import Message from './Message';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


export default function Chat() {
    const { accessRights } = useContext(AppContext);
    const [allMessages, setAllMessages] = useState(null);
    const fetchAllMessagesAPI = 'https://chat-api-with-auth.up.railway.app/messages';
    const [newMessage, setNewMessage] = useState('');
    const [addingState, setAddingState] = useState(false);
    const [enableDeleteMessage, setEnableDeleteMessage] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);




    const getData = () => {
        fetch(fetchAllMessagesAPI, { headers: { "Authorization": "Bearer " + accessRights.accessToken } })
            .then((response) => {
                if (response.ok == false) {
                    throw new Error('HTTP Error' + response.status)
                }
                return response.text();

            })
            .then((resText) => {
                setAllMessages(JSON.parse(resText).data.reverse());
                setIsLoading(false);
                setIsError(null);
            })
            .catch((error) => {
                setIsError(error.message);
                setIsLoading(false);

            })
    }


    useEffect(() => {
        getData();
        const intervalId = setInterval(getData, 5000);

        // Clean up the interval when the component unmounts or 'addingState' changes
        return () => {
            clearInterval(intervalId);
        };
    }, [addingState]);


    const handleSendMessage = async () => {
        try {
            const response = await fetch(fetchAllMessagesAPI, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + accessRights.accessToken,
                },
                body: JSON.stringify({
                    content: newMessage,
                }),
            })

            const result = await response.json();
            if (result.status == '201') {
                setAddingState(!addingState);
            };
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteContent = async (id) => {
        try {
            const response = await fetch(fetchAllMessagesAPI + '/' + `${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + accessRights.accessToken,
                }
            })
            const result = await response.json();
            if (result.status == '200') {
                setAllMessages(allMessages.filter((item) => item._id != id))
            }
            setEnableDeleteMessage(false);

        } catch (error) {
            console.log(error);
        }

    }

    const CancelDeletion = () => {
        setEnableDeleteMessage(false);
    }
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            {isLoading
                ? <Text style={styles.notifyMsg}>Loading...</Text>
                : isError
                    ? <Text style={styles.notifyMsg}>{isError}</Text>
                    : allMessages
                    && <FlatList
                        style={styles.messageBox}
                        data={allMessages}
                        inverted
                        renderItem={({ item }) =>
                        (< Message
                            item={item}
                            message={item}
                            userID={accessRights.userID}
                            setEnableDeleteMessage={setEnableDeleteMessage}
                            setItemId={setItemId}
                        />
                        )}
                        keyExtractor={item => item._id}
                    />}

            {enableDeleteMessage
                ? <View style={styles.deleteBox}>
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color="#F5F5DC"
                        onPress={() => deleteContent(itemId)} />
                    <Ionicons
                        name="close"
                        size={24}
                        color="#F5F5DC"
                        onPress={() => CancelDeletion()} />
                </View>
                : <View style={styles.newMessageBox}>
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
            }
            {/* the second solution */}
            {/* {allMessages && allMessages.map((message) =>
    
                    // <Message
                    //     key={message._id}
                    //     message={message}
                    //     userID={accessRights.userID}
                    // />
                )} */}

        </KeyboardAvoidingView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 10,
        marginBottom: 20,
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
        padding: 10,
    },
    messageBox: {
        // marginBottom: 30,
    },
    deleteBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        padding: 5,
        backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 5,
        borderColor: 'red'

    },
    notifyMsg: {
        textAlign: 'center',
        fontSize: 20,
    }

})
