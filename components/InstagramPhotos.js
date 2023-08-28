import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../style';
import Ionicons from '@expo/vector-icons/Ionicons';

const InstagramPhotos = ({ images, handle }) => {
    return (
        <View style={{
            marginTop:10,
            paddingBottom:30
        }}>
            <View style={styles.smallPictureContainer}>
                {images && images.map(image =>
                    <View key={image.media_url} style={styles.imageContainerSmall}>
                        <Image
                            style={styles.image}
                            source={{ uri: image.media_url }}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}

export default InstagramPhotos

const styles = StyleSheet.create({
    handleText:{
        marginLeft: 4,
        fontSize: 20
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    smallPictureContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainerSmall: {
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for the container
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        margin: '1%',
        borderRadius: 20,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        resizeMode: 'cover', // Resize the image to cover the container
        borderRadius: 7,
    },

})