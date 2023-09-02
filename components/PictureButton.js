import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { COLORS } from '../style';

const PictureButton = ({ onPress, image, size, loading }) => {
    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.imageContainer}>
            {loading ?
                <ActivityIndicator animating={true} size="large" color={COLORS.darkContrast} />
                :
                image ?
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                    />
                    :
                    <Ionicons name="camera-outline" size={size == "large" ? 60 : 35} style={{ color: COLORS.brightContrast }} />
            }

            <View style={{
                position: 'absolute',
                bottom: -15,
                right: -15,
                backgroundColor: COLORS.mainTheme,
                borderRadius: 100,
                padding: 5,
                borderWidth: 4,
                borderColor: "white"
            }}>
                <Ionicons
                    name="camera-outline"
                    size={30}
                    color={"white"}
                />
            </View>

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
        width: '33%',
        borderRadius: 20,
        borderColor: COLORS.brightContrast,
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