import { StyleSheet, TouchableOpacity, Image, View, Text, ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

const PictureButton = ({ onPress, images, size, index, loadingStates }) => {
    return (
        <TouchableOpacity onPress={() => onPress(index)} style={size == "large" ? styles.imageContainer : styles.imageContainerSmall}>
            {loadingStates[index] ?
                <ActivityIndicator animating={true} size="large" color="#ff0000" />
                :
                images[index] ?
                    <Image
                        style={styles.image}
                        source={{ uri: images[index] }}
                    />
                    :
                    <Ionicons name="camera-outline" size={size == "large" ? 60 : 35} />
            }
        </TouchableOpacity>
    )
}

export default PictureButton

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for the container
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: 'black'
    },
    imageContainerSmall: {
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for the container
        justifyContent: 'center',
        alignItems: 'center',
        width: '27%',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    },

    image: {
        width: "100%",
        aspectRatio: 1,
        resizeMode: 'cover', // Resize the image to cover the container
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 3
    },
});