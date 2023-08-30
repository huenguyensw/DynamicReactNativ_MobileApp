import React from 'react'
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, FontAwesome } from '@expo/vector-icons';


export default function ImagePreview({setPicture, picture, navigation}) {

    const savePicture = async () => {
        try {
            const asset = await MediaLibrary.createAssetAsync(picture.uri);
            const album = await MediaLibrary.getAlbumAsync('Expo');

            if (album == null) {
                await MediaLibrary.createAlbumAsync('Expo', asset);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false);
            }
            navigation.navigate("Profile")
            setPicture(null);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: picture.uri }} style={{ flex: 1 }} />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.generalBtn}
                    onPress={() => setPicture(null)}>
                    <Entypo name='camera' size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.generalBtn}
                    onPress={() => savePicture()}>
                    <Entypo name="check" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15,
    },
    generalBtn: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 50,
        height: 50,
        marginRight: 5,
    },
})
