import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { COLORS } from '../style';

const PictureButton = ({ onPress, images, size, index, loading }) => {
    return (
        <TouchableOpacity onPress={() => onPress(index)} style={size == "large" ? styles.imageContainer : styles.imageContainerSmall}>
            {loading ?
                <ActivityIndicator animating={true} size="large" color={COLORS.darkContrast} />
                :
                images[index] ?
                    <Image
                        style={styles.image}
                        source={{ uri: images[index] }}
                    />
                    :
                    <Ionicons name="camera-outline" size={size == "large" ? 60 : 35} style={{color: COLORS.brightContrast}} />
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
        borderColor: COLORS.brightContrast,
        borderWidth: 3

    },
    imageContainerSmall: {
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for the container
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        borderRadius: 20,
        borderColor: COLORS.brightContrast,
        borderWidth: 3

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
    },
});