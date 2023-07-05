import { StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react'
import PictureButton from '../components/PictureButton';
import NextButton from '../components/NextButton';
import { COLORS, TEXT_STYLES } from '../style'
import { auth, storage, database } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PictureSignup = ({ setPage, images, setImages }) => {
    const [loading0, setLoading0] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [loading4, setLoading4] = useState(false)

    const formIncomplete = images.length < 2
    // Todo, filter nsfw images on backend (possibly on front end too?)
    const updateLoadingStates = (index, state) => {
        switch (index) {
            case 0:
                setLoading0(state)
                break;
            case 1:
                setLoading1(state)
                break;
            case 2:
                setLoading2(state)
                break;
            case 3:
                setLoading3(state)
                break;
            case 4:
                setLoading4(state)
                break;
        }
    }
    const pickImage = async (index) => {
        try {
            updateLoadingStates(index, true)
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                let newImages = [...images]
                newImages[index] = result.uri
                setImages(newImages)

                const uid = auth.currentUser?.uid;
                const filename = `profile_picture_${index + "_" + uid}`;
                const response = await fetch(result.uri);

                const blob = await response.blob();
                const storageRef = ref(storage, filename);

                await uploadBytes(storageRef, blob);

                const downloadURL = await getDownloadURL(storageRef);

                const userRef = doc(database, 'users', uid);

                await updateDoc(userRef, {
                    [`pictures.${index}`]: downloadURL,
                })

            }
            updateLoadingStates(index, false)
        } catch (e) {
            updateLoadingStates(index, false)
            console.log(e)
            alert(e)
        }
    }

    return (
        <View style={styles.pictureSelection}>
            <Text style={TEXT_STYLES.header}>Add photos! (min 2)</Text>
            <View style={styles.content}>
                <View style={styles.mainPictureContainer}>
                    <PictureButton images={images} onPress={pickImage} size={"large"} index={0} loading={loading0} />
                    <PictureButton images={images} onPress={pickImage} size={"large"} index={1} loading={loading1} />
                </View>
                <View style={styles.smallPictureContainer}>
                    <PictureButton images={images} onPress={pickImage} size={"small"} index={2} loading={loading2} />
                    <PictureButton images={images} onPress={pickImage} size={"small"} index={3} loading={loading3} />
                    <PictureButton images={images} onPress={pickImage} size={"small"} index={4} loading={loading4} />
                </View>
            </View>
            <NextButton
                index={1}
                setPage={setPage}
                formIncomplete={formIncomplete}
                incompleteMessage="Please select at least 2 photos" />
        </View>
    )
}

export default PictureSignup
const styles = StyleSheet.create({
    content:{
        width: "95%"
    },
    pictureSelection: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.mainTheme,
        display: "flex",
        alignItems: "center"
    },
    mainPictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20
    },
    smallPictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 30,
        margin: 20,
        marginTop: 30
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    },
    imageContainer: {
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for the container
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        borderRadius: 20,
        backgroundColor: 'white'
    },
    image: {
        flex: 1, // Take up the entire space within the container
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Resize the image to cover the container
    },
});