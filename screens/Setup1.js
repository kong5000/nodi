import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import React from 'react'

const Setup1 = ({ setImageUri, setPage, imageUri }) => {
    const formIncomplete = !imageUri
    // Todo, filter nsfw images on backend (possibly on front end too?)
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                setImageUri(result.uri)
            }
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
    return (
        <>
            <Text style={styles.modalHeader}>Step1: Select a profile picture </Text>
            <Button
                title="Upload Picture"
                onPress={pickImage}
            />
            <TouchableOpacity
                disabled={formIncomplete}
                onPress={() => {
                    setPage(2)
                }}
            >
                <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
        </>
    )
}

export default Setup1
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});